class Ecosystem {
    
    constructor(world,species,foodweb){
        
        this.world   = world;
        this.history = [];
        this.species = this.setUpSpecies(species);
        this.foodWeb = this.setUpFoodWeb(foodweb);
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
            collections : ['Kinetics']
            if(!this.world.getCollection(consumer) && !this.world.getCollection(`Active${prey}`)){
                throw Error `Cannot create foodweb with consumer type '${consumer}' because collections for it are not registered `
            } 

            if(this.species[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey) && !this.world.getCollection(`Active${prey}`)){
                        throw Error `Cannot create foodweb with prey type '${consumer}' because it collections for it are not registered `
                    }
                })
            }
        });

        return foodWeb;
    }

    // From Scratch

    generateOrganism(specieName,attributes = null){

        var position;
        var specieAttributes = this.species[specieName];
        var maxSpeed    =  attributes && attributes.maxSpeed    ? attributes.maxSpeed    :  specieAttributes.minSpeed + Math.random() * (specieAttributes.maxSpeed - specieAttributes.minSpeed);
        var sensitivity =  attributes && attributes.sensitivity ? attributes.sensitivity :  specieAttributes.minSense + Math.random() * (specieAttributes.maxSense - specieAttributes.minSense);


        if(specieName == 'Producers')   position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height)
        else if(Math.random() > 0.5)    position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height - 10 : 10);
        else                            position = new Vector2D(Math.random() > 0.5 ? canvas.width - 10 : 10, Math.random() * canvas.height);
        

        var organism = this.world.createAgent('Organism', 
        {
           'info' :{
              pos: position,
              maxSpeed    : maxSpeed,
              sensitivity : sensitivity,
              foodFee : specieAttributes.foodFee
           }
        })

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

        if(organism.maxSpeed > 0){
            this.world.addToCollection('Kinetics',organism);
        }

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

        this.world.addToCollection(organism.specie,organism);
        this.world.addToCollection(`Active${organism.specie}`,organism);
    }
}