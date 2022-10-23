class Generations extends Service{

    constructor(){
        super();
        this.generation = 1;
    }

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
        ECOSYSTEM.addOrganism(offspring, organism.specie);

    }

    createOffspring(){
        var specieNames = Object.keys(ECOSYSTEM.species);
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName),
                father;

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];

                if(organism.foodCount >= organism.foodFee * 2){
                    this.reproduceAsexually(organism)
                }
            }
        });
    }

    reactivateOrganisms(){
        var specieNames = Object.keys(ECOSYSTEM.species);
        
        specieNames.forEach(specieName => {

            var specie = this.world.getCollection(specieName),
                father;

            for(let i = 0; i < specie.length; i++){
                let organism = specie[i];
                this.world.addToCollection(`Active${specieName}`,organism);
            }
        });

        this.world.notifyEvent('newGenerationReady');

    }


    // EVENTS   

    ongenerationOver(details){
        console.log(`Generation ${this.generation} finished, starting generation ${this.generation + 1}`);
        this.generation++;

        this.createOffspring();

    }

}