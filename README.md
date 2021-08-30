# My Daily Planner Back-End Repository
The back-end repository for the website 'My Daily Planner'

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