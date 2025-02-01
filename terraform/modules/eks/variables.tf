variable "cluster_name" {
  type        = string
  description = "Name of the EKS cluster"
  default     = "traveltime-eks-cluster"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1"
}
