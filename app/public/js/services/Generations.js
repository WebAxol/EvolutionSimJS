class Generations extends Service{

    constructor(ecosystem){
        super();
        this.generation = 1;
        this.ecosystem = ecosystem;
    }

    createOffspring(){

        var specieNames = Object.keys(this.ecosystem.getAllSpecies());
        var offspring = [];
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];

                if(organism.foodCount >= organism.foodFee * 2){

                    offspring.push(this.ecosystem.generateOffSpring(organism));
                }

                organism.foodCount = 0;
                organism.energy = organism.maxEnergy;
            }
        });

        offspring.forEach(organism => {
            this.ecosystem.addOrganism(organism);
        });
    }

    reactivateOrganisms(){

        var specieNames = Object.keys(this.ecosystem.getAllSpecies()),
            empty = true;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            if(this.ecosystem.getSpecie(specieName).foodFee > 0){

                for(let i = 0; i < specie.length; i++){
                    
                    empty = false;

                    let organism = specie[i];

                    organism.active = true;
                    this.world.addToCollection(`Active${specieName}`,organism);
                }
            }
        });

        if(empty){
            // All consumers extinct - TODO : Trigger event onecosystemOver to stop simulation and send all data to server
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