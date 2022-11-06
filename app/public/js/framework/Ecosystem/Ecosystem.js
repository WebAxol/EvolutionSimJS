class Ecosystem {
    
    #mutator;
    #organismBuilder;

    constructor(world,species,foodweb){
        
        this.world   = world;
        this.history = [];
        this.species = this.setUpSpecies(species);
        this.foodWeb = this.setUpFoodWeb(foodweb);

        // subordinate modules

        this.#mutator           = new Mutator(this);
        this.#organismBuilder   = new OrganismBuilder(this);
    }

    setUpSpecies(species){

        Object.keys(species).forEach(specieName => {
            this.world.registerCollection(specieName);
            this.world.registerCollection('Active' + specieName);
        });
    
        return species;
    }

    setUpFoodWeb(foodWeb){

        Object.keys(foodWeb).forEach( (consumer) => {
            collections : ['Kinetics']
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

    generateOrganism(specieName,attributes = null){
        return this.#organismBuilder.generateOrganism(specieName,attributes);
    }

    cloneOrganism(organism){
        return this.#organismBuilder.cloneOrganism(organism);
    }

    addOrganism(organism){
        this.#organismBuilder.addOrganism(organism);

    }


}