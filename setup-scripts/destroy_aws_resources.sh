
#!/bin/bash

# Check if bucket name is passed as an argument
if [ -z "$1" ]; then
    echo "❌ Please provide the S3 bucket name."
    echo "Usage: ./destroy_aws_resources.sh <s3-bucket-name>"
    exit 1
fi

S3_BUCKET_NAME="$1"
IAM_ROLE_NAME="TravelTimeServerS3AccessRole"
IAM_POLICY_NAME="TravelTimeS3BucketAccessPolicy"

echo "🛑 WARNING: This will permanently delete S3 bucket '$S3_BUCKET_NAME' and IAM resources."
read -p "Are you sure? (y/N): " CONFIRM

if [[ "$CONFIRM" != "y" ]]; then
    echo "❌ Operation canceled."
    exit 1
fi

# Step 1: Empty and Delete S3 Bucket
echo "🚨 Deleting all objects in S3 bucket: $S3_BUCKET_NAME"
aws s3 rm "s3://$S3_BUCKET_NAME" --recursive
if [ $? -eq 0 ]; then
    echo "✅ Emptied bucket."
else
    echo "⚠️ Failed to empty bucket or bucket doesn't exist."
fi

echo "🚨 Deleting S3 bucket: $S3_BUCKET_NAME"
aws s3 rb "s3://$S3_BUCKET_NAME" --force
if [ $? -eq 0 ]; then
    echo "✅ S3 bucket deleted."
else
    echo "⚠️ Failed to delete bucket."
fi

# Step 2: Get IAM Policy ARN
echo "🚨 Finding IAM policy ARN for: $IAM_POLICY_NAME"
POLICY_ARN=$(aws iam list-policies --query "Policies[?PolicyName=='$IAM_POLICY_NAME'].Arn" --output text)

if [ -n "$POLICY_ARN" ]; then
    # Step 3: Detach policy from role
    echo "🚨 Detaching policy from role: $IAM_ROLE_NAME"
    aws iam detach-role-policy --role-name "$IAM_ROLE_NAME" --policy-arn "$POLICY_ARN"

    # Step 4: Delete IAM Policy
    echo "🚨 Deleting IAM policy: $IAM_POLICY_NAME"
    aws iam delete-policy --policy-arn "$POLICY_ARN"
    echo "✅ IAM policy deleted."
else
    echo "⚠️ IAM policy not found or already deleted."
fi

# Step 5: Delete IAM Role
echo "🚨 Deleting IAM role: $IAM_ROLE_NAME"
aws iam delete-role --role-name "$IAM_ROLE_NAME"
if [ $? -eq 0 ]; then
    echo "✅ IAM role deleted."
else
    echo "⚠️ Failed to delete IAM role. Check if policies are still attached."
fi

echo "✅ Cleanup complete. All resources have been deleted."

