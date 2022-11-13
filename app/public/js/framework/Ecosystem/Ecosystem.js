class Ecosystem {
    
    #species;
    #foodWeb;
    #organismBuilder;
    #mutator;

    constructor(world, model){
        
        this.world   = world;
        this.history = [];

        this.#species = this.setUpSpecies(model.species);
        this.#foodWeb = this.setUpFoodWeb(model.foodWeb);

        // subordinate modules

        this.#organismBuilder   = new OrganismBuilder(this);
        this.#mutator           = new Mutator(this);

        this.#mutator.init(model.mutations);
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

            if(this.#species[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey) && !this.world.getCollection(`Active${prey}`)){
                        throw Error `Cannot create foodweb with prey type '${consumer}' because it collections for it are not registered `
                    }
                })
            }
        });

        return foodWeb;
    }

    getSpecie(specieName){

        if(!this.#species[specieName]){
            throw Error(`Cannot get specie named '${specieName}' because it is not registered inside Ecosystem`);
        }

        return this.#species[specieName];
    }

    getAllSpecies(){
        return this.#species;
    }

    getFoodWeb(){
        return this.#foodWeb;
    }

    getPopulationOf(specieName){

        if(!this.#species[specieName]){
            throw Error(`Specie named '${specieName}' is not registered`);
        }

        let specieCollection = this.world.getCollection(specieName);
        if(!specieCollection){
            throw Error(`System error, the specie named '${specieName}' is registered inside Ecosystem, but it's collections aren't present inside World`);
        }

        return specieCollection.length;

    }

    generateOrganism(specieName,attributes = null){
        return this.#organismBuilder.generateOrganism(specieName,attributes);
    }

    generateOffSpring(organism){
        let offspring = this.#organismBuilder.cloneOrganism(organism);
        this.#mutator.mutateOrganism(offspring);
        return offspring;
    }

    addOrganism(organism){
        this.#organismBuilder.addOrganism(organism);

    }

    mutateOrganism(organism){
        this.#mutator.mutateOrganism(organism);
    }

}