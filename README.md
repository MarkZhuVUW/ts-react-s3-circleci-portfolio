[![CircleCI](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker.svg?style=svg)](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker)

# ts-react-s3-circleci-employer-tracker

an offline-friendly, cache-first website frontend built with material ui, typescript, react and webpack with Jest unit testing, taking as much of the following as I can into consideration:

### Extendability

### Scalability

### Unit-testability

### Code reuse

Highlights:

1. Website deployed to an S3 bucket with Cloudfront as **CDN**: https://www.markz-employer-tracker.net/ and https://markz-employer-tracker.net/ are redirected to a CloudFront distribution. The CloudFont distribution is configured to redirect all 
`http` to `https`. Some **Cache-Control** headers are configured for different built files of the React app for performance and cost.
2. Initially I wanted to redirect `markz-employer-tracker.net` to `www.markz-employer-tracker.net` then I realized that it generates too many S3 bucket and CloudFront requests which makes hosting the website much more expensive. Now I am not redirecting but rather I am routing traffic from both `markz-employer-tracker.net` and `www.markz-employer-tracker.net` to a single CloudFront distribution using Route 53 as **DNS**. On CloudFront distribution receiving 404 or 403, I am returning 200 as reponse code. The idea is to treat the React app as a single page application where errors are handled by React Router or something like that.
3. `service-worker.js` is used in a way that when new version is continuosly deployed to S3, a React snackbar displays notification, letting user choose whether they want to **'skipWaiting'** and get the latest content. If they choose not to **'skipWaiting'**, the old content will remain on **ALL TABS**. This ensures **cross browser tab** data consistency.
![image](https://user-images.githubusercontent.com/29388401/129281446-cb535d9d-34a8-4521-8a85-41f260dce53c.png)
5. Currently the cost of maintaining the website is around **0.65usd** per month.
6. I call it a "**higher-order react hook**" that wraps the useReducer hook, and adds the ability to attach middleware and afterware.
![image](https://user-images.githubusercontent.com/29388401/129280709-a879266a-d60b-46b9-b813-b1dfc3d23216.png)
6. Inspired by **Downshift** and **react-virtualized**, I have decoupled all states into dedicated custom hooks while providing render props for allowing the customization of some parts the components
![image](https://user-images.githubusercontent.com/29388401/129281286-c210d133-01e1-43f9-9f69-c4f855cf0938.png)
7. Accessibility. All interact-able icons, button either have text within it or a unique aria-label.
![image](https://user-images.githubusercontent.com/29388401/129281605-b2ea65a8-1e4d-436a-8209-bbfe4ea37ac1.png)


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
