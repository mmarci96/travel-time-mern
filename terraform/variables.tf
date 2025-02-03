variable "aws_region" {
  type        = string
  description = "AWS region where EKS will be deployed"
  default     = "eu-north-1"
}

variable "aws_profile" {
  type        = string
  description = "AWS CLI profile to use for credentials"
  default     = "default"
}

variable "role_name_prefix" {
  description = "Prefix for the IAM role name"
  type        = string
  default     = "eks-"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
  default     = "traveltime-eks-cluster"
}

variable "cluster_version" {
  type        = string
  description = "Kubernetes version for the EKS cluster"
  default     = "1.31"
}

variable "desired_node_count" {
  type        = number
  description = "Number of worker nodes"
  default     = 3
}

variable "ecr_repositories" {
  type        = map(string)
  description = "Map of repository names and their configurations"
  default = {
    "traveltime-client-ecr" = "TravelTime Client Repository"
    "traveltime-server-ecr" = "TravelTime Server Repository"
  }
}

variable "docker_images" {
  description = "Map of Docker image names to their corresponding directories"
  type = map(object({
    directory       = string
    repository_name = string
  }))
}

