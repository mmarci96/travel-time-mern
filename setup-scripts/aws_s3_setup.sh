
#!/bin/bash

# Ensure AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "❌ AWS CLI not found. Please install it before running this script."
    exit 1
fi

# 🛠 Prompt for bucket name
read -p "💡 Enter the S3 bucket name (must be globally unique): " BUCKET_NAME
echo "🚀 Creating S3 bucket: $BUCKET_NAME"

# 🌎 Detect AWS region
AWS_REGION=$(aws configure get region)
if [ -z "$AWS_REGION" ]; then
    read -p "🌍 Enter your AWS region: " AWS_REGION
fi

# 📦 Create S3 bucket (adjust based on region)
if [ "$AWS_REGION" == "us-east-1" ]; then
    aws s3api create-bucket --bucket "$BUCKET_NAME"
else
    aws s3api create-bucket --bucket "$BUCKET_NAME" --create-bucket-configuration LocationConstraint="$AWS_REGION"
fi

# 🔓 Remove the private access block
aws s3api delete-public-access-block --bucket "$BUCKET_NAME"

# 🌐 Apply a public-read bucket policy
S3_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
)

echo "$S3_POLICY" > s3_policy.json
aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file://s3_policy.json
rm s3_policy.json
echo "✅ Public read access enabled for $BUCKET_NAME"

# 🔐 IAM policy setup
IAM_POLICY_NAME="TravelTimeS3BucketAccessPolicy"

IAM_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket",
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::$BUCKET_NAME",
                "arn:aws:s3:::$BUCKET_NAME/*"
            ]
        }
    ]
}
EOF
)

echo "$IAM_POLICY" > iam_policy.json

# 📜 Check if policy exists, else create it
POLICY_ARN=$(aws iam list-policies --scope Local --query "Policies[?PolicyName=='$IAM_POLICY_NAME'].Arn | [0]" --output text)

if [ "$POLICY_ARN" == "None" ] || [ -z "$POLICY_ARN" ]; then
    POLICY_ARN=$(aws iam create-policy --policy-name "$IAM_POLICY_NAME" --policy-document file://iam_policy.json --query "Policy.Arn" --output text)
    echo "✅ Created IAM policy: $IAM_POLICY_NAME with ARN: $POLICY_ARN"
else
    echo "ℹ️ IAM policy already exists: $IAM_POLICY_NAME with ARN: $POLICY_ARN"
fi

rm iam_policy.json

# ❗ Ensure policy ARN is valid before proceeding
if [ -z "$POLICY_ARN" ] || [ "$POLICY_ARN" == "None" ]; then
    echo "❌ ERROR: IAM Policy ARN could not be retrieved. Exiting."
    exit 1
fi

# 🏗 IAM role setup
IAM_ROLE_NAME="TravelTimeServerS3AccessRole"

IAM_TRUST_POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "cognito-identity.amazonaws.com:aud": "travel-time-server-s3-access-role"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):user/$(aws iam get-user --query 'User.UserName' --output text)"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
EOF
)

# 🔄 Create the role if it doesn't exist
echo "$IAM_TRUST_POLICY" > trust_policy.json
ROLE_EXISTS=$(aws iam get-role --role-name "$IAM_ROLE_NAME" --query "Role.RoleName" --output text 2>/dev/null)

if [ -z "$ROLE_EXISTS" ]; then
    aws iam create-role --role-name "$IAM_ROLE_NAME" --assume-role-policy-document file://trust_policy.json
    echo "✅ Created IAM role: $IAM_ROLE_NAME"
else
    echo "ℹ️ IAM role already exists: $IAM_ROLE_NAME"
fi

rm trust_policy.json

# 🔗 Attach policy to role
aws iam attach-role-policy --role-name "$IAM_ROLE_NAME" --policy-arn "$POLICY_ARN"
echo "✅ Attached IAM policy to role."

echo "🎉✅ Setup complete! Your S3 bucket, IAM policy, and IAM role are ready. 🚀"

