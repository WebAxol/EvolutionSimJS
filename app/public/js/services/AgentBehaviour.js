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

            if(!this.world.getCollection(consumer)){
                throw Error `Cannot create foodweb with consumer type '${consumer}' because it is not registered as a collection `
            } 

            if(this.foodWeb[consumer]){
        
                Object.keys(foodWeb[consumer]).forEach((prey) => {

                    if(!this.world.getCollection(prey)){
                        throw Error `Cannot create foodweb with prey type '${consumer}' because it is not registered as a collection `
                    }
                })
            }
        });

        console.log('All right', this.foodWeb);
    }

    execute(){

        Object.keys(this.foodWeb).forEach( (predatorSpecie) => {
            
            this.world.getCollection(predatorSpecie).forEach((predator) => {

                //this.SeekFood(predator);
            
                var preySpecies = Object.keys(this.foodWeb[predatorSpecie]);

                preySpecies.forEach((specie) => {

                    this.world.getCollection(specie).forEach((prey) => {

                        this.distanceFromPrey(predator,prey);
    
                    });
                });
            });
        });
    }

    distanceFromPrey(predator,prey){

        var predatorToPrey = Vector2D.sub(prey.pos,predator.pos);
        var squareDistance = Vector2D.magSq(predatorToPrey);
        var normalized = Vector2D.normalize(predatorToPrey);

        if(squareDistance <= predator.sensitivity * predator.sensitivity){

            if(Vector2D.magSq(Vector2D.add(predator.vel,normalized)) > (predator.maxSpeed  * predator.maxSpeed)){
                return;
            }

            predator.vel.x += normalized.x; 
            predator.vel.y += normalized.y; 

        }

        if(squareDistance <= prey.sensitivity * prey.sensitivity){

            if(Vector2D.magSq(Vector2D.sub(prey.vel,normalized)) > (prey.maxSpeed  * prey.maxSpeed)){
                return;
            }

            prey.vel.x += normalized.x; 
            prey.vel.y += normalized.y; 

        }


    }

    SeekFood(agent){

        var centre        = { x : canvas.width / 2, y : canvas.height / 2 };
        var agentToCentre = Vector2D.sub(centre,agent.pos);
        var normalized    = Vector2D.normalize(agentToCentre);


        if(Vector2D.magSq(Vector2D.add(agent.vel,normalized)) > agent.maxSpeed  * agent.maxSpeed){
            return;
        }

        agent.vel.x += normalized.x;
        agent.vel.y += normalized.y;

        //agent.vel.limit(agent.maxSpeed);

    }

    Hunt(agent, prey){

    }

}
