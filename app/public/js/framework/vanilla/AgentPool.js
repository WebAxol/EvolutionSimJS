class AgentPool{

    #types;
    #pools;

    constructor(world){
        this.world = world;
        this.#types = {} // Type Object Pattern
        this.#pools = {} // Object Pool Pattern
    }

    registerType(typeName,prototype){

        if(this.#types[typeName]){
            console.warn(`The type named '${typeName}' has already been registered`);
            return false;
        }

        this.#types[typeName] = prototype;
        this.#pools[typeName] = [];
    }


    createAgent(typeName,details){

        var world = this.world;

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
                        let _field =  prototype['info'][field];

                        if(typeof _field == 'object'){
                            this[field] = Object.assign({},_field); 
                        }
                        else{
                            this[field] = _field;
                        }
                    });
                }
            }

            getType(){
                return this.#type;
            }

            isInCollection(collectionName){
                return this.#collections[collectionName];
            }

            getCollections(){
                return Object.keys(this.#collections);
            }

            addCollection(collectionName){
                this.#collections[collectionName] = 1;
            }
            removeCollection(collectionName){
                delete this.#collections[collectionName];
            }
            reset(prototype){

                Object.keys(prototype['info']).forEach((field) => {
                    let _field =  prototype['info'][field];
                        if(typeof _field == 'object'){
                        this[field] = Object.assign({},_field); 
                    }
                    else{
                        this[field] = _field;
                    }
                });
            }
        }

        var agent =  new Agent(typeName,this.#types[typeName]);
        
        if(this.#pools[typeName].length > 0){
            agent = this.#pools[typeName].pop();
            this.resetAgent(agent);
        }
        else{
            agent = new Agent(typeName,this.#types[typeName]);
        }
        
        Object.keys(details['info']).forEach((detail) => {
            agent[detail] = details['info'][detail];
        })

        return agent;
    }

    getCollectionsOfType(typeName){

        if(!this.#types[typeName]){
            console.warn(`Cannot get collections from unexisting type '${typename}'`);
            return false;
        }

        let collections = this.#types[typeName].collections || [];

        return collections;
    }

    removeAgent(agent){

        try{

        let agentType = agent.getType();
        this.#pools[agentType].push(agent);

        let agentCollections = agent.getCollections();

        agentCollections.forEach((collectionName) => {
            WORLD.removeFromCollection(collectionName,agent);
        });

        let agentChildren = Object.keys(agent._children);
        
        while(agentChildren.length){
            this.removeAgent(agent._children[agentChildren[0]]);
            delete agent._children[agentChildren[0]];
            agentChildren.shift();
        }

        }catch(err){
            console.warn(`Error, agent ${agent}`);
            console.log(agent);
        }
    }

    resetAgent(agent){
        let prototype = this.#types[agent.getType()];
        agent.reset(prototype);
    }
}