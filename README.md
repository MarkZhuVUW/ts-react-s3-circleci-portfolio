[![CircleCI](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker.svg?style=svg)](https://circleci.com/gh/MarkZhuVUW/ts-react-s3-circleci-employer-tracker)
# ts-react-s3-circleci-employer-tracker
a website frontend built with material ui, typescript, react and webpack with Jest unit testing, taking as much of the following as I can into consideration: 
### Extendability
### Scalability
### Unit-testability
### Code reuse


Website deployed to: http://react-frontend-circleci.s3-website-ap-southeast-2.amazonaws.com


## How to install dev environment and develop

In the project directory, you can run:

### `npm install`

### `npm start`

- Runs the app in webpack development mode.

- Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

- The page will reload if you make edits.

- You will also see any lint errors in the console.

## The app features husky pre-commit linting checks (eslint and prettier)
## Circle CI is used to test, build and serve the static React App to an S3 bucket on Master branch change. 
## On branches other than master, only unit testing will be done on commit.


