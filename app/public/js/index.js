'use strict'

const WORLD = new World();

/* --- Init world --- */

// Register services

WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('AgentBehaviour', new AgentBehaviour());
WORLD.registerService('Motion', new Motion());


//Register Collections

WORLD.registerCollection('Agents');
WORLD.registerCollection('Renderables');
WORLD.registerCollection('Kinetics');



for(let i = 0; i < 50; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * 3000, Math.random() * 1500)
   });

   WORLD.addToCollection('Agents', agent);
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

   WORLD.addToCollection('Agents', agent);
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


for(let i = 0; i < 20; i++){

   var agent = new Agent({
      pos : new Vector2D(Math.random() * 3000, Math.random() * 1500)
   });

   WORLD.addToCollection('Agents', agent);
   WORLD.addToCollection('Kinetics', agent);

   WORLD.addToCollection('Renderables', {
         shape : 'Circle',
         pos : agent.pos,
         radius : 10,
         background : 'red'
   });

   WORLD.addToCollection('Renderables', {
      shape : 'Circle',
      pos : agent.pos,
      radius : Math.random() * 120 + 20,
      background : 'rgba(255,0,0,0.03)'
});
}

// Establish routine

WORLD.execute();