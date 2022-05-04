#!/usr/bin/env bash
set -e
clear

export TERM=${TERM:=xterm}


aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"

export $(printf "AWS_ACCESS_KEY_ID=%s AWS_SECRET_ACCESS_KEY=%s AWS_SESSION_TOKEN=%s" \
$(aws sts assume-role \
--role-arn arn:aws:iam::142621353074:role/ECSS3UpdateRole \
--role-session-name S3SyncSiteBucketRoleSession \
--query "Credentials.[AccessKeyId,SecretAccessKey,SessionToken]" \
--output text))

aws s3 sync --profile update ../build s3://markz-portfolio.uk --exclude index.html --exclude service-worker.js --acl public-read --cache-control max-age=31536000,public --delete 
aws s3 sync --profile update ../build s3://markz-portfolio.uk --include index.html --include service-worker.js --acl public-read --cache-control 'no-cache'
