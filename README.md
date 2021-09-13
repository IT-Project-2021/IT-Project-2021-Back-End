# My Daily Planner Back-End Repository
The back-end repository for the website 'My Daily Planner'.

This can be accessed at https://it-project-2021-back-end.herokuapp.com/.

## Getting started
### Setting up a local development environment

There are two things that need to be setup: the yarn packages and the MongoDB connection.

First clone the [back-end repository](https://github.com/IT-Project-2021/IT-Project-2021-Back-End) and then `cd` into the folder. Then running the command `yarn` should install all package dependencies.

Now you have to set up a `.env` file to connect to MongoDB. Copy the `.env.example` and rename it to `.env`. Go to https://cloud.mongodb.com/v2/61077cd135d67c1280c8f601#security/database/users and add a new database user.

![MongoDB Explanation Image](https://i.imgur.com/BysWv4o.png "MongoDB Explanation Image")

Now you can change the url after `MONGO_HOST=` as follows:
`mongodb+srv://<user>:<password>@cluster0.lozqs.mongodb.net/IT-Project?retryWrites=true&w=majority`
Replace `<user>` with your username and `<password>` with your password. This isn't your MongoDB account, rather the user you just set up for the database.

![Local Respository Explanation Image](https://i.imgur.com/vliOgyM.png "Local Respository Explanation Image")

From here the local development environment should be set up.

### Running server locally
* Run the server: `yarn start`
* Access the server at http://localhost:4040

### Deploying the server
This server was deployed with Heroku with a connection to GitHub. A new Heroku user needs to be set up as mentioned above in "Setting up a local development environment". .evn config variables need to be added in the settings of the heroku app. No port needs to be set as Heroku hosts by default on port 80. The NODE_ENV variable was changed to production.

## API Documentation
The documentation for the API can be accessed locally inside this repository:

* cd into the documentation folder: `cd documentation`
* Run the documentation server: `yarn start`
  * Dependencies may need to be installed at first use: `yarn`
* Access the documentation server at http://localhost:8080

Note that the local server needs to also be running in order for the example querying to work.

## Testing
Testing has been implemented and can be easily run with: `yarn test`
