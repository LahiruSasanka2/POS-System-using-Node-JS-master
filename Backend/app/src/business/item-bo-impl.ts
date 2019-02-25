import {ItemDTO} from "../dto/item-dto";
import {pool} from "../db/db-pool";
import {DAOTypes, getDAO} from "../dao/dao-factory";
import Promise = require("promise");
import {ItemDAO} from "../dao/custom/item-dao";
import {CustomerDAO} from "../dao/custom/customer-dao";

export class ItemBoImpl{

    itemCount():Promise<number>{

        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err){
                    reject(err)
                }else {
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise= itemDAO.count();
                    promise.then(count =>{
                        resolve(count);
                    } ).catch(err=>{
                        reject(err);
                    })
                }
            })
        });
    }

    findAllItems(): Promise<Array<ItemDTO>>{

        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }else{
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise = itemDAO.findAll();
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

    findItem(code: string): Promise<Array<ItemDTO>>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }else{
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise = itemDAO.find(code);
                    promise.then(items => {
                        resolve(items);
                        pool.releaseConnection(connection);
                    }).catch(error=>{
                        reject(error);
                        pool.releaseConnection(connection);
                    });
                }
            });
        });
    }

    saveItem(item: ItemDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }else{
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise = itemDAO.save(item);
                    promise.then(result => {
                        if (result==true){
                            console.log("sfadfadsfadsfasdfa");
                        }
                        console.log("dasfad")
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

    updateItem(item: ItemDTO): Promise<boolean>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }else{
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise = itemDAO.update(item);
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

    deleteItem(code: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err){
                    reject(err);
                }else{
                    const itemDAO = <ItemDAO> getDAO(DAOTypes.ITEM, connection);
                    const promise = itemDAO.delete(code);
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
}