provider "aws" {
    region  = var.aws_region
    profile = var.aws_profile
}

data "aws_caller_identity" "current" {}

module "vpc" {
    source = "./modules/vpc"
}

module "eks" {
    source = "./modules/eks"
}
resource "aws_iam_role" "travel_time_server_s3_role" {
    name               = "TravelTimeServerS3AccessRole"
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Effect    = "Allow"
                Principal = {
                    Federated = "cognito-identity.amazonaws.com"
                }
                Action    = "sts:AssumeRoleWithWebIdentity"
                Condition = {
                    StringEquals = {
                        "cognito-identity.amazonaws.com:aud" = "travel-time-server-s3-access-role"
                    }
                }
            },
            {
                Effect    = "Allow"
                Principal = {
                    AWS = data.aws_iam_user.current_user.arn
                }
                Action    = "sts:AssumeRole"
            },
            {
                Action    = "sts:AssumeRole"
                Effect    = "Allow"
                Principal = {
                    AWS = flatten([
                        module.eks.eks_module_outputs.eks_managed_node_groups.one.iam_role_arn,
                        module.eks.eks_module_outputs.eks_managed_node_groups.two.iam_role_arn
                    ])
                }
            }
        ]
    })
}

resource "aws_iam_role_policy" "travel_time_s3_bucket_access_policy" {
    name   = "TravelTimeS3BucketAccessPolicy"
    role   = aws_iam_role.travel_time_server_s3_role.id
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Effect   = "Allow"
                Action   = [
                    "s3:ListBucket",
                    "s3:GetObject",
                    "s3:PutObject",
                    "s3:DeleteObject"
                ]
                Resource = [
                    "arn:aws:s3:::travel-time-img-bucket",
                    "arn:aws:s3:::travel-time-img-bucket/*"
                ]
            }
        ]
    })
}
