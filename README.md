# maturita-bazar
Project made for my final exams
## How to run your own app
### Requirements
- Docker engine version 20.10.14 or later
- Node version 16.14.2 or later
### How to setup .env files
So that you can run your project, you need to create .env files in /src/frontend and /src/backend
#### Frontend
```
BUILD_PATH=../backend/public/build
```
#### Backend
```
DB_URI=<insert a mongo database link>
PORT=3000
JWT_ACCESS_KEY=<insert whatever key you want>
JWT_REFRESH_KEY=<insert whatever key you want>
ORIGIN=http://localhost:3000
```
In case you wanted to set other origin than localhost, simply change ORIGIN to your prefered address in format http://address:port


After you created these .env files, procede with these instructions

### How to install packages and build frontend into backend
1. Go to /src/frontend directory and run `npm install`
2. Run `npm run build`

### How to install packages and run server on the backend
1. Go to /src/backend and run `npm install`
2. Run `npm start` and server should be running on http://localhost:3000

## Used technologies
- [React.js](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Redux](https://redux.js.org/)
- [Redux toolkit](https://redux-toolkit.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [Mongodb Atlas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [JSON web token](https://jwt.io/)
