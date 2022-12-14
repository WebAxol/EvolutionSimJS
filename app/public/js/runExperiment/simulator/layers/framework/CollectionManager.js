class CollectionManager {

    #collections;

    constructor(world){
        this.world = world;
        this.#collections = {};
        this.toBeRemoved  = [];
        this._objectPool   = []; // Only for internal use
    }

    registerCollection(name){

        if(this.#collections[name]){
            throw Error(`Collection named '${name}' already registered`);
        }

        this.#collections[name] = [];
        return this;
    }

    getCollection(collectionName){

        if(this.#collections[collectionName]){
            return this.#collections[collectionName];
        }

        throw Error(`Cannot get unregistered collection '${collectionName}'`)
    }

    addToCollection(collectionName,object){

        if(!this.#collections[collectionName]){
            console.warn(`collection named '${collectionName} is not registered'`);
            return false;
        }

        if(object.isInCollection(collectionName)){
            throw Error(`The agent is already registered to collection ${collectionName}`);
            return false;
        }

        this.#collections[collectionName].push(object);
        object.addCollection(collectionName);
    }

    cacheToBeRemoved(collectionName,agent){

        var data;

        if(this._objectPool.length > 0){
            data = this._objectPool.pop();
            data.collectionName = collectionName;
            data.agent = agent;

            this.toBeRemoved.push(data);
        }
        else{
            this.toBeRemoved.push({
                collectionName : collectionName,
                agent : agent
            });
        }
    }

    removeFromCollection(collectionName,object){
        
        if(!this.#collections[collectionName]) throw Error(`Canot remove agent from collection ${collectionName} as the collection doesn't exist`);

        let index = this.#collections[collectionName].indexOf(object);
        this.#collections[collectionName].splice(index,1);
        object.removeCollection(collectionName);
    }

    removeAgentsFromCollections(){

        while(this.toBeRemoved.length > 0){
            let command = this.toBeRemoved.pop();
            this.removeFromCollection(command.collectionName,command.agent);

            command.collectionName = undefined;
            command.agent = undefined;

            this._objectPool.push(command);
        }
    }
}