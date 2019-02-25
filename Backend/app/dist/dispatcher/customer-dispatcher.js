"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var customer_bo_impl_1 = require("../business/customer-bo-impl");
var cors = require("cors");
var customerDispatcher = express.Router();
customerDispatcher.route("")
    .get(function (req, res) {
    var promise = new customer_bo_impl_1.CustomerBoImpl().findAllCustomers();
    promise.then(function (customers) {
        res.status(200).json(customers);
    }).catch(function (error) {
        res.status(500).send(error);
    });
})
    .post(function (req, res) {
    if (!("id" in req.body && "name" in req.body && "address" in req.body)) {
        res.status(400).send("Invalid Request Body");
        return;
    }
    var promise = new customer_bo_impl_1.CustomerBoImpl().saveCustomer(req.body);
    promise.then(function (status) { return res.status(201).json(status); })
        .catch(function (err) { return res.status(500).send(err); });
})
    .head((cors({
    exposedHeaders: ['X-Count']
})), function (req, res) {
    var t1 = new Date().valueOf(); // time stamp
    var promise = new customer_bo_impl_1.CustomerBoImpl().customerCount();
    promise.then(function (count) {
        res.append("X-Count", count + "");
        res.sendStatus(200);
    }).catch(function (error) {
        res.status(500);
    });
});
customerDispatcher.route("/:id")
    .get(function (req, res) {
    var promise = new customer_bo_impl_1.CustomerBoImpl().findCustomer(req.params.id);
    promise.then(function (customers) {
        if (customers.length > 0) {
            res.status(200).send(customers[0]);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
})
    .delete(function (req, res) {
    var promise = new customer_bo_impl_1.CustomerBoImpl().deleteCustomer(req.params.id);
    promise.then(function (status) {
        if (status) {
            res.status(200).send(true);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
})
    .put(function (req, res) {
    if (!("id" in req.body && "name" in req.body && "address" in req.body)) {
        res.status(400).send("Invalid Request Body");
        return;
    }
    if (req.body.id !== req.params.id) {
        res.status(400).send("Mismatched Customer ID");
        return;
    }
    var promise = new customer_bo_impl_1.CustomerBoImpl().updateCustomer(req.body);
    promise.then(function (status) {
        if (status) {
            res.status(200).send(true);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(function (error) {
        res.status(500).send(error);
    });
});
exports.default = customerDispatcher;
