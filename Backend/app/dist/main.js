"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var main_dispatcher_1 = __importDefault(require("./dispatcher/main-dispatcher"));
var app = express();
app.use(main_dispatcher_1.default);
app.listen(3000, function () { return console.log("Server is listening at 3000"); });
