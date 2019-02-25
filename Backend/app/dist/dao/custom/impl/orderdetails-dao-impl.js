"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("promise");
var OrderDetailsDAOImpl = /** @class */ (function () {
    function OrderDetailsDAOImpl(connection) {
        this.connection = connection;
    }
    OrderDetailsDAOImpl.prototype.delete = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("DELETE FROM orderdetail WHERE orderId='" + orderId + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    OrderDetailsDAOImpl.prototype.find = function (orderId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM orderdetail WHERE orderId='" + orderId + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    OrderDetailsDAOImpl.prototype.findAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM orderdetail", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    OrderDetailsDAOImpl.prototype.save = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("INSERT INTO orderdetail VALUES ('" + entity.orderId + "','" + entity.itemCode + "','" + entity.qty + "','" + entity.unitPrice + "')", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    OrderDetailsDAOImpl.prototype.update = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("UPDATE orderdetail SET itemCode = '" + entity.itemCode + "', qty ='" + entity.qty + "', unitPrice ='" + entity.unitPrice + "' WHERE orderId='" + entity.orderId + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    return OrderDetailsDAOImpl;
}());
exports.OrderDetailsDAOImpl = OrderDetailsDAOImpl;
