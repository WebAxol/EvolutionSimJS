'use strict'


for(let i = 0; i < 50; i++){

   let organism = ECOSYSTEM.generateOrganism('Producers');
   ECOSYSTEM.addOrganism(organism);
}

for(let i = 0; i < 5; i++){
   let organism = ECOSYSTEM.generateOrganism('SpecieA');
   ECOSYSTEM.addOrganism(organism);
}


for(let i = 0; i < 0; i++){
   let organism = ECOSYSTEM.generateOrganism('SpecieB');
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