'use strict'

var ECOSYSTEM;

function prepareAndRunSimulation(experimentSetUp){

   console.log(experimentSetUp);

   ECOSYSTEM = new Ecosystem(WORLD, experimentSetUp);

   InitServices();
   InitEvents();

   WORLD.execute();


   window.addEventListener('dblclick', () => {
      if(WORLD.pause){
         WORLD.pause = false;
         WORLD.execute();
      }
      else{
         WORLD.pauseExecution();
      }
   })
}
