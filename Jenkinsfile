pipeline {
    agent any

    tools {
       nodejs 'node-23-10-0'
    }

    environment {
            DB_CREDS = credentials('db_cred')
    }

    stages {
        stage('install dependencies') {
            steps {
                sh 'echo "Service user is $DB_CREDS_USR"'
                sh 'echo "Service password is $DB_CREDS_PSW"'
                sh 'npm install'
            }
        }
        stage('dependency scanning') {
            steps {
                
                dependencyCheck additionalArguments: '--format=ALL', nvdCredentialsId: 'OWASP_API_KEY', odcInstallation: 'dependenct_check_12-1-0'

                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 1
                 
                
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])

                junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'dependency-check-junit.xml'
            }
        }
        stage('unit testing and publishing') {
            steps {
                sh 'npm test'
                junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'test-results.xml'
            }
            
        }
        stage('code coverage') {
            steps {
                sh 'npm run coverage'

                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: 'coverage/lcov-report/', reportFiles: 'index.html', reportName: 'Code Coverage HTML Report', reportTitles: '', useWrapperFileDirectly: true])
            }
            
        }
    }
}