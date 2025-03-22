pipeline {
    agent any

    tools {
       nodejs 'node-23-10-0'
    }

    stages {
        stage('install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('dependency scanning') {
            steps {
                dependencyCheck additionalArguments: '--format=ALL', nvdCredentialsId: 'OWASP_API_KEY', odcInstallation: 'dependenct_check_12-1-0'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 1
            }
        }
    }
}