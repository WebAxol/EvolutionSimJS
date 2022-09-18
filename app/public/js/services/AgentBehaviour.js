class AgentBehaviour extends Service{

    constructor(){
        super();
    }

    execute(){

        var agents = this.world.getCollection('Agents');

        agents.forEach((agent) => {
            
            switch(agent.state){
                case 'SeekFood' : this.SeekFood(agent);
                break; 
            }

        });

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
