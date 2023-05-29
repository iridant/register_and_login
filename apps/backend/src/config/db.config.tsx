module.exports = {
    host: "127.0.0.1",
    port: "27017",

    options: {
        dbName: "register_and_login",
        user: "admin",
        pass: "password",

        bufferCommands: true,
        autoIndex: true,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        minPoolSize: 1,
        maxPoolSize: 5,
    }
}