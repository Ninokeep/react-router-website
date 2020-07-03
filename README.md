This is the website for React Router.

The site is hosted on Firebase Hosting, which serves anything in the `public` directory. You probably don't want to update anything in the `public` directory directly though, because it will be wiped out the next time someone pushes to the `website` branch in [the React Router repo](https://github.com/ReactTraining/react-router/tree/website).

You can run the site locally using `firebase serve`. You'll have to install `firebase-tools` globally first using `npm i -g firebase-tools`.

The website automatically deploys (using a job on Travis CI) when you push to the `master` branch. You can see a history of builds of this site [on Travis CI](https://travis-ci.com/github/ReactTraining/reactrouter.com/builds).
