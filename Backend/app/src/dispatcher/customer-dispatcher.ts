import express = require("express");
import {CustomerBoImpl} from "../business/customer-bo-impl";
import cors = require("cors");

const customerDispatcher = express.Router();

customerDispatcher.route("")
    .get((req, res) => {

        const promise = new CustomerBoImpl().findAllCustomers();
        promise.then(customers=>{
            res.status(200).json(customers);
        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .post((req, res) => {

        if (!("id" in req.body && "name" in req.body && "address" in req.body)){
            res.status(400).send("Invalid Request Body");
            return;
        }

        const promise = new CustomerBoImpl().saveCustomer(req.body);
        promise.then(status => res.status(201).json(status))
            .catch(err=>res.status(500).send(err));

    })
    .head((cors({
        exposedHeaders:['X-Count']
    })),(req, res) => {
        const t1= new Date().valueOf();// time stamp
        const promise = new CustomerBoImpl().customerCount();
        promise.then(count=>{
            res.append("X-Count",count + "");
            res.sendStatus(200);
        }).catch(error=>{
            res.status(500);
        })
    });


customerDispatcher.route("/:id")
    .get((req, res) => {

        const promise = new CustomerBoImpl().findCustomer(req.params.id);
        promise.then(customers=>{

            if (customers.length > 0){
                res.status(200).send(customers[0]);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .delete((req, res) => {

        const promise = new CustomerBoImpl().deleteCustomer(req.params.id);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    })
    .put((req, res) => {

        if (!("id" in req.body && "name" in req.body && "address" in req.body)){
            res.status(400).send("Invalid Request Body");
            return;
        }

        if (req.body.id !== req.params.id){
            res.status(400).send("Mismatched Customer ID");
            return;
        }

        const promise = new CustomerBoImpl().updateCustomer(req.body);
        promise.then(status=>{

            if (status){
                res.status(200).send(true);
            }else{
                res.sendStatus(404);
            }

        }).catch(error=>{
            res.status(500).send(error);
        });

    });

export default customerDispatcher;
