require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const ticketsRoutes = require("./routes/tickets");
//const messageRoutes = require("./routes/messages");
const path = require("path");

// express app
const app = express();

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
}

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
// rota de tickets
app.use("/api/tickets", ticketsRoutes);
// mensagens
//app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/", "build", "index.html"));
  });
}

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
