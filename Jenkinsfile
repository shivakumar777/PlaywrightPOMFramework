// Declarative pipeline for the Playwright POM framework.
// Requires on the Jenkins side: NodeJS plugin (tool named "node20"), HTML Publisher plugin,
// and Jenkins credentials "orangehrm-base-url" (secret text) and "orangehrm-login" (username/password).

def runCmd(String cmd) {
    if (isUnix()) { sh cmd } else { bat cmd }
}

pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    tools { nodejs 'node20' }

    parameters {
        choice(name: 'PROJECT', choices: ['all', 'chromium', 'chromium-auth'], description: 'Playwright project to run')
        string(name: 'GREP', defaultValue: '', description: 'Optional tag/title filter, e.g. @smoke')
    }

    environment {
        CI = 'true'
        BASE_URL = credentials('orangehrm-base-url')
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\.pw-browsers"
    }

    stages {
        stage('Install') {
            steps {
                runCmd 'npm ci'
                runCmd 'npx playwright install chromium'
            }
        }

        stage('Typecheck') {
            steps { runCmd 'npm run typecheck' }
        }

        stage('Test') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'orangehrm-login',
                                                  usernameVariable: 'USER_NAME',
                                                  passwordVariable: 'PASSWORD')]) {
                    script {
                        def cmd = 'npx playwright test'
                        if (params.PROJECT != 'all') { cmd += " --project=${params.PROJECT}" }
                        if (params.GREP?.trim())     { cmd += " --grep \"${params.GREP.trim()}\"" }
                        runCmd cmd
                    }
                }
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
        }
    }
}
