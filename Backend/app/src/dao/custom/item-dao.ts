import {Item} from "../../entity/item";

export interface ItemDAO extends SuperDAO<Item, string>{
    count():Promise<number>
}