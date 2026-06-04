const express = require("express")
const morgan = require("morgan");
require("dotenv").config();
const app = express();

const connectDb = require("./src/config/db");
const userRoutes = require("./src/routes/user.routes");
const { registration, login } = require("./src/controllers/user.contollers");
const adminRoutes = require("./src/routes/admin.routes");



//middlewares
app.use(express.json());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Hello World");
});

// routes

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
    connectDb();
    console.log(`Server is running on port ${port}`);

});