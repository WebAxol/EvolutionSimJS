class Generations extends Service{

    constructor(ecosystem){
        super();
        this.generation = 1;
        this.ecosystem = ecosystem;
    }

    // Note - the code could be refactored in such a way that there is only one foreach loop

    createOffspring(){

        var specieNames = Object.keys(this.ecosystem.getAllSpecies());
        var offspring = [];
        
        specieNames.forEach(specieName => {

            var specie          = this.world.getCollection('Active' + specieName);            
            var populationLimit  = this.ecosystem.getSpecie(specieName).populationLimit || Number.POSITIVE_INFINITY;
            var actualPopulation = this.ecosystem.getPopulationOf(specieName);

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];

                if(organism.foodCount >= organism.foodFee * 2){

                    if( actualPopulation + offspring.length >= populationLimit){
                        break;
                    }

                    offspring.push(this.ecosystem.generateOffSpring(organism));
                }

                organism.foodCount = 0;
                organism.energy = organism.maxEnergy;
            }

            while(offspring.length){
                this.ecosystem.addOrganism(offspring.pop());
            }
        });
    }

    reactivateOrganisms(){

        var specieNames = Object.keys(this.ecosystem.getAllSpecies()),
            empty = true;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            empty = specie.length <= 0;

            for(let i = 0; i < specie.length; i++){

                let organism = specie[i];

                // Is organism too old ?

                if(organism.age >= organism.lifespan){

                    // Yes - Remove organism

                    this.world.removeAgent(organism);
                }

                // In case that specie is not a producer

                else if(this.ecosystem.getSpecie(specieName).foodFee > 0){ 

                    // Reactivate organism

                    organism.active = true;
                    this.world.addToCollection(`Active${specieName}`,organism);   
                }

                organism.age++;
            }
        });

        if(empty){
            // All consumers extinct - TODO : Trigger event onsimulationOver to stop simulation and send all data to server
        }

    }


    // EVENTS   

    onsummaryCreated(details){
        console.log(`Generation ${this.generation} finished, starting generation ${this.generation + 1}`);
        this.generation++;

        // Update generation counter

        document.getElementById('generationCounter').innerHTML = `Generation: ${this.generation}`;

        // Prepare for next generation

        this.reactivateOrganisms();
        this.createOffspring();

        // Trigger next generation

        this.world.notifyEvent('newGenerationReady');
    }

}