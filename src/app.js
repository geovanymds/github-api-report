require("dotenv").config();
const express = require("express");
const sequelize = require('./models/pg/index');

const routes = require('./routes/index');

class App {

  constructor() {

    this.express = express();
    this.middlewares();
    this.routes();
    this.pgConnect();

  }

  middlewares() {
    this.express.use(express.json());
  }

  async pgConnect() {
    try {
        await sequelize.authenticate();
          console.log("Connection has been established successfully.");
      } catch (error) {
          console.error("Unable to connect to the database:", error);
      }
  }

  routes() {

    const {
      servicesRouter,
      usersRouter
    } = routes;

    // this.express.use("/", (req, res, next) => {
    //   res.send("<h1>Relatório Ad-Hoc</h1>");
    // });

    this.express.use('/services', servicesRouter);

    this.express.use((error, req, res, next) => {
      console.log(error);
      let status = 500;
      status = error.statusCode;
      const message = error.message;
      res.status(status).json({ message });
    });
  }
}

module.exports = new App().express;
