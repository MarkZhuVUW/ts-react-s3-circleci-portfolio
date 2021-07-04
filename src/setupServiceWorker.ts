import { Workbox } from "workbox-window";
if (process.env.NODE_ENV === "production") {
  // Check that service workers are supported
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(
        `${process.env.PUBLIC_URL}/service-worker.js`
      );
      navigator.serviceWorker.ready.then(() => {
        console.log(
          "This static react website is developed with a full cicd pipeline with Circle CI and it is being served offline-first and cache-first through CloudFront, Route 53 and S3."
        );
        console.log(
          "My linkedin profile: https://www.linkedin.com/in/mark-zhu-06b807145/"
        );
        console.log(
          "Github link to frontend if you are interested: https://github.com/MarkZhuVUW/ts-react-s3-circleci-employer-tracker"
        );
      });
    });
  }
}
