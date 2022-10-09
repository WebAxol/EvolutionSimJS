class AgentPool{

    #types;
    #pools;

    constructor(world){
        this.world = world;
        this.#types = {} // Type Object Pattern
        this.#pools = {} // Object Pool Pattern
    }

    registerType(typeName,prototype){

        // Agent class is within AgentPool class, so that only AgentPool can instantiate Agents

        class Agent{

            #type;
            #collections;

            constructor(typeName,prototype){

                this._children = {};
                this.#collections = {};
                this.#type = typeName;

                if(prototype['info']){

                    Object.keys(prototype['info']).forEach((field) => {
                        this[field] = prototype['info'][field];
                    });
                }

                if(prototype['collections']){
 
                    prototype['collections'].forEach((collection) => {

                        // ! Warning : WORLD is hardcoded

                       if(WORLD.getCollection(collection)){
                            this.#collections[collection] = 1;
                       }
                       else{
                            console.warn(`There is no collection named '${collection}' for agent type ${typeName}`);
                       }
                    });
                }
            }

            isInCollection(collectionName){
                return this.#collections[collectionName];
            }

            getCollection(){
                return Object.keys(this.#collections);
            }

            addCollection(collectionName){
                this.#collections[collectionName] = 1;
            }
        }

        /*------------------------------------------------------------------------------------*/

        if(this.#types[typeName]){
            console.warn(`The type named '${typeName}' has already been registered`);
            return false;
        }

        this.#types[typeName] = new Agent(typeName,prototype);
        this.#pools[typeName] = [];
    }


    createAgent(typeName){
        
        return Object.assign(this.#types[typeName]);

    }


}