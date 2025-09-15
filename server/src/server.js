require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.config.js");
const { specs, swaggerUi } = require("./config/swagger.config.js");
const auth = require("./routes/auth.routes.js");
const contacts = require("./routes/contacts.routes.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", contacts);
app.use("/api/auth", auth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
