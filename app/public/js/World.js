class World {

    constructor(){

        this.services = {};
        this.collections = {};

        //Iteration

        this.frame = 0;
        this.routine = () => {};
        this.pause = false;
    }

    registerService(name,service){

        if(this.services[name]){
            console.warn(`Service named '${name}' already registered`);
            return;
        }

        if(!service || service == null){
            throw Error(`Cannot register invalid or null service '${name}'`);
        }

        service.world = this;
        this.services[name] = service;

    }

    registerCollection(name){

        if(this.collections[name]){
            console.warn(`Collection named '${name}' already registered`);
            return;
        }

        this.collections[name] = [];
        return this;
    }

    addToCollection(collectionName,object){
        this.collections[collectionName].push(object);
    }

    execute(){
        requestAnimationFrame(() => { this.execute() });

        if(!this.pause){
            this.frame++;
            this.routine(this);
        }
    }

    stop(){
        this.pause = true;
    }

    resume(){
        this.pause = false;
    }


}