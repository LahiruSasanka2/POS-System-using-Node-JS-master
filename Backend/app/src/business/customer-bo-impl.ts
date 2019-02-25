import {CustomerDTO} from "../dto/customer-dto";
import {pool} from "../db/db-pool";
import {DAOTypes, getDAO} from "../dao/dao-factory";
import {CustomerDAO} from "../dao/custom/customer-dao";
import Promise = require("promise");

export class CustomerBoImpl{

    findAllCustomers(): Promise<Array<CustomerDTO>>{

        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const customerDAO = <CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);

                    const promise = customerDAO.findAll();
                    promise.then(customers => {
                        resolve(customers);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });

    }

    findCustomer(id: string): Promise<Array<CustomerDTO>>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const customerDAO = <CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);

                    const promise = customerDAO.find(id);
                    promise.then(customer => {
                        resolve(customer);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    saveCustomer(customer: CustomerDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const customerDAO = <CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);

                    const promise = customerDAO.save(customer);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    updateCustomer(customer: CustomerDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const customerDAO = <CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);

                    const promise = customerDAO.update(customer);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    deleteCustomer(id: string): Promise<boolean>{
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {

                if (err){
                    reject(err);
                }else{

                    const customerDAO = <CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);

                    const promise = customerDAO.delete(id);
                    promise.then(result => {
                        resolve(result);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });

                }

            });


        });
    }

    customerCount():Promise<number>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err)
                }else {
                    const customerDAO=<CustomerDAO> getDAO(DAOTypes.CUSTOMER, connection);
                    const promise= customerDAO.count();
                    promise.then(count =>{
                        resolve(count);
                    } ).catch(err=>{
                        reject(err);
                    })
                }
            })
        });
    }

}