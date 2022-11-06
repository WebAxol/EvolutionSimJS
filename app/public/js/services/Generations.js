class Generations extends Service{

    constructor(ecosystem){
        super();
        this.generation = 1;
        this.ecosystem = ecosystem;
    }

    createOffspring(){

        var specieNames = Object.keys(this.ecosystem.species);
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

        var specieNames = Object.keys(this.ecosystem.species),
            empty = true;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            if(this.ecosystem.species[specieName].foodFee > 0){

                for(let i = 0; i < specie.length; i++){
                    
                    empty = false;

                    let organism = specie[i];

                    organism.active = true;
                    this.world.addToCollection(`Active${specieName}`,organism);
                }
            }
        });

        if(empty){
            // All consumers extinct
        }

    }


    // EVENTS   

    onsummaryCreated(details){
        console.log(`Generation ${this.generation} finished, starting generation ${this.generation + 1}`);
        this.generation++;
        this.reactivateOrganisms();
        this.createOffspring();
        this.world.notifyEvent('newGenerationReady');
    }

}