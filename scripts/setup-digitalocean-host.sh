#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-litoho-landing-docs}"
DEPLOY_USER="${DEPLOY_USER:-deploy}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/litoho-landing-docs}"
APP_PORT="${APP_PORT:-3000}"
DOMAIN="${DOMAIN:-_}"
NODE_MAJOR="${NODE_MAJOR:-20}"
SSH_PUBLIC_KEY="${SSH_PUBLIC_KEY:-}"

if [[ "$(id -u)" -ne 0 ]]; then
  echo "Run this script as root, for example: sudo bash scripts/setup-digitalocean-host.sh" >&2
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y ca-certificates curl gnupg nginx rsync ufw

install -d -m 0755 /etc/apt/keyrings
curl -fsSL "https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key" | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" > /etc/apt/sources.list.d/nodesource.list
apt-get update
apt-get install -y nodejs

if ! id "${DEPLOY_USER}" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "${DEPLOY_USER}"
fi

usermod -aG sudo "${DEPLOY_USER}"
cat > "/etc/sudoers.d/${DEPLOY_USER}-${APP_NAME}" <<SUDOERS
${DEPLOY_USER} ALL=(ALL) NOPASSWD: /usr/bin/mkdir, /usr/bin/chown, /usr/bin/tee, /usr/bin/systemctl
SUDOERS
chmod 0440 "/etc/sudoers.d/${DEPLOY_USER}-${APP_NAME}"

install -d -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${DEPLOY_PATH}/releases" "${DEPLOY_PATH}/shared"

if [[ -n "${SSH_PUBLIC_KEY}" ]]; then
  install -d -m 0700 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh"
  touch "/home/${DEPLOY_USER}/.ssh/authorized_keys"
  grep -qxF "${SSH_PUBLIC_KEY}" "/home/${DEPLOY_USER}/.ssh/authorized_keys" || echo "${SSH_PUBLIC_KEY}" >> "/home/${DEPLOY_USER}/.ssh/authorized_keys"
  chown "${DEPLOY_USER}:${DEPLOY_USER}" "/home/${DEPLOY_USER}/.ssh/authorized_keys"
  chmod 0600 "/home/${DEPLOY_USER}/.ssh/authorized_keys"
fi

cat > "/etc/nginx/sites-available/${APP_NAME}" <<NGINX
server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name ${DOMAIN};

  location / {
    proxy_pass http://127.0.0.1:${APP_PORT};
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
NGINX

ln -sfn "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

echo "Host setup complete."
echo "Deploy user: ${DEPLOY_USER}"
echo "Deploy path: ${DEPLOY_PATH}"
echo "Nginx server_name: ${DOMAIN}"
echo "Node: $(node --version)"
echo "npm: $(npm --version)"
