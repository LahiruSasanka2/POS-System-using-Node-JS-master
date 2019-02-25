"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_pool_1 = require("../db/db-pool");
var dao_factory_1 = require("../dao/dao-factory");
var Promise = require("promise");
var ItemBoImpl = /** @class */ (function () {
    function ItemBoImpl() {
    }
    ItemBoImpl.prototype.itemCount = function () {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.count();
                    promise.then(function (count) {
                        resolve(count);
                    }).catch(function (err) {
                        reject(err);
                    });
                }
            });
        });
    };
    ItemBoImpl.prototype.findAllItems = function () {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.findAll();
                    promise.then(function (customers) {
                        resolve(customers);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    ItemBoImpl.prototype.findItem = function (code) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.find(code);
                    promise.then(function (items) {
                        resolve(items);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    ItemBoImpl.prototype.saveItem = function (item) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.save(item);
                    promise.then(function (result) {
                        if (result == true) {
                            console.log("sfadfadsfadsfasdfa");
                        }
                        console.log("dasfad");
                        resolve(result);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    ItemBoImpl.prototype.updateItem = function (item) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.update(item);
                    promise.then(function (result) {
                        resolve(result);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    ItemBoImpl.prototype.deleteItem = function (code) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var itemDAO = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, connection);
                    var promise = itemDAO.delete(code);
                    promise.then(function (result) {
                        resolve(result);
                        db_pool_1.pool.releaseConnection(connection);
                    }).catch(function (error) {
                        reject(error);
                        db_pool_1.pool.releaseConnection(connection);
                    });
                }
            });
        });
    };
    return ItemBoImpl;
}());
exports.ItemBoImpl = ItemBoImpl;
