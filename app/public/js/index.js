'use strict'

const WORLD = new World();

/* --- Init world --- */

// Register services

WORLD.registerService('Renderer', new Renderer(c));

//Register Collections

WORLD.registerCollection('circles');

// Establish routine

WORLD.routine = (world) => {

   WORLD.collections['circles'].forEach(circle => {
        WORLD.services['Renderer'].renderCircle(circle);
   });

};


WORLD.execute();