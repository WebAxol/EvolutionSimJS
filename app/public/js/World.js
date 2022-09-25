class World {

    #services;
    #collections;

    constructor(){

        this.#services = {};
        this.#collections = {};

        //Iteration

        this.frame = 0;
        this.routine = () => {};
        this.pause = false;
    }

    registerService(name,service){

        if(this.#services[name]){
            console.warn(`Service named '${name}' already registered`);
            return false;
        }

        if(!service || service == null){
            throw Error(`Cannot register invalid or null service '${name}'`);
        }

        service.world = this;
        this.#services[name] = service;
        this.#services[name].init();

    }

    getService(serviceName){

        if(this.#services[serviceName]){
            return this.#services[serviceName];
        }

        console.warn(`Cannot get unregistered service '${serviceName}'`)
        return false;
    }

    registerCollection(name){

        if(this.#collections[name]){
            console.warn(`Collection named '${name}' already registered`);
            return false;
        }

        this.#collections[name] = [];
        return this;
    }

    getCollection(collectionName){

        if(this.#collections[collectionName]){
            return this.#collections[collectionName];
        }

        console.warn(`Cannot get unregistered collection '${collectionName}'`)
        return false;
    }


    addToCollection(collectionName,object){

        if(!this.#collections[collectionName]){
            console.warn(`collection named '${collectionName} is not registered'`);
            return false;
        }

        this.#collections[collectionName].push(object);
    }

    removeFromCollection(collectionName,object){
        let index = this.#collections[collectionName].indexOf(object);
        this.#collections[collectionName].splice(index,1);
    }

    execute(){
        try{
            requestAnimationFrame(() => { this.execute() });

            Object.keys(this.#services).forEach((service) => {
                service,this.#services[service].execute();
             });

            if(!this.pause){
                this.frame++;
                this.routine(this);
            }
        }catch(err){
            this.stop();
            return;
            throw Error(err);
        }
    }

    stop(){
        this.pause = true;
    }

    resume(){
        this.pause = false;
    }


}