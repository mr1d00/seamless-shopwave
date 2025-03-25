pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "mridul4/website"
        DOCKER_TAG = "latest"
        DOCKER_REGISTRY = "docker.io"
        K8S_NAMESPACE = "default"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/mr1d00/seamless-shopwave.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes manifests to deploy the app to Minikube
                    sh 'kubectl apply -f Kubernetes/deployment.yaml'
                    sh 'kubectl apply -f Kubernetes/service.yaml'
                     sh 'kubectl apply -f Kubernetes/canary-deployment.yaml'
                }
            }
        }
    }
}
