#!/bin/bash

ROLE_ARN="arn:aws:iam::390403884602:role/TravelTimeServerS3AccessRole"
SESSION_NAME="dev-session"

echo "Assuming IAM role: $ROLE_ARN..."
CREDENTIALS=$(aws sts assume-role --role-arn "$ROLE_ARN" --role-session-name "$SESSION_NAME" 2>/dev/null)

if [ $? -eq 0 ] && [ -n "$CREDENTIALS" ]; then
  export AWS_ACCESS_KEY_ID=$(echo "$CREDENTIALS" | jq -r '.Credentials.AccessKeyId')
  export AWS_SECRET_ACCESS_KEY=$(echo "$CREDENTIALS" | jq -r '.Credentials.SecretAccessKey')
  export AWS_SESSION_TOKEN=$(echo "$CREDENTIALS" | jq -r '.Credentials.SessionToken')

  echo "✅ Temporary credentials have been set."
  echo "Session will expire at: $(echo "$CREDENTIALS" | jq -r '.Credentials.Expiration')"
else
  echo "❌ Failed to assume the role. Please check your permissions or role ARN."
fi

