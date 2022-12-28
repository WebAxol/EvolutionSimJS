class OrganismTargeter extends Service { // sets the prey and predator targets of each organism

    #chief;

    constructor(chiefModule){
        super();
        this.#chief = chiefModule; 
    }

    executeAsSubordinate(){
        this.resetTargets();
        this.setOrganismsTargets();
    }

    // conditions for predator to look for and chase preys

    isHungry(predator){

        if(predator.foodCount < predator.foodFee * 2) return true;
        if(predator.energy    < 1000)             return true;

        return false;
    }

    // determines which prey and predator are the closest ones to each other

    compareToGetClosestTargets(predator,prey){

        let predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        let squareDistance = Vector2D.magSq(predatorToPrey);

        if(squareDistance < predator.shortestDistanceToPrey){
            predator.shortestDistanceToPrey = squareDistance;
            predator.shortestVectorToPrey = predatorToPrey;
            predator.targetPrey = prey;
        }

        if(prey.getType() == 'Producer') return; // producers won't flee from predators: they are inert (alive but inactive)

        console.warn('Test failed', prey);

        if(squareDistance < prey.shortestDistanceToPredator){
            prey.shortestDistanceToPredator = squareDistance;
            prey.shortestVectorToPrey = predatorToPrey.scale(-1);
            prey.targetPredator = predator;
        }
    }

    resetTargets(){

        var species = this.#chief.ecosystem.getAllSpecies();

        Object.keys(species).forEach( (specie) => { // Note, we are working with species and organisms abstractly, without differentiating preys from predators, has some species are both preys and predators
            
            let activeOrganisms = this.#chief.world.getCollection(`Active${specie}`);

            for(let i = 0; i < activeOrganisms.length; i++){

                let organism = activeOrganisms[i];

                if(!organism.active || organism.getType() == 'Producer') continue;
                
                organism.targetPrey             = undefined;
                organism.shortestDistanceToPrey = Infinity;
                organism.shortestVectorToPrey   = undefined;

                organism.targetPredator             = undefined;
                organism.shortestDistanceToPredator = Infinity;
                organism.shortestVectorToPredator   = undefined;
            }    
        });
    }

    // iterates through all organisms to determine their target preys abd predators based on "compareToGetClosestTargets" logic

    setOrganismsTargets(){

        var foodWeb   = this.#chief.ecosystem.getFoodWeb();
        var predators = Object.keys(foodWeb);

        // foreach predator specie
        
        predators.forEach( (predatorSpecie) => {
            
            let activePredators = this.#chief.world.getCollection(`Active${predatorSpecie}`);
            // for each active predator

            for(let i = 0; i < activePredators.length; i++){

                let predator = activePredators[i];
        
                if(!predator.active) continue;

                if(this.isHungry(predator)){
                    
                    var preySpecies = Object.keys(foodWeb[predatorSpecie]);
                    
                    preySpecies.forEach((preySpecie) => {

                        let activePreys =  this.#chief.world.getCollection(`Active${preySpecie}`);

                        for(let j = 0; j < activePreys.length; j++){
                            let prey = activePreys[j];

                            if(!prey.active) continue;

                            this.compareToGetClosestTargets(predator,prey);
                        }
                    });
                }
            }    
        });
    }
}