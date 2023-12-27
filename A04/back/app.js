import express from 'express';
import routes from './routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'

class App {
  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
      res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
      // res.setHeader('Access-Control-Allow-Headers', 'origin', 'content-type', 'accept')
      next();
    });

    this.routes();
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
