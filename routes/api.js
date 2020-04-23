const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mongoose = require("mongoose");
const db =
  "mongodb+srv://root:root@cluster0-bt4dq.mongodb.net/authentication?retryWrites=true&w=majority";

mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error!" + err);
  } else {
    console.log("Connected to mongodb");
  }
});

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).send("Unauthorized request");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request");
  }
  req.userId = payload.subject;

  next();
}

router.get("/", (req, res) => {
  res.send("Api route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((err, registeredUser) => {
    if (err) {
      console.error("Error!" + err);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.error("Error!" + err);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else {
        if (user.password != userData.password) {
          res.status(401).send("Invalid password");
        } else {
          let payload = { subject: user._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.get("/events", (req, res) => {
  const events = [
    {
      _id: "1",
      name: "event1",
      description: "lorem1 lorem1 lorem1",
      data: "2020-03-17"
    },
    {
      _id: "2",
      name: "event2",
      description: "lorem2 lorem2 lorem2",
      data: "2020-03-17"
    },
    {
      _id: "3",
      name: "event3",
      description: "lorem3 lorem3 lorem3",
      data: "2020-03-17"
    },
    {
      _id: "4",
      name: "event4",
      description: "lorem4 lorem4 lorem4",
      data: "2020-03-17"
    },
    {
      _id: "5",
      name: "event1",
      description: "lorem5 lorem5 lorem5",
      data: "2020-03-17"
    },
    {
      _id: "6",
      name: "event6",
      description: "lorem6 lorem6 lorem6",
      data: "2020-03-17"
    },
    {
      _id: "7",
      name: "event7",
      description: "lorem7 lorem7 lorem7",
      data: "2020-03-17"
    }
  ];
  res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
  const events = [
    {
      _id: "1",
      name: "event1",
      description: "lorem1 lorem1 lorem1",
      data: "2020-03-17"
    },
    {
      _id: "3",
      name: "event3",
      description: "lorem3 lorem3 lorem3",
      data: "2020-03-17"
    },
    {
      _id: "5",
      name: "event1",
      description: "lorem5 lorem5 lorem5",
      data: "2020-03-17"
    },
    {
      _id: "7",
      name: "event7",
      description: "lorem7 lorem7 lorem7",
      data: "2020-03-17"
    }
  ];
  res.json(events);
});

module.exports = router;
