class EventManager{

    constructor(world){
        this.world  = world;
        this.events = {};
    }

    registerEvent(eventName){
        if(this.events[eventName]){
            console.warn(`Event named '${eventName} has already been registered'`);
            return false;
        }

        this.events[eventName] = {};
    }

    registerServiceToEvent(serviceName,eventName){
        if(!this.events[eventName]){
            console.warn(`Cannot register service '${serviceName}' to unregistered event '${eventName}'`);
            return false;
        }

        var service = this.world.getService(serviceName)

        if(!service){
            console.warn(`Cannot register service '${serviceName}' to event, because the service is not registered to the framework`);
            return false;
        }

        this.events[eventName][serviceName] = service;
    }

    notifyServices(eventName, details){

    }


}