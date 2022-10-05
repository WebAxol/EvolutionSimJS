'use strict'

const WORLD = new World();

/* --- Init world --- */


//Register Collections

WORLD.registerCollection('toBeRemoved');

WORLD.registerCollection('StaticFood');
WORLD.registerCollection('ActiveStaticFood');


//Primary Consumer
WORLD.registerCollection('PrimaryConsumers');
WORLD.registerCollection('ActivePrimaryConsumers');

//Secondary Consumer
WORLD.registerCollection('SecondaryConsumers');
WORLD.registerCollection('ActiveSecondaryConsumers');

//Tertiary Consumer
WORLD.registerCollection('TertiaryConsumers');
WORLD.registerCollection('ActiveTertiaryConsumers');


WORLD.registerCollection('Renderables');
WORLD.registerCollection('Kinetics');



// Register services

WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('AgentBehaviour', new AgentBehaviour({

   'SecondaryConsumers' : { 'PrimaryConsumers' : 1 },
   'TertiaryConsumers' :  { 'SecondaryConsumers' : 1}

}));
WORLD.registerService('Motion', new Motion());


for(let i = 0; i < 500; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(500, 500),
      sensitivity : 0,
      aspectColor : 'lawngreen',
      sensitivityFieldColor : 'rgba(0,255,0,0.03)'
   });


   WORLD.addToCollection('PrimaryConsumers', agent);
   WORLD.addToCollection('ActivePrimaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

   

}


for(let i = 0; i < 1; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(200, 500),
      sensitivity : 100,
      maxSpeed    : 5,
      aspectColor : 'skyblue',
      sensitivityFieldColor : 'rgba(0,0,255,0.03)'
   });


   WORLD.addToCollection('SecondaryConsumers', agent);
   WORLD.addToCollection('ActiveSecondaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

}



for(let i = 0; i < 0; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(200, 500),
      sensitivity : 100,
      maxSpeed    : 5,
      aspectColor : 'red',
      sensitivityFieldColor : 'rgba(255,0,0,0.03)'
   });


   WORLD.addToCollection('TertiaryConsumers', agent);
   WORLD.addToCollection('ActiveTertiaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

}





WORLD.execute();