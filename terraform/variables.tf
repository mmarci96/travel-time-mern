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

variable "instance_type" {
  type        = string
  description = "Instance type for worker nodes"
  default     = "t3.medium"
}
