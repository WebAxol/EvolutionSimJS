'use strict'


for(let i = 0; i < 100; i++){

   let organism = ECOSYSTEM.generateOrganism('ProducerA');
   ECOSYSTEM.addOrganism(organism);
}

for(let i = 0; i < 100; i++){

   let organism = ECOSYSTEM.generateOrganism('ProducerB');
   ECOSYSTEM.addOrganism(organism);
}

for(let i = 0; i < 10; i++){
   let organism = ECOSYSTEM.generateOrganism('PrimaryConsumerA');
   ECOSYSTEM.addOrganism(organism);
}


for(let i = 0; i < 10; i++){
   let organism = ECOSYSTEM.generateOrganism('PrimaryConsumerB');
   ECOSYSTEM.addOrganism(organism);
}

for(let i = 0; i < 10; i++){
   let organism = ECOSYSTEM.generateOrganism('PrimaryConsumerC');
   ECOSYSTEM.addOrganism(organism);
}


//WORLD.execute();
/*

window.addEventListener('dblclick', () => {
   if(WORLD.pause){
      WORLD.pause = false;
      WORLD.execute();
   }
   else{
      WORLD.pauseExecution();
   }
})
*/