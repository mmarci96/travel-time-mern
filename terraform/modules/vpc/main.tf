module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.18.1"

  name                 = "eks-vpc"
  cidr                 = var.vpc_cidr
  azs                  = ["eu-north-1a", "eu-north-1b"] # adjust to your region
  public_subnets       = var.public_subnets
  private_subnets      = var.private_subnets
  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    "Environment" = "production"
  }
}
