import Promise = require("promise");
import {Item} from "../../../entity/item";
import {PoolConnection} from "mysql";
import {ItemDAO} from "../item-dao";


export class ItemDAOImpl implements ItemDAO {

    constructor(private connection: PoolConnection) {}

    count(): Promise<number> {
        return new Promise((resolve, reject) => {
            this.connection.query("select count(*) as count from item",(err, results) => {
                if (err){
                    reject(err);
                }  else {
                    resolve(results[0].count);
                }
            });
        });
    }

    delete(code: string): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.connection.query(`DELETE FROM item WHERE code='${code}'`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0);
                    }

                });
        });

    }

    find(code: string): Promise<Array<Item>> {

        return new Promise((resolve, reject) => {

            this.connection.query(`SELECT * FROM Item WHERE code='${code}'`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }

                });
        });

    }

    findAll(): Promise<Array<Item>> {

        return new Promise((resolve, reject) => {

            this.connection.query(`SELECT * FROM Item`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }

                });
        });

    }

    save(entity: Item): Promise<boolean> {

        return new Promise((resolve, reject) => {

            this.connection.query(
                `INSERT INTO Item VALUES ('${entity.code}','${entity.description}','${entity.qtyOnHand}','${entity.unitPrice}')`,
                (err, results) => {

                    if (err) {
                        reject(err);
                    } else {
                        resolve(results.affectedRows > 0);
                    }

                });
        });

    }

    update(entity: Item): Promise<boolean> {
        return new Promise((resolve, reject) => {

            console.log(`UPDATE Item SET description = '${entity.description}', qtyOnHand ='${entity.qtyOnHand}', unitPrice ='${entity.unitPrice}' WHERE code='${entity.code}'`);
            this.connection.query(`UPDATE Item SET description = '${entity.description}', qtyOnHand ='${entity.qtyOnHand}', unitPrice ='${entity.unitPrice}' WHERE code='${entity.code}'`,
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