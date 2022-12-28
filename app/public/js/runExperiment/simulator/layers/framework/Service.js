class Service{

    constructor(){
        this.world = new World();
    }

    execute(){  // called by the World object
        return false;
    }

    executeAsSubordinate(){ // called by chief modules above it, when the service is a sub-service of another one
        return false;
    }

    init(){
        return false;
    }
}