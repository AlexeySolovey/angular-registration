//Install express server
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 8080;

const api = require("/server/routes/api");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/angular-registration'));
app.use("/api", api);

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/angular-registration/index.html'));
});

app.listen(PORT, function() {
   console.log("Server running on localhost:" + PORT);
});