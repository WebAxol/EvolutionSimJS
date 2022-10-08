
function buildAgent(details){

    var agent = {

        _children   : {},

        pos         : details.pos,
        vel         : {x : 0, y : 0 }, 
        wander      :  true,
        foodCount   : 0,

        energy      : 30000,
        maxSpeed    :  details.maxSpeed | 0,
        sensitivity : details.sensitivity | 0
    }

    var circle1 = {
        shape : 'Circle',
        pos : agent.pos,
        radius : 10,
        background : details.aspectColor
     }
  
     TreeObject.addChild(agent,'aspect' , circle1);
     WORLD.addToCollection('Renderables', circle1);

     if(agent.sensitivity > 0){

        var circle2 = {
            shape : 'Circle',
            pos : agent.pos,
            radius : agent.sensitivity,
            background : details.sensitivityFieldColor 
         }

         TreeObject.addChild(agent,'sensitivityField' , circle2);
         WORLD.addToCollection('Renderables', circle2);

     }


     return agent;

}