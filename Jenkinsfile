pipeline {
    agent any
    stages {
        stage('CHECKOUT') {
            steps {
                dir('/home/pi/Chani') {
                    git branch: 'main',
                        credentialsId: "$CREDENTIALSID",
                        url: 'git@github.com:redundant4u/Chani.git'
                    // sh 'git fetch'
                }
            }
        }

        stage('DOCKER DOWN & UP') {
            steps {
                echo 'hi'
                // dir('/home/pi/Chani/docker') {
                //     sh 'docker-compose down'
                //     sh 'docker-compose up -d'
                // }
            }
        }
    }
}