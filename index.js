require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes.js");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

// Index page (static HTML)
app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));

// API Routing
app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
