// NOTE: Ecosystem is a layer built over the framework utilized: CASES, if there is a problem with the framework or it isn't present, the logic at Ecosystem wont work

class Ecosystem { 
    /* 
        - Responsible of instancing and preparing organisms and their collections for their allocation at WORLD.
        - Also responsible of storing the ecosystem relevant information to be available for other modules to consume it.
    */
        
    
    #species;
    #foodWeb;

    // subordinate modules

    #organismBuilder; // the responsibility of instancing and preparing organisms is pawned to this module
    #mutator;         // it is responsible of mutating organisms just after they are built by organismBuilder

    constructor(world, setUp){
        
        if(!this.isSetUpValid(setUp)){
            throw Error('The experiment setUp is not valid');
        }
        else{

            this.world   = world;
            this.history = [];

            this.#species = this.setUpSpecies(setUp.species);
            this.#foodWeb = this.setUpFoodWeb(setUp.foodWeb);

            this.#organismBuilder = new OrganismBuilder(this);
            this.#mutator         = new Mutator(this);
            this.#mutator.init(setUp.mutations);
    
    
            // WARNING: the methods to instance organisms depend on the existance of the agentTypes "Organism" and "Circle"

            this.generateInitialOrganisms();
        }
    }

    isSetUpValid(setUp){

        if(!setUp.species)   return false;
        if(!setUp.foodWeb)   return false;

        return true;
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
        
            if(!this.world.getCollection(consumer) && !this.world.getCollection(`Active${prey}`)){
                throw Error (`Cannot create foodweb with consumer type '${consumer}' because collections for it are not registered`);
            } 

            if(this.#species[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey) && !this.world.getCollection(`Active${prey}`)){
                        throw Error(`Cannot create foodweb with prey type '${consumer}' because it collections for it are not registered`);
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

        if(!this.#species[specieName]){
            throw Error(`Specie named '${specieName}' is not registered`);
        }

        if(this.getPopulationOf(specieName) >= (this.#species[specieName].populationLimit || Number.POSITIVE_INFINITY)){
            console.log(`Specie named '${specieName}' has reached its population limit: `);
            return false;
        }
        
        return this.#organismBuilder.generateOrganism(specieName,attributes);
    }

    generateOffSpring(organism){

        let specieName = organism.specie;

        if(!this.#species[specieName]){
            throw Error(`Specie named '${specieName}' is not registered`);
        }

        if(this.getPopulationOf(specieName) >= (this.#species[specieName].populationLimit || Number.POSITIVE_INFINITY)){
            console.log(`Specie named '${specieName}' has reached its population limit: `);
            return false;
        }

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

    generateInitialOrganisms(){
        Object.keys(this.#species).forEach(specieName => {
            for(let i = 0; i < (this.#species[specieName].initialPopulation | 10); i++){

                let organism = this.generateOrganism(specieName);
                this.addOrganism(organism);
            }
        });
    }
}