provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

module "vpc" {
  source = "./modules/vpc"
  # Pass required inputs
}
# provider "kubernetes" {
#   host                   = module.eks.cluster_endpoint
#   cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
# }
