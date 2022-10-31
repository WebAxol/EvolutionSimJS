class Generations extends Service{

    constructor(){
        super();
        this.generation = 1;
    }

    createOffspring(){

        var specieNames = Object.keys(ECOSYSTEM.species);
        var offspring = [];
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];

                if(organism.foodCount >= organism.foodFee * 2){

                    offspring.push(ECOSYSTEM.cloneOrganism(organism));
                }

                organism.foodCount = 0;
            }
        });

        offspring.forEach(organism => {
            ECOSYSTEM.addOrganism(organism);
        });
    }

    reactivateOrganisms(){

        // Coupling warning : ECOSYSTEM is a hard-coded constant; it could be a dynamic reference

        var specieNames = Object.keys(ECOSYSTEM.species),
            empty = true;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            if(specieName != 'Producers'){
                for(let i = 0; i < specie.length; i++){
                    empty = false;
                    let organism = specie[i];
                    this.world.addToCollection(`Active${specieName}`,organism);
                }
            }
        });
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