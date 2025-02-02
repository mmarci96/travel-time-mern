data "aws_eks_cluster" "default" {
    name = var.cluster_name
}

data "aws_eks_cluster_auth" "default" {
    name = var.cluster_name
}

provider "kubernetes" {
    host                   = data.aws_eks_cluster.default.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.default.token
}

provider "helm" {
    kubernetes {
        host                   = data.aws_eks_cluster.default.endpoint
        cluster_ca_certificate = base64decode(data.aws_eks_cluster.default.certificate_authority[0].data)
        token                  = data.aws_eks_cluster_auth.default.token
    }
}

resource "kubernetes_secret" "traveltime_secrets" {
    metadata {
        name      = "traveltime-secrets"
        namespace = "default"
    }

    data = {
        MONGO_URI                 = var.mongo_uri
        JWT_SECRET_KEY            = var.jwt
        JWT_REFRESH_SECRET_KEY    = var.jwt
        AWS_BUCKET_NAME           = var.img_storage_s3_bucket_name
        AWS_REGION                = var.aws_region
        AWS_ROLE_ARN              = "arn:aws:iam::390403884602:role/TravelTimeServerS3AccessRole"
    }
}



resource "kubernetes_deployment" "traveltime_client" {
    metadata {
        name = "traveltime-client"
        namespace = "default"
        labels ={
            app = "traveltime-client"
        }
    }

    spec {
        selector {
            match_labels = {
                app = "traveltime-client"
            }
        }
        template {
            metadata {
                labels = {
                    app = "traveltime-client"
                }
            }
            spec {
                container {
                    name = "traveltime-client"
                    image = "390403884602.dkr.ecr.eu-north-1.amazonaws.com/traveltime-client:latest"

                    resources {
                        requests = {
                            cpu = "500m"
                            memory = "512Mi"
                        }
                        limits = {
                            cpu = "1"
                            memory = "1Gi"
                        }
                    }
                    port {
                        container_port = 80
                    }
                }
            }
        }
    }
}

resource "kubernetes_service" "traveltime_client" {
    metadata {
        name = "traveltime-client"
        namespace = "default"
    }

    spec {
        selector = {
            app = "traveltime-client"
        }

        port {
            protocol = "TCP"
            port        = 80
            target_port = 80
        }

        type = "LoadBalancer"
    }
}

resource "kubernetes_deployment" "traveltime_server" {
    metadata {
        name = "traveltime-server"
        namespace = "default"
        labels = {
            app = "traveltime-server"
        }
    }

    spec {
        replicas = 2
        selector {
            match_labels = {
                app = "traveltime-server"
            }
        }
        template {
            metadata {
                labels = {
                    app = "traveltime-server"
                }
            }

            spec {
                container {
                    name = "traveltime-server"
                    image = "390403884602.dkr.ecr.eu-north-1.amazonaws.com/traveltime-server:latest"

                    env_from {
                        secret_ref {
                            name = kubernetes_secret.traveltime_secrets.metadata[0].name
                        }
                    }
                    resources {
                        requests = {
                            cpu    = "1"
                            memory = "500Mi"
                        }
                        limits = {
                            cpu    = "2"
                            memory = "1Gi"
                        }
                    }
                    port {
                        container_port = 8080
                    }
                }
            }
        }
    }
}


resource "kubernetes_service" "traveltime_server" {
    metadata {
        name      = "traveltime-server"
        namespace = "default"
    }

    spec {
        selector = {
            app = "traveltime-server"
        }

        port {
            protocol    = "TCP"
            port        = 8080
            target_port = 8080
        }

        type = "ClusterIP"
    }
}
