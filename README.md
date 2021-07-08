[![CircleCI](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker.svg?style=svg)](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker)

# ts-react-s3-circleci-employer-tracker

an offline-friendly, cache-first website frontend built with material ui, typescript, react and webpack with Jest unit testing, taking as much of the following as I can into consideration:

### Extendability

### Scalability

### Unit-testability

### Code reuse

Website deployed to an S3 bucket with Cloudfront as CDN: https://www.markz-employer-tracker.net/
`http` is redirected to `https`.

Initially I wanted to redirect `markz-employer-tracker.net` to `www.markz-employer-tracker.net` then I realized that it generates too many S3 bucket and CloudFront requests which makes hosting the website much more expensive. Now I am not redirecting but rather I am routing traffic from both `markz-employer-tracker.net` and `www.markz-employer-tracker.net` to a single CloudFront distribution using Route 53.

## How to install dev environment and contribute

# Fork it (feel free to submit pull requests :) )

In the project directory, you can run:

### `npm install`

### `npm run serve`

- Runs the app in webpack development mode with live reloading.

- Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## The app features husky pre-commit linting checks (eslint and prettier)

## Circle CI is used to test, build and serve the static React App to an S3 bucket on Master branch change.

## On branches other than master, only unit testing will be done on commit.

## FAQ

### Q. Husky pre-commit hooks are not working?

try:

### `npm i husky@4.3.8 -D`
