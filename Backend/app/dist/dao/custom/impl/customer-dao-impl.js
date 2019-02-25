"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("promise");
var CustomerDAOImpl = /** @class */ (function () {
    function CustomerDAOImpl(connection) {
        this.connection = connection;
    }
    CustomerDAOImpl.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("select count(*) as count from customer", function (err, results) {
                if (err) {
                    // return this.connection.rollback(function () {
                    reject(err);
                    // });
                }
                else {
                    resolve(results[0].count);
                }
            });
        });
    };
    CustomerDAOImpl.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("DELETE FROM Customer WHERE id='" + id + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    CustomerDAOImpl.prototype.find = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM Customer WHERE id='" + id + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    CustomerDAOImpl.prototype.findAll = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("SELECT * FROM Customer", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    CustomerDAOImpl.prototype.save = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("INSERT INTO Customer VALUES ('" + entity.id + "','" + entity.name + "','" + entity.address + "','" + entity.salary + "')", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    CustomerDAOImpl.prototype.update = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query("UPDATE Customer SET name = '" + entity.name + "', address ='" + entity.address + "', salary ='" + entity.salary + "' WHERE id='" + entity.id + "'", function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    };
    return CustomerDAOImpl;
}());
exports.CustomerDAOImpl = CustomerDAOImpl;
