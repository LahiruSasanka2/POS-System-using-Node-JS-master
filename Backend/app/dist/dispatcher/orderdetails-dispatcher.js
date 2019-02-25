"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var orderdetails_bo_impl_1 = require("../business/orderdetails-bo-impl");
var orderDetailsDispatcher = express.Router();
orderDetailsDispatcher.route("")
    .post(function (req, res) {
    console.log(req.body[0]);
    var promise = new orderdetails_bo_impl_1.OrderDertailsBOImpl().orderTransaction(req.body[0], req.body[1], req.body[2], req.body[3]);
    promise.then(function (status) { return res.status(201).json(status); })
        .catch(function (err) { return res.status(500).send(err); });
});
exports.default = orderDetailsDispatcher;
