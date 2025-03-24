pipeline {
    agent any

    tools {
       nodejs 'node-23-10-0'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'Sonar-Scanner-7.1.0.4880'
    }


    stages {
        stage('install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('dependency scanning1') {
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
        stage('SAST - SonarQube') {
            steps {
                sh '''
                $SONAR_SCANNER_HOME/bin/sonar-scanner \
                     -Dsonar.projectKey=devops-project \
                     -Dsonar.sources=. \
                     -Dsonar.host.url=http://35.194.12.76:9000 \
                     -Dsonar.login=sqp_16fdfa04966d3c4a30ec59c8727f113aaabb72ab
                '''
            }
        }
    }
}