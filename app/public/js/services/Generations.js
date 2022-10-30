class Generations extends Service{

    constructor(){
        super();
        this.generation = 1;
    }

    // Translate organism creation code elsewhere

    reproduceAsexually(organism){

        var position;

        if(Math.random() > 0.5){
            position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height : 0);
        }
        else{
            position = new Vector2D(Math.random() * canvas.height, Math.random() > 0.5 ? canvas.width : 0);
        }

        var offspring = WORLD.createAgent('Organism', 
        {
           'info' : {
              pos: position,
              maxSpeed : organism.maxSpeed,
              sensitivity : organism.sensitivity
           }
        })
        
        let aspect = WORLD.createAgent('Circle', {
           'info' : {
              pos: offspring.pos,
              background : TreeObject.getChild(organism,'aspect').background
           }
        });
     
        let sensitivityRange = WORLD.createAgent('Circle', {
           'info' : {
              pos: offspring.pos,
              background : TreeObject.getChild(organism,'sensitivityRange').background,
              radius: organism.sensitivity
           }
        });
     
        TreeObject.addChild(offspring,'aspect',aspect);
        TreeObject.addChild(offspring,'sensitivityRange',sensitivityRange);
        this.world.addToCollection('Kinetics',offspring);
        ECOSYSTEM.addOrganism(offspring, organism.specie);

    }

    createOffspring(){
        var specieNames = Object.keys(ECOSYSTEM.species);
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];

                if(organism.foodCount >= organism.foodFee * 2){
                    this.reproduceAsexually(organism)
                }

                organism.foodCount = 0;
            }
        });
    }

    reactivateOrganisms(){

        // Coupling warning : ECOSYSTEM is a hard-coded constant; it could be a dynamic reference

        var specieNames = Object.keys(ECOSYSTEM.species),
            empty = true;
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName);

            if(specieName != 'PrimaryConsumers'){
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