pipeline {
    agent any
    stages {
        stage('CHECKOUT') {
            steps {
                dir('/home/pi/Chani') {
                    git branch: 'main',
                        credentialsId: "$CREDENTIALSID",
                        url: 'git@github.com:redundant4u/Chani.git'
                }
            }
        }

        stage('DOCKER DOWN & UP') {
            steps {
                dir('/home/pi/Chani/docker') {
                    sh 'docker stop nest'
                    sh 'docker start nest'
                    // sh 'docker-compose down'
                    // sh 'docker-compose up -d'
                }
            }
        }
    }
}