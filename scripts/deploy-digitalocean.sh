#!/usr/bin/env bash
set -euo pipefail

required_vars=(DO_HOST)
for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required environment variable: ${var_name}" >&2
    exit 1
  fi
done

DO_USER="${DO_USER:-deploy}"
DO_PORT="${DO_PORT:-22}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/litoho-landing-docs}"
SERVICE_NAME="${SERVICE_NAME:-litoho-landing-docs}"
APP_PORT="${APP_PORT:-3000}"
SITE_URL="${SITE_URL:-https://litoho.dev}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"
RELEASE_ID="${BUILD_NUMBER:-$(date +%Y%m%d%H%M%S)}"
RELEASE_PATH="${DEPLOY_PATH}/releases/${RELEASE_ID}"
SSH_TARGET="${DO_USER}@${DO_HOST}"
SSH_OPTS=(-p "${DO_PORT}" -o StrictHostKeyChecking=accept-new)
RSYNC_RSH="ssh -p ${DO_PORT} -o StrictHostKeyChecking=accept-new"

echo "Preparing release ${RELEASE_ID} on ${SSH_TARGET}:${RELEASE_PATH}"
ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" "sudo mkdir -p '${RELEASE_PATH}' '${DEPLOY_PATH}/releases' '${DEPLOY_PATH}/shared' && sudo chown -R \"\$(id -un):\$(id -gn)\" '${DEPLOY_PATH}'"

echo "Uploading application files"
rsync -az --delete \
  --exclude '.git/' \
  --exclude '.DS_Store' \
  --exclude '.env' \
  --exclude '.env.*' \
  --exclude 'node_modules/' \
  --exclude 'test/' \
  -e "${RSYNC_RSH}" \
  ./ "${SSH_TARGET}:${RELEASE_PATH}/"

echo "Installing dependencies and activating release"
ssh "${SSH_OPTS[@]}" "${SSH_TARGET}" \
  "DEPLOY_PATH='${DEPLOY_PATH}' RELEASE_PATH='${RELEASE_PATH}' SERVICE_NAME='${SERVICE_NAME}' APP_PORT='${APP_PORT}' SITE_URL='${SITE_URL}' KEEP_RELEASES='${KEEP_RELEASES}' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

cd "${RELEASE_PATH}"
npm ci

cat > "${DEPLOY_PATH}/shared/.env" <<ENV_FILE
NODE_ENV=production
PORT=${APP_PORT}
SITE_URL=${SITE_URL}
ENV_FILE

ln -sfn "${DEPLOY_PATH}/shared/.env" "${RELEASE_PATH}/.env"
ln -sfn "${RELEASE_PATH}" "${DEPLOY_PATH}/current"

if command -v systemctl >/dev/null 2>&1; then
  sudo tee "/etc/systemd/system/${SERVICE_NAME}.service" >/dev/null <<UNIT_FILE
[Unit]
Description=${SERVICE_NAME}
After=network.target

[Service]
Type=simple
WorkingDirectory=${DEPLOY_PATH}/current
EnvironmentFile=${DEPLOY_PATH}/shared/.env
ExecStart=$(command -v npm) run start
Restart=always
RestartSec=5
User=$(whoami)
Group=$(id -gn)

[Install]
WantedBy=multi-user.target
UNIT_FILE

  sudo systemctl daemon-reload
  sudo systemctl enable "${SERVICE_NAME}"
  sudo systemctl restart "${SERVICE_NAME}"
  sudo systemctl --no-pager --full status "${SERVICE_NAME}"
else
  echo "systemctl was not found on the remote host. Install systemd or restart the app manually." >&2
  exit 1
fi

find "${DEPLOY_PATH}/releases" -mindepth 1 -maxdepth 1 -type d | sort -r | tail -n +"$((KEEP_RELEASES + 1))" | xargs -r rm -rf
REMOTE_SCRIPT

echo "Deploy complete"
