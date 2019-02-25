import {Customer} from "../../entity/customer";

export interface CustomerDAO extends SuperDAO<Customer,string>{

    count():Promise<number>
}