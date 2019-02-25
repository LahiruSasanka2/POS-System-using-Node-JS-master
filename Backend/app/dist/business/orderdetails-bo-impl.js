"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dao_factory_1 = require("../dao/dao-factory");
var Promise = require("promise");
var db_pool_1 = require("../db/db-pool");
var OrderDertailsBOImpl = /** @class */ (function () {
    function OrderDertailsBOImpl() {
    }
    OrderDertailsBOImpl.prototype.orderTransaction = function (customer, orders, orderDetails, item) {
        return new Promise(function (resolve, reject) {
            db_pool_1.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                }
                else {
                    var conn = connection;
                    var customerDAO_1 = dao_factory_1.getDAO(dao_factory_1.DAOTypes.CUSTOMER, conn);
                    var itemDAO_1 = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ITEM, conn);
                    var orderDAO_1 = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDERS, conn);
                    var orderDetailsDAO_1 = dao_factory_1.getDAO(dao_factory_1.DAOTypes.ORDERDETAILS, conn);
                    conn.beginTransaction(function (err) {
                        if (err) {
                            throw err;
                        }
                        var promise = customerDAO_1.save(customer);
                        promise.then(function (result) {
                            conn.commit(function (err) {
                                if (err) {
                                    return conn.rollback(function () {
                                        throw err;
                                    });
                                }
                                console.log('success Customer!');
                                var promise1 = orderDAO_1.save(orders);
                                promise1.then(function (result) {
                                    conn.commit(function (err) {
                                        if (err) {
                                            return conn.rollback(function () {
                                                throw err;
                                            });
                                        }
                                        console.log('success Customer!');
                                        var promise1 = orderDetailsDAO_1.save(orderDetails);
                                        promise1.then(function (result) {
                                            conn.commit(function (err) {
                                                if (err) {
                                                    return conn.rollback(function () {
                                                        throw err;
                                                    });
                                                }
                                                var promise1 = itemDAO_1.save(item);
                                                promise1.then(function (result) {
                                                    conn.commit(function (err) {
                                                        if (err) {
                                                            return conn.rollback(function () {
                                                                throw err;
                                                            });
                                                        }
                                                        console.log('success itemDAO!');
                                                    });
                                                }).catch(function (error) {
                                                    console.log('unsuccess itemDAO!');
                                                    return conn.rollback(function () {
                                                        reject(error);
                                                        db_pool_1.pool.releaseConnection(connection);
                                                    });
                                                });
                                                console.log('success orderDetailsDAO!');
                                            });
                                        }).catch(function (error) {
                                            console.log('unsuccess orderDetailsDAO!');
                                            return conn.rollback(function () {
                                                reject(error);
                                                db_pool_1.pool.releaseConnection(connection);
                                            });
                                        });
                                        console.log('success Order!');
                                    });
                                }).catch(function (error) {
                                    console.log('unsuccess Order!');
                                    return conn.rollback(function () {
                                        reject(error);
                                        db_pool_1.pool.releaseConnection(connection);
                                    });
                                });
                            });
                        }).catch(function (error) {
                            console.log('unsuccess Customer!');
                            return conn.rollback(function () {
                                reject(error);
                                db_pool_1.pool.releaseConnection(connection);
                            });
                        });
                    });
                }
            });
        });
    };
    return OrderDertailsBOImpl;
}());
exports.OrderDertailsBOImpl = OrderDertailsBOImpl;
