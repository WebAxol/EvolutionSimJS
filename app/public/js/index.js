'use strict'

const WORLD = new World();

/* --- Init world --- */


//Register Collections

WORLD.registerCollection('StaticFood');
WORLD.registerCollection('PrimaryConsumers');
WORLD.registerCollection('SecondaryConsumers');
WORLD.registerCollection('TertiaryConsumers');


WORLD.registerCollection('Renderables');
WORLD.registerCollection('Kinetics');



// Register services

WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('AgentBehaviour', new AgentBehaviour({

   'PrimaryConsumers' : { 'StaticFood' : 1 },
   'SecondaryConsumers' : { 'PrimaryConsumers' : 1 },
   'TertiaryConsumers' :  { 'SecondaryConsumers' : 1 , 'PrimaryConsumers' : 1 }

}));
WORLD.registerService('Motion', new Motion());

for(let i = 0; i < 100; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      sensitivity : 130
   });

   var circle1 = {
      shape : 'Circle',
      pos : agent.pos,
      radius : 10,
      background : 'lawngreen'
   }


   var circle2 = {
      shape : 'Circle',
      pos : agent.pos,
      radius : agent.sensitivity,
      background : 'rgba(0,255,0,0.03)'
   }

   agent.addChild(circle1);
   agent.addChild(circle2);


   WORLD.addToCollection('PrimaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

   WORLD.addToCollection('Renderables', circle1);
   WORLD.addToCollection('Renderables', circle2);
}


for(let i = 0; i < 100; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      sensitivity : 100
   });

   var circle1 = {
      shape : 'Circle',
      pos : agent.pos,
      radius : 10,
      background : 'skyblue'
   }

   var circle2 = {
      shape : 'Circle',
      pos : agent.pos,
      radius : agent.sensitivity,
      background : 'rgba(0,0,255,0.03)'
   }

   agent.addChild(circle1);
   agent.addChild(circle2);


   WORLD.addToCollection('TertiaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);
   
   WORLD.addToCollection('Renderables', circle1);
   WORLD.addToCollection('Renderables', circle2);
}





WORLD.execute();