#!/bin/bash

aws sts assume-role \
    --role-arn arn:aws:iam::390403884602:role/traveltime-server-bucket-access-role \
    --role-session-name dev-session > temp_credentials.json

if [ $? -eq 0 ]; then
  export AWS_ACCESS_KEY_ID=$(jq -r '.Credentials.AccessKeyId' temp_credentials.json)
  export AWS_SECRET_ACCESS_KEY=$(jq -r '.Credentials.SecretAccessKey' temp_credentials.json)
  export AWS_SESSION_TOKEN=$(jq -r '.Credentials.SessionToken' temp_credentials.json)

  echo "Temporary credentials have been set."
else
  echo "Failed to assume the role."
fi

rm temp_credentials.json

