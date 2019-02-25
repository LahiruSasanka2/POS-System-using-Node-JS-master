import express = require("express");
import mainDespatcher from "./dispatcher/main-dispatcher";

const app = express();

app.use(mainDespatcher);

app.listen(3000, () => console.log("Server is listening at 3000"));