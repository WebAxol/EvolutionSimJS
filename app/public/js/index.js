'use strict'

const WORLD = new World();

/* --- Init world --- */

// Register services

WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('AgentBehaviour', new AgentBehaviour());

//Register Collections

WORLD.registerCollection('Agents');

for(let i = 0; i < 100; i++){
   WORLD.addToCollection('Agents', new Agent({
      pos : { x : Math.random() * 3000, y : Math.random() * 1500}
   }));
}

// Establish routine

WORLD.routine = (world) => {

   WORLD.getCollection('Agents').forEach( agent => {

        WORLD.getService('Renderer').renderCircle({
            pos : agent.pos,
            radius : 10,
            background : 'red'
        });

        WORLD.getService('Renderer').renderCircle({
         pos : agent.pos,
         radius : 100,
         background : 'rgba(255,0,0,0.1)'
     });
   });

};


WORLD.execute();