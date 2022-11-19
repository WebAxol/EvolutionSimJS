// TODO : Refactor code to make it more understandable and ETC

class OrganismBuilder {

    constructor(ecosystem){
        this.world = ecosystem.world;
        this.ecosystem = ecosystem;
    }

    generateOrganism(specieName,attributes = null){

        var position;
        var specieAttributes = this.ecosystem.getSpecie(specieName);
        var maxSpeed    =  attributes && attributes.maxSpeed    ? attributes.maxSpeed    :  specieAttributes.minSpeed + Math.random() * (specieAttributes.maxSpeed - specieAttributes.minSpeed);
        var sensitivity =  attributes && attributes.sensitivity ? attributes.sensitivity :  specieAttributes.minSense + Math.random() * (specieAttributes.maxSense - specieAttributes.minSense);

        if(specieAttributes.foodFee <= 0)   position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height)
        else if(Math.random() > 0.5)        position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height - 10 : 10);
        else                                position = new Vector2D(Math.random() > 0.5 ? canvas.width - 10 : 10, Math.random() * canvas.height);
        

        var organism = this.world.createAgent('Organism', 
        {
           'info' :{
              pos: position,
              maxSpeed    : maxSpeed,
              sensitivity : sensitivity,
              foodFee     : specieAttributes.foodFee,
              lifespan    : specieAttributes.lifespan
           }
        })

        // Has sensitive field ?

        if(specieAttributes.minSense > 0){

            let sensitivityRange = WORLD.createAgent('Circle', {
                'info' : {
                   pos: organism.pos,
                   background : specieAttributes.colorB,
                   radius: organism.sensitivity,
                   opacity : 0.1
                }
             });

             TreeObject.addChild(organism,'sensitivityRange',sensitivityRange);
        }

        // Has movement ?

        if(organism.maxSpeed > 0){
            this.world.addToCollection('Kinetics',organism);
        }

        // Organism aspect

        let aspect = WORLD.createAgent('Circle', {
            'info' : {
               pos: organism.pos,
               background : specieAttributes.colorA
            }
         });
     
        TreeObject.addChild(organism,'aspect',aspect);



        organism.specie = specieName;
        return organism;
    }

    cloneOrganism(organism){

        return this.generateOrganism(organism.specie,{
            maxSpeed : organism.maxSpeed,
            maxSense : organism.maxSense
        });
    }

    addOrganism(organism){

        if(!organism.specie){
            throw Error(`Cannot add organism to ecosystem, because it doesn't have a specie assigned`);
        }

        this.world.addToCollection(organism.specie,organism);
        this.world.addToCollection(`Active${organism.specie}`,organism);
    }
}