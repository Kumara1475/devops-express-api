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
                ##Generate dependenc scanning Report
                dependencyCheck additionalArguments: '--format=ALL', nvdCredentialsId: 'OWASP_API_KEY', odcInstallation: 'dependenct_check_12-1-0'

                ##stop build any Critical or High Vernabilities 
                dependencyCheckPublisher pattern: 'dependency-check-report.xml', stopBuild: true, unstableTotalCritical: 1, unstableTotalHigh: 1
                 
                ##Publish HTML report
                publishHTML([allowMissing: true, alwaysLinkToLastBuild: true, icon: '', keepAll: true, reportDir: './', reportFiles: 'dependency-check-jenkins.html', reportName: 'Dependency Check HTML Report', reportTitles: '', useWrapperFileDirectly: true])

                junit allowEmptyResults: true, stdioRetention: 'ALL', testResults: 'dependency-check-junit.xml'
            }
        }
    }
}