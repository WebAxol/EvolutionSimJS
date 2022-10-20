
// TODO : optimize collision detection
// TODO : refactor code

class AgentBehaviour extends Service{

    constructor(){
        super();
    }

    execute(){

        var notLeft = true, 
            foodWeb = ECOSYSTEM.foodWeb;

        Object.keys(foodWeb).forEach( (predatorSpecie) => {
            
            let activePredators = this.world.getCollection(`Active${predatorSpecie}`);

            for(let i = 0; i < activePredators.length; i++){

                notLeft = false;

                let predator = activePredators[i];
                    predator.energy -= Vector2D.magSq(predator.vel) + predator.sensitivity;
                    predator.wander = true;
                
                if(predator.foodCount < 5){
                    
                    var preySpecies = Object.keys(foodWeb[predatorSpecie]);
                    
                    preySpecies.forEach((preySpecie) => {

                        let activePreys =  this.world.getCollection(`Active${preySpecie}`);

                        for(let j = 0; j < activePreys.length; j++){
                            let prey = activePreys[j];
                            let caught = this.chaseAndFlee(predator,prey);

                            if(caught){
                                this.Hunt(predator);
                                this.Eliminate(preySpecie,prey);
                                j--;
                            }
                        }
                        
                    });
                }
            
                if(predator.foodCount < 2 && predator.wander){
                    this.SeekFood(predator);
                }
                
                else{
                    this.Retreat(predatorSpecie,predator);
                }

                if(predator.energy <= 0){
                    this.Eliminate(predatorSpecie,predator);
                    i--;
                }
            }    
        });

        // No more organisms participating

        if(notLeft){
            //Next Generation
        }
    }

    chaseAndFlee(predator,prey){

        let predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        let squareDistance = Vector2D.magSq(predatorToPrey)
        let normalized = Vector2D.normalize(predatorToPrey);

        if(predator.maxSpeed > 0 && squareDistance <= predator.sensitivity * predator.sensitivity){
            
            predator.wander = false;   
            predator.vel.x += normalized.x; 
            predator.vel.y += normalized.y; 

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
                prey.vel.x *= 0.9; 
                prey.vel.y *= 0.9; 
            }
        }

        // Has prey been caught?

        if(squareDistance < 20 * 20){
            return true;
        }

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

    Retreat(specie,object){

        var outOfCanvas = false;

        if(object.pos.y < 0){
            outOfCanvas = true;
            object.pos.y = canvas.height;
        }

        else if(object.pos.y > canvas.height){
            outOfCanvas = true;//console.log(agent);
            object.pos.y = 0;
        }

        if(object.pos.x < 0){
            outOfCanvas = true;
            object.pos.x = canvas.width;
        }

        else if(object.pos.x > canvas.width){
            outOfCanvas = true;
            object.pos.x= 0;
        }

        if(outOfCanvas && object.foodCount >= 2){
            this.Save(specie,object);
        }
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
}
