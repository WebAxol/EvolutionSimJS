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
                let isProducer = organism.getType() == 'Producer';

                if(organism.foodCount >= organism.foodFee * 2 || isProducer){

                    if( actualPopulation + offspring.length >= populationLimit){
                        break;
                    }

                    offspring.push(this.ecosystem.generateOffSpring(organism));
                }

                if(!isProducer){
                    organism.foodCount = 0;
                    organism.energy = organism.maxEnergy;   
                }
            }

            while(offspring.length){
                this.ecosystem.addOrganism(offspring.pop());
            }
        });
    }

    reactivateOrganisms(){

        var specieNames = Object.keys(this.ecosystem.getAllSpecies()),
            remain = false;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            for(let i = 0; i < specie.length; i++){

                let organism = specie[i];

                // Is organism too old ?

                if(organism.age >= organism.lifespan){

                    // Yes - Remove organism

                    this.world.removeAgent(organism);
                }

                // In case that specie is not a producer

                else if(organism.getType() != 'Producer'){ 

                    // Reactivate organism

                    organism.active = true;
                    remain = true;
                    this.world.addToCollection(`Active${specieName}`,organism);   
                }

                organism.age++;
            }
        });

        return remain;
    }


    // EVENTS   

    onsummaryCreated(details){
        console.log(`Generation ${this.generation} finished, starting generation ${this.generation + 1}`);
        this.generation++;

        // Update generation counter

        document.getElementById('generationCounter').innerHTML = `Generation: ${this.generation}`;

        // Prepare for next generation... or end simulation

        let remain = this.reactivateOrganisms();
        
        if(!remain){
            this.world.notifyEvent('simulationOver');
            return false;
        }   
        
        this.createOffspring();

        // Trigger next generation

        this.world.notifyEvent('newGenerationReady');
    }

}