pipeline {
    agent any
    environment {
        // Define environment variables
        DOCKER_IMAGE_NAME = 'mridul4/nodejs-app'  // Use your Docker Hub username/repository
        DOCKER_TAG = 'latest'  // You can replace it with dynamic tags if required
        DOCKERFILE_PATH = '.'  // The directory where the Dockerfile is located inside the repo (default is root)
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS_ID = 'project-docker-token'  // Jenkins credentials ID for Docker login
         KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "Cloning repository..."
                git branch: 'main', url: 'https://github.com/mr1d00/seamless-shopwave.git'
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    echo "Logging in to Docker registry..."
                    // Login to Docker registry using Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin $DOCKER_REGISTRY
                        """
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "Building Docker image..."
                    // Build Docker image
                    sh """
                        docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_TAG} ${DOCKERFILE_PATH}
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Pushing Docker image to registry..."
                    // Push Docker image to the registry
                    sh """
                        docker push ${DOCKER_IMAGE_NAME}:${DOCKER_TAG}
                    """
                }
            }
        }
        
         stage('Deploy to Minikube Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes manifests to deploy the app to Mini
                    sh "kubectl apply -f Kubernetes/deployment.yaml"
                    sh 'kubectl apply -f Kubernetes/service.yaml'
                     sh 'kubectl apply -f Kubernetes/canary-deployment.yaml'
                }
            }
        }
    }
}
