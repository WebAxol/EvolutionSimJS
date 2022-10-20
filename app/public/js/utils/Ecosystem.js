class Ecosystem {
    constructor(world,species,foodweb){
        this.world    = world;
        this.species  = this.setUpSpecies(species);
        this.foodWeb  = this.setUpFoodWeb(foodweb);
    }

    setUpSpecies(species){

        var _species = {};

        species.forEach(specieName => {
            _species[specieName] = 1;
            this.world.registerCollection(specieName);
            this.world.registerCollection('Active' + specieName);

        });

        return _species;
    }

    setUpFoodWeb(foodWeb){

        Object.keys(foodWeb).forEach( (consumer) => {

            if(!this.world.getCollection(consumer) && !this.world.getCollection(`Active${prey}`)){
                throw Error `Cannot create foodweb with consumer type '${consumer}' because collections for it are not registered `
            } 

            if(this.species[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey) && !this.world.getCollection(`Active${prey}`)){
                        throw Error `Cannot create foodweb with prey type '${consumer}' because it collections for it are not registered `
                    }
                })
            }
        });

        return foodWeb;
    }
}