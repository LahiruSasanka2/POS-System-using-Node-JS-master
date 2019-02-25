import {CustomerDAOImpl} from "./custom/impl/customer-dao-impl";
import {ItemDAOImpl} from "./custom/impl/Item-dao-impl";
import {PoolConnection} from "mysql";
import {OrderDetailsDAOImpl} from "./custom/impl/orderdetails-dao-impl";
import {OrderDAOImpl} from "./custom/impl/order-dao-impl";

export enum DAOTypes{
    CUSTOMER, ITEM ,ORDERS,ORDERDETAILS
}

export function getDAO(daoType: DAOTypes, connection: PoolConnection){
    switch (daoType) {
        case DAOTypes.CUSTOMER:
            return new CustomerDAOImpl(connection);
        case DAOTypes.ITEM:
            return new ItemDAOImpl(connection);
        case DAOTypes.ORDERS:
            return new OrderDAOImpl(connection);
        case DAOTypes.ORDERDETAILS:
            return new OrderDetailsDAOImpl(connection);
        default:
            return null;
    }
}