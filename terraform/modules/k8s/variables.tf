variable "cluster_name" {
  type    = string
  default = "traveltime-eks-cluster"
}

variable "mongo_uri" {
  type = string
}

variable "jwt" {
  type = string
}

variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "img_storage_s3_bucket_name" {
  type    = string
  default = "travel-time-img-bucket"
}
