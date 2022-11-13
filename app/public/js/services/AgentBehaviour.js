
// TODO : optimize collision detection
// TODO : Improve Organism moving algorithms
// TODO : refactor code

class AgentBehaviour extends Service{

    constructor(ecosystem){
        super();
        this.isGenOver = false;
        this.ecosystem = ecosystem;
    }

    execute(){
        
        if(this.isGenOver) return;
        
        var notLeft = true, 
            foodWeb = this.ecosystem.getFoodWeb();
        
        Object.keys(foodWeb).forEach( (predatorSpecie) => {
            
            let activePredators = this.world.getCollection(`Active${predatorSpecie}`);

            for(let i = 0; i < activePredators.length; i++){

                let predator = activePredators[i];
                    predator.energy -= Vector2D.magSq(predator.vel) + (predator.sensitivity / 2);
                    predator.wander = true;


                notLeft = false;

                if(!predator.active) continue;

                if(predator.vel.x == 0 && predator.vel.y == 0){
                    this.SeekFood(predator);
                }


                if(predator.foodCount < predator.foodFee * 2 || predator.energy < 10000){
                    
                    var preySpecies = Object.keys(foodWeb[predatorSpecie]);
                    
                    preySpecies.forEach((preySpecie) => {

                        let activePreys =  this.world.getCollection(`Active${preySpecie}`);

                        for(let j = 0; j < activePreys.length; j++){
                            let prey = activePreys[j];

                            if(!prey.active) continue;

                            let caught = this.chaseAndFlee(predator,prey);

                            if(caught){
                                this.Hunt(predator);
                                this.Eliminate(preySpecie,prey);
                            }
                        }
                    });
                }
                
                if(predator.energy <= 0){
                    this.Eliminate(predatorSpecie,predator);
                }
            }    
        });

        // No more organisms participating

        if(notLeft){
            this.isGenOver = true;
            this.world.notifyEvent('generationOver');
        }
    }

    chaseAndFlee(predator,prey){

        let predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        let squareDistance = Vector2D.magSq(predatorToPrey)
        let normalized = Vector2D.normalize(predatorToPrey);

        if(predator.maxSpeed > 0 && squareDistance <= predator.sensitivity * predator.sensitivity){
            
            predator.wander = false;   
            predator.vel.x = normalized.x * predator.maxSpeed;
            predator.vel.y = normalized.y * predator.maxSpeed; 

            if(Vector2D.magSq(predator.vel) > (predator.maxSpeed  * predator.maxSpeed)){     
                predator.vel.x * 0.8; 
                predator.vel.y *= 0.8; 
            }
        }

        if(prey.maxSpeed > 0 && squareDistance <= prey.sensitivity * prey.sensitivity){

            prey.wander = false;   
            prey.vel.x = normalized.x * prey.maxSpeed; 
            prey.vel.y = normalized.y * prey.maxSpeed; 

            if(Vector2D.magSq(prey.vel) > (prey.maxSpeed  * prey.maxSpeed)){
                prey.vel.x *= 0.8; 
                prey.vel.y *= 0.8; 
            }
        }

        // Has prey been caught?

        if(squareDistance < 30 * 30) return true;

        return false;
    }


    Hunt(predator){
        predator.foodCount++;
        predator.energy += 20000;
    }


    Eliminate(specie,organism){
        organism.active = false;
        WORLD.removeAgent(organism);
    }

    Save(specie,organism){

        WORLD.removeFromCollection(`Active${specie}`, organism);

        organism.active = false;
        organism.vel.x = 0;
        organism.vel.y = 0;
    }

    SeekFood(agent){

        var randomDirection = Vector2D.normalize({ 
            x : Math.random() * 1 * Math.random() > 0.5 ? 1 : -1,
            y : Math.random() * 1 * Math.random() > 0.5 ? 1 : -1
        });

        agent.vel.x = randomDirection.x * agent.maxSpeed;
        agent.vel.y = randomDirection.y * agent.maxSpeed;
    }

    // Events

    onagentOutOfCanvas(details){
        var agent = details.agent;
        if(agent.foodCount >= agent.foodFee){
            this.Save(agent.specie,agent);
        }
    }

    onnewGenerationReady(){
        this.isGenOver = false;
    }

    // Testing Events

    onTest(){

        console.log(WORLD.frame);

        var producers = this.world.getCollection(`ActiveProducers`);
        for(let i = 0; i < 200; i++){
            this.Eliminate('Producers',producers[i]);
        }

        console.log(WORLD.frame);

    }
}
