import express from 'express';

const mongoose = require("mongoose");
const cors = require("cors")
const cookieSession = require("cookie-session");

const config = require("./config/config");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieSession({
    name: "login-and-register-cookies",
    keys: [config.cookie_secret],
    httpOnly: true,
  })
);

app.use('/auth', authRouter);
app.use('/users', userRouter)

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