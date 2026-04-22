pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  parameters {
    string(name: 'DO_HOST', defaultValue: 'your-droplet-ip-or-domain', description: 'DigitalOcean host/IP')
    string(name: 'DO_USER', defaultValue: 'deploy', description: 'SSH user on the DigitalOcean host')
    string(name: 'DO_PORT', defaultValue: '22', description: 'SSH port')
    string(name: 'DEPLOY_PATH', defaultValue: '/var/www/litoho-landing-docs', description: 'Application path on the DigitalOcean host')
    string(name: 'SERVICE_NAME', defaultValue: 'litoho-landing-docs', description: 'systemd service name')
    string(name: 'APP_PORT', defaultValue: '3000', description: 'Node application port on the DigitalOcean host')
    string(name: 'SITE_URL', defaultValue: '', description: 'Public site URL. Leave blank to use http://DO_HOST')
    string(name: 'DO_SSH_CREDENTIALS_ID', defaultValue: 'digitalocean-ssh-key', description: 'Jenkins SSH private key credentials ID')
  }

  environment {
    NODE_ENV = 'production'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'node --version'
        sh 'npm --version'
        sh 'npm ci'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sshagent(credentials: [params.DO_SSH_CREDENTIALS_ID]) {
          sh 'chmod +x scripts/deploy-digitalocean.sh'
          sh '''
            DO_HOST="${DO_HOST}" \
            DO_USER="${DO_USER}" \
            DO_PORT="${DO_PORT}" \
            DEPLOY_PATH="${DEPLOY_PATH}" \
            SERVICE_NAME="${SERVICE_NAME}" \
            APP_PORT="${APP_PORT}" \
            SITE_URL="${SITE_URL}" \
            ./scripts/deploy-digitalocean.sh
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Deployed ${env.JOB_NAME} #${env.BUILD_NUMBER} to ${params.DO_HOST}"
    }
  }
}
