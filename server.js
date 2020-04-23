// https://www.youtube.com/watch?v=qML_nlIEnRQ&list=PLC3y8-rFHvwg2RBz6UplKTGIXREj9dV0G&index=23
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4444;
const api = require("./routes/api");
const app = express();

app.use(express.static('ngApp'));

app.use(cors());

app.use(bodyParser.json());
app.use("/api", api);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname+'/ngApp/index.html'));
});

app.listen(PORT, function() {
  console.log("Server running on localhost:" + PORT);
});
