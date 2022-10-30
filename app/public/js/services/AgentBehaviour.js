
// TODO : optimize collision detection
// TODO : Improve Organism moving algorithms
// TODO : refactor code

class AgentBehaviour extends Service{

    constructor(){
        super();
        this.isGenOver = false;
    }

    execute(){
        
        if(this.isGenOver) return;
        
        var notLeft = true, 
            foodWeb = ECOSYSTEM.foodWeb;
        
        Object.keys(foodWeb).forEach( (predatorSpecie) => {
            
            let activePredators = this.world.getCollection(`Active${predatorSpecie}`);

            for(let i = 0; i < activePredators.length; i++){

                notLeft = false;

                let predator = activePredators[i];
                    predator.energy -= Vector2D.magSq(predator.vel) + predator.sensitivity;
                    predator.wander = true;

                if(predator.foodCount < predator.foodFee * 2 || predator.energy < 10000){
                    
                    var preySpecies = Object.keys(foodWeb[predatorSpecie]);
                    
                    preySpecies.forEach((preySpecie) => {

                        let activePreys =  this.world.getCollection(`Active${preySpecie}`);

                        for(let j = 0; j < activePreys.length; j++){
                            let prey = activePreys[j];
                            let caught = this.chaseAndFlee(predator,prey);

                            if(caught){
                                this.Hunt(predator);
                                this.Eliminate(preySpecie,prey);
                            }
                        }
                    });
                }
            
                if(predator.foodCount < predator.foodFee * 2 && predator.wander){
                    this.SeekFood(predator);
                }
                
                if(predator.energy <= 0){
                    this.Eliminate(predatorSpecie,predator);
                }
            }    
        });

        // No more organisms participating

        if(notLeft){
            this.isGenOver = true;
            console.log('Generation Over');
            this.world.notifyEvent('generationOver');
        }
    }

    chaseAndFlee(predator,prey){

        let predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        let squareDistance = Vector2D.magSq(predatorToPrey)
        let normalized = Vector2D.normalize(predatorToPrey);

        if(predator.maxSpeed > 0 && squareDistance <= predator.sensitivity * predator.sensitivity){
            
            predator.wander = false;   
            predator.vel.x += normalized.x;
            predator.vel.y +=  normalized.y; 

            if(Vector2D.magSq(predator.vel) > (predator.maxSpeed  * predator.maxSpeed)){     
                predator.vel.x *= 0.9; 
                predator.vel.y *= 0.9; 
            }
        }

        if(prey.maxSpeed > 0 && squareDistance <= prey.sensitivity * prey.sensitivity){

            prey.wander = false;   
            prey.vel.x += normalized.x; 
            prey.vel.y += normalized.y; 

            if(Vector2D.magSq(prey.vel) > (prey.maxSpeed  * prey.maxSpeed)){
                prey.vel.x *= 0.8; 
                prey.vel.y *= 0.8; 
            }
        }

        // Has prey been caught?

        if(squareDistance < 20 * 20) return true;

        return false;
    }


    Hunt(predator){
        predator.foodCount++;
        predator.energy += 30000;
    }


    Eliminate(specie,organism){
        WORLD.removeAgent(organism);
        WORLD.removeFromCollection(specie,organism);
        WORLD.removeFromCollection(`Active${specie}`,organism);
    }

    Save(specie,organism){

        WORLD.removeFromCollection(`Active${specie}`, organism);

        organism.vel.x = 0;
        organism.vel.y = 0;
    }

    SeekFood(agent){

        var centre        = { x : canvas.width / 2, y : canvas.height / 2 };
        var agentToCentre = { x : Math.random() * 1, y : Math.random() * 1};

        if(Vector2D.magSq(Vector2D.add(agent.vel,agentToCentre)) > agent.maxSpeed  * agent.maxSpeed){
            return;
        }

        agent.vel.x += agentToCentre.x;
        agent.vel.y += agentToCentre.y;
    }

    // Events

    onagentOutOfCanvas(details){
        var agent = details.agent;
        if(agent.foodCount >= 2){
            this.Save(agent.specie,agent);
        }
    }

    onnewGenerationReady(){
        this.isGenOver = false;
    }

}
