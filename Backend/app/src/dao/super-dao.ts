
interface SuperDAO<T, ID> {

    findAll(): Promise<Array<T>>;


    find(id: ID): Promise<Array<T>>;


    save(entity: T): Promise<boolean>;


    update(entity: T): Promise<boolean>;


    delete(id: ID): Promise<boolean>;

}