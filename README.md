[![CircleCI](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-portfolio.svg?style=svg)](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-portfolio)

# ts-react-s3-circleci-portfolio

an offline-friendly, cache-first website frontend built with material ui, typescript, react and webpack with Jest unit testing

Highlights:

1. Website deployed to an S3 bucket with Cloudfront as **CDN**: https://www.markz-portfolio.net/ and https://markz-portfolio.net/ are redirected to a CloudFront distribution. The CloudFont distribution is configured to redirect all 
`http` to `https`. Some **Cache-Control** headers are configured for different built files of the React app for performance and cost.
2. SPA: all 400 class errors are redirected to /index.html by cloudfront.
3. `service-worker.js` is used in a way that when new version is continuosly deployed to S3, a React snackbar displays notification, letting user choose whether they want to **'skipWaiting'** and get the latest content. If they choose not to **'skipWaiting'**, the old content will remain on **ALL TABS**. This ensures **cross browser tab** data consistency.
4. Infra as code with `AWS CDK` here: https://github.com/MarkZhuVUW/aws-cdk-all
![image](https://user-images.githubusercontent.com/29388401/129281446-cb535d9d-34a8-4521-8a85-41f260dce53c.png)
5. Currently the cost of maintaining the website is around **0.65usd** per month.
6. I call it a "**higher-order react hook**" that wraps the useReducer hook, and adds the ability to attach middleware and afterware.
![image](https://user-images.githubusercontent.com/29388401/129280709-a879266a-d60b-46b9-b813-b1dfc3d23216.png)
6. Inspired by **Downshift** and **react-virtualized**, I have decoupled all states into dedicated custom hooks while providing render props for allowing the customization of some parts the components
![image](https://user-images.githubusercontent.com/29388401/129281286-c210d133-01e1-43f9-9f69-c4f855cf0938.png)
7. Accessibility. All interact-able icons, button either have text within it or a unique aria-label.
![image](https://user-images.githubusercontent.com/29388401/129281605-b2ea65a8-1e4d-436a-8209-bbfe4ea37ac1.png)



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
