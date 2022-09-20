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
   'TertiaryConsumers' :  { 'SecondaryConsumers' : 1 }

}));
WORLD.registerService('Motion', new Motion());



for(let i = 0; i < 100; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * 3000, Math.random() * 1500)
   });

   WORLD.addToCollection('PrimaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

   WORLD.addToCollection('Renderables', {
         shape : 'Circle',
         pos : agent.pos,
         radius : 10,
         background : 'lawngreen'
   });

   WORLD.addToCollection('Renderables', {
      shape : 'Circle',
      pos : agent.pos,
      radius : Math.random() * 120 + 20,
      background : 'rgba(0,255,0,0.03)'
});
}


for(let i = 0; i < 20; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * 3000, Math.random() * 1500)
   });

   WORLD.addToCollection('TertiaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

   WORLD.addToCollection('Renderables', {
         shape : 'Circle',
         pos : agent.pos,
         radius : 10,
         background : 'skyblue'
   });

   WORLD.addToCollection('Renderables', {
      shape : 'Circle',
      pos : agent.pos,
      radius : Math.random() * 120 + 20,
      background : 'rgba(0,0,255,0.03)'
});
}


for(let i = 0; i < 50; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * 3000, Math.random() * 1500)
   });

   WORLD.addToCollection('SecondaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

   WORLD.addToCollection('Renderables', {
         shape : 'Circle',
         pos : agent.pos,
         radius : 10,
         background : 'orange'
   });

   WORLD.addToCollection('Renderables', {
      shape : 'Circle',
      pos : agent.pos,
      radius : Math.random() * 120 + 20,
      background : 'rgba(255,255,0,0.03)'
});
}


WORLD.execute();