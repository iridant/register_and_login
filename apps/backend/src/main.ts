import express from 'express';

const mongoose = require("mongoose");
const cors = require("cors")

const config = require("./config/db.config");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors())
app.use(express.json());
app.use('/auth', authRouter);

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