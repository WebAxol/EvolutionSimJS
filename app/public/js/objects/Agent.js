
function buildAgent(details){

    class _Agent extends TreeObject{

        constructor(details){
    
            super();
    
            this.pos       = details.pos;
            this.vel       = {x : 0, y : 0 }; 
            this.wander    =  true;
            this.foodCount = 0;
    
    
            // Evolutive attributes
    
            this.energy = 30000;
            this.maxSpeed =  details.maxSpeed | 0;
            this.sensitivity = details.sensitivity | 0; 
        }
    }

    var agent = new _Agent(details);

    var circle1 = {
        shape : 'Circle',
        pos : agent.pos,
        radius : 10,
        background : details.aspectColor
     }
  
     agent.addChild('aspect' , circle1);
     WORLD.addToCollection('Renderables', circle1);

     if(agent.sensitivity > 0){

        var circle2 = {
            shape : 'Circle',
            pos : agent.pos,
            radius : agent.sensitivity,
            background : details.sensitivityFieldColor 
         }

         agent.addChild('sensitivityField' , circle2);
         WORLD.addToCollection('Renderables', circle2);

     }


     return agent;

}