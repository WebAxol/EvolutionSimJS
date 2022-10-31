'use strict'


for(let i = 0; i < 150; i++){

   let organism = ECOSYSTEM.generateOrganism('Producers');
   ECOSYSTEM.addOrganism(organism);
}

for(let i = 0; i < 30; i++){
   let organism = ECOSYSTEM.generateOrganism('SpecieA');
   ECOSYSTEM.addOrganism(organism);
}

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