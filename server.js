const express = require("express");
const routes = require("./routes");
var path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
