import Promise = require("promise");
import {Customer} from "../../../entity/customer";
import {CustomerDAO} from "../customer-dao";
import {PoolConnection} from "mysql";


export class CustomerDAOImpl implements CustomerDAO {

    constructor(private connection: PoolConnection) {
    }

    count(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.connection.query("select count(*) as count from customer",(err, results) => {
               if (err){
                   // return this.connection.rollback(function () {
                       reject(err);
                   // });
               }  else {
                   resolve(results[0].count);
               }
            });
        });
    }

    delete(id: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.connection.query(`DELETE FROM Customer WHERE id='${id}'`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0);
                    }

                });
        });

    }

    find(id: string): Promise<Array<Customer>> {

        return new Promise((resolve, reject) => {

            this.connection.query(`SELECT * FROM Customer WHERE id='${id}'`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }

                });
        });

    }

    findAll(): Promise<Array<Customer>> {

        return new Promise((resolve, reject) => {

            this.connection.query(`SELECT * FROM Customer`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }

                });
        });

    }

    save(entity: Customer): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.connection.query(`INSERT INTO Customer VALUES ('${entity.id}','${entity.name}','${entity.address}','${entity.salary}')`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0);
                    }

                });
        });

    }

    update(entity: Customer): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE Customer SET name = '${entity.name}', address ='${entity.address}', salary ='${entity.salary}' WHERE id='${entity.id}'`,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0);
                    }

                });
        });
    }

}