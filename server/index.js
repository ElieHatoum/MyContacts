require("dotenv").config({ path: "./src/.env" });

const express = require("express");
const mongoose = require("mongoose");
const auth = require("./src/routes/auth.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", auth);

mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => console.log("Connected to database !"))
    .catch((err) => console.error("Could not connect to database: ", err));

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
