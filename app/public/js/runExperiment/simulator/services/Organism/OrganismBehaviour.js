
// TODO : optimize collision detection

class OrganismBehaviour extends Service{ // once set the targets of each organism, each organism will try to hunt or escape from them

    #chief;

    constructor(chiefModule){
        super();
        this.#chief = chiefModule;
    }

    executeAsSubordinate(){
        
        var notLeft = true;

        if(this.isGenOver) return;
        
        var species = this.#chief.ecosystem.getAllSpecies();

        Object.keys(species).forEach( (specie) => { // Note, we are working with species and organisms abstractly, without differentiating preys from predators, has some species are both preys and predators
            
            let activeOrganisms = this.#chief.world.getCollection(`Active${specie}`);

            for(let i = 0; i < activeOrganisms.length; i++){

                let organism = activeOrganisms[i];

                if(!organism.active || organism.getType() == 'Producer') continue;

                notLeft = false;
                
                let isPredatorDetected = this.isTargetPredatorDetected(organism);
                if(isPredatorDetected)   this.fleeFromTargetPredator(organism);

                else{
                    let isPreyDetected = this.isTargetPreyDetected(organism);
                    let hasBeenCaught  = this.hasPreyBeingCaught(organism);

                    if(isPreyDetected){
                        this.chaseTargetPrey(organism);
                        if(hasBeenCaught) this.#chief.world.notifyEvent('organismHunted',{ hunter : organism });
                    }
                    else if(organism.vel.x == 0 && organism.vel.y == 0){
                        this.MoveRandomly(organism);
                    }
                }

                this.spendEnergy(organism);
            }    
        });

        // No more organisms participating
        
        if(notLeft) this.#chief.isGenerationOver = true;
    }

    // Note: "shortestDistanceTo(Prey|Predator)" is actually the squared value of the real distance 

    isTargetPredatorDetected(prey){
        if(!prey.targetPredator) return false;
        return (prey.shortestDistanceToPredator <= prey.sensitivity * prey.sensitivity);
    }

    isTargetPreyDetected(predator){

        if(!predator.targetPrey || !predator.targetPrey.active) return false;
        return (predator.shortestDistanceToPrey <= predator.sensitivity * predator.sensitivity);
    }

    fleeFromTargetPredator(prey){

        try{

        if(prey.organismType == 'producer') return; // wont flee
              
        console.log(prey);

        var normalized = prey.shortestVectorToPredator.normalize();

        prey.wander = false;   
        prey.vel.x = normalized.x * prey.maxSpeed; 
        prey.vel.y = normalized.y * prey.maxSpeed; 

        if(Vector2D.magSq(prey.vel) > (prey.maxSpeed  * prey.maxSpeed)){
            prey.vel.x *= 0.8; 
            prey.vel.y *= 0.8; 
        }

        }catch(err){
            console.log(normalized,prey.shortestDistanceToPredator);
            this.#chief.world.pauseExecution();
        }
    }

    chaseTargetPrey(predator){


        if(predator.getType() != 'Consumer') throw Error('non-consuming organism was passed as predator');

        if(!predator.targetPrey) return; // no prey was found
                
        var normalized = predator.shortestVectorToPrey.normalize();

        predator.wander = false;   
        predator.vel.x = normalized.x * predator.maxSpeed;
        predator.vel.y = normalized.y * predator.maxSpeed;    
    }

    hasPreyBeingCaught(predator){
        return (typeof predator.shortestDistanceToPrey === 'number' && predator.shortestDistanceToPrey <= 20 * 20)
    }

    MoveRandomly(agent){
        try{
        
            var randomDirection = Vector2D.normalize({ 
            x : Math.random() * 1 * Math.random() > 0.5 ? 1 : -1,
            y : Math.random() * 1 * Math.random() > 0.5 ? 1 : -1
        });

        agent.vel.x = randomDirection.x * agent.maxSpeed;
        agent.vel.y = randomDirection.y * agent.maxSpeed;
        
        }catch(err){
            console.error(agent.getType());
            WORLD.pauseExecution();
        }
    }

    spendEnergy(organism){
        organism.energy -= (organism.vel.x * organism.vel.x) + (organism.vel.y * organism.vel.y) + (organism.sensitivity * 1.5) * 2;
        if(organism.energy <= 0) this.#chief.world.notifyEvent('organismOutOfEnergy', { organism : organism });

    }
}
