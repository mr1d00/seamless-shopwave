pipeline {
    agent any
    environment {
        IMAGE_NAME = 'nodejs-app'
        DOCKER_REGISTRY = 'localhost:5000'  // Minikube registry (can use local registry)
        IMAGE_TAG = 'latest'
        MINIKUBE_IP = sh(script: 'minikube ip', returnStdout: true).trim() // Minikube IP for services
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
                    // Build the Docker image
                    docker.build(IMAGE_NAME)
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run tests for the Node.js application
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes manifests to deploy the app to Minikube
                    sh 'kubectl apply -f Kubernetes/deployment.yaml'
                    sh 'kubectl apply -f Kubernetes/service.yaml'
                }
            }
        }

        stage('Monitor Deployment') {
            steps {
                script {
                    // Placeholder for Prometheus/Grafana setup if you have custom monitoring integration
                    echo "Setup Prometheus/Grafana for monitoring"
                }
            }
        }
    }
}
