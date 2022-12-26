// TODO : Refactor code to make it more understandable and ETC

class OrganismBuilder {

    constructor(ecosystem){
        this.world = ecosystem.world;
        this.ecosystem = ecosystem;
    }

    generateConsumer(specieName,attributes = null){

        var position;  
        var specieAttributes = this.ecosystem.getSpecie(specieName);
        var maxSpeed    =  attributes && attributes.maxSpeed    ? attributes.maxSpeed    :  specieAttributes.minSpeed + Math.random() * (specieAttributes.maxSpeed - specieAttributes.minSpeed);
        var sensitivity =  attributes && attributes.sensitivity ? attributes.sensitivity :  specieAttributes.minSense + Math.random() * (specieAttributes.maxSense - specieAttributes.minSense);
      
        if(Math.random() > 0.5)  position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height - 10 : 10);
        else                     position = new Vector2D(Math.random() > 0.5 ? canvas.width - 10 : 10, Math.random() * canvas.height);

        var organism = this.world.createAgent('Consumer', {
           'info' :{
              pos: position,
              maxSpeed    : maxSpeed,
              sensitivity : sensitivity,
              foodFee     : specieAttributes.foodFee,
              lifespan    : specieAttributes.lifespan
           }
        });

        if(sensitivity > 0){

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

        if(organism.maxSpeed > 0) this.world.addToCollection('Kinetics',organism);

        // aspect

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


    generateProducer(specieName){

        var position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);  
        var specieAttributes = this.ecosystem.getSpecie(specieName);

        var organism = this.world.createAgent('Producer', {
           'info' :{
              pos       : position,
              lifespan  : specieAttributes.lifespan
           }
        });

         // aspect

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


    generateOrganism(specieName,attributes = null){

        var specieAttributes = this.ecosystem.getSpecie(specieName);

        if(specieAttributes.organismType == 'consumer') return this.generateConsumer(specieName, attributes);
        if(specieAttributes.organismType == 'producer') return this.generateProducer(specieName);

        throw Error(`An invalid organism type was specified for specie '${specieName}'; it is not either producer or consumer`);
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