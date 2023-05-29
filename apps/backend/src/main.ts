import express from 'express';

const mongoose = require("mongoose");

const config = require("./config/db.config");
const app = express();

require("./startup/routes")(app);

app.get('/', (req, res) => {
  res.send({message: 'Hello world!'});
});

const port = process.env.PORT || 3333;
const server = app.listen(port,  async () => {
  await mongoose.connect(`mongodb://${config.host}:${config.port}/`, config.options).then(function (result){
    console.log("MongoDB connected.");
    console.log(`Server now listening at http://localhost:${port}`);
  })
})
server.on('error', console.error);