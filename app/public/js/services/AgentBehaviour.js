
// TODO : optimize collision detection
// TODO : refactor code

class AgentBehaviour extends Service{

    constructor(foodWeb){
        super();
        this.foodWeb = foodWeb;
    }

    init(){
        this.checkFoodWeb(this.foodWeb);
    }

    // Check that all elechons in web are registered collections inside this.world

    checkFoodWeb(foodWeb){

        Object.keys(foodWeb).forEach( (consumer) => {

            if(!this.world.getCollection(consumer) && !this.world.getCollection(`Active${prey}`)){
                throw Error `Cannot create foodweb with consumer type '${consumer}' because collections for it are not registered `
            } 

            if(this.foodWeb[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey) && !this.world.getCollection(`Active${prey}`)){
                        throw Error `Cannot create foodweb with prey type '${consumer}' because it collections for it are not registered `
                    }
                })
            }
        });

        console.log('All right', this.foodWeb);
    }

    execute(){

        Object.keys(this.foodWeb).forEach( (predatorSpecie) => {
            
            
            this.world.getCollection(`Active${predatorSpecie}`).forEach((predator) => {

                predator.wander = true;
                
                if(predator.foodCount < 5){
                    
                    var preySpecies = Object.keys(this.foodWeb[predatorSpecie]);
                    
                    preySpecies.forEach((specie) => {
                        this.world.getCollection(`Active${specie}`).forEach((prey) => {

                            this.distanceFromPrey(predator,prey, specie);
                        });
                        
                    });
                }
                
                predator.energy -= Vector2D.magSq(predator.vel) + predator.sensitivity;
                /*
                if(predator.foodCount < 2 && predator.wander){
                    //this.SeekFood(predator);
                }
                
                else{
                    this.Retreat(predatorSpecie,predator);
                }


                if(predator.energy <= 0){
                    this.Eliminate(predatorSpecie,predator);
                }
                */
            
            });
            
        });
    }

    distanceFromPrey(predator,prey, preySpecie){

        let predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        let squareDistance = Vector2D.magSq(predatorToPrey);
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
            }b  
        }

        if(squareDistance <= 20 * 20){
            this.Hunt(predator,prey, preySpecie);
        }
    }


    Eliminate(specie,organism){

        WORLD.removeFromCollection(specie,organism);
        WORLD.removeFromCollection('Renderables',organism.getChild('aspect'));

        if(organism.sensitivity > 0){
            WORLD.removeFromCollection('Renderables',organism.getChild('sensitivityField'));
        }
    }

    Retreat(specie,object){

        var outOfCanvas = false;

        if(object.pos.y < 0){
            outOfCanvas = true;
            object.pos.y = canvas.height;
        }

        else if(object.pos.y > canvas.height){
            outOfCanvas = true;
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

        //WORLD.removeFromCollection(`Active${specie}`, organism);

        organism.vel.x = 0;
        organism.vel.y = 0;
    }

    Hunt(predator, prey, preySpecie){

        this.world.addToCollection('toBeRemoved', prey);

        predator.foodCount++;
        predator.energy += 30000;
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
