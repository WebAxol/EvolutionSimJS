'use strict'


for(let i = 0; i < 10; i++){

   var position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
 
   var organism = WORLD.createAgent('Organism', 
   {
      'info' :{
         pos: position,
         sensitivity : 0
      }
   })
   
   let aspect = WORLD.createAgent('Circle', {
      'info' : {
         pos: organism.pos,
         background : 'lawngreen'
      }
   });

   TreeObject.addChild(organism,'aspect',aspect);
   ECOSYSTEM.addOrganism(organism,'PrimaryConsumers');
}
 
for(let i = 0; i < 1; i++){

   var position;

   if(Math.random() > 0.5){
      position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height : 0);
   }
   else{
      position = new Vector2D(Math.random() > 0.5 ? canvas.width : 0, Math.random() * canvas.height, );
  }


   var organism = WORLD.createAgent('Organism', 
   {
      'info' :{
         pos: position,
         maxSpeed : 2 + 5 * Math.random(),
         sensitivity : 50 + 100 * Math.random ()
      }
   })
   
   let aspect = WORLD.createAgent('Circle', {
      'info' : {
         pos: organism.pos,
         background : 'skyblue'
      }
   });

   let sensitivityRange = WORLD.createAgent('Circle', {
      'info' : {
         pos: organism.pos,
         background : 'rgba(0,0,255,0.1)',
         radius: organism.sensitivity
      }
   });

   TreeObject.addChild(organism,'aspect',aspect);
   TreeObject.addChild(organism,'sensitivityRange',sensitivityRange);
   WORLD.addToCollection('Kinetics',organism);
   ECOSYSTEM.addOrganism(organism,'SecondaryConsumers');
}



for(let i = 0; i < 0; i++){

   var position;

   if(Math.random() > 0.5){
      position = new Vector2D(Math.random() * canvas.width, Math.random() > 0.5 ? canvas.height : 0);
   }
   else{
      position = new Vector2D(Math.random() > 0.5 ? canvas.width : 0, Math.random() * canvas.height, );
  }


   var organism = WORLD.createAgent('Organism', 
   {
      'info' :{
         pos: position,
         maxSpeed : 2 + 5 * Math.random(),
         sensitivity : 50 + 100 * Math.random ()
      }
   })
   
   let aspect = WORLD.createAgent('Circle', {
      'info' : {
         pos: organism.pos,
         background : 'red'
      }
   });

   let sensitivityRange = WORLD.createAgent('Circle', {
      'info' : {
         pos: organism.pos,
         background : 'rgba(255,0,0,0.1)',
         radius: organism.sensitivity
      }
   });

   TreeObject.addChild(organism,'aspect',aspect);
   TreeObject.addChild(organism,'sensitivityRange',sensitivityRange);
   WORLD.addToCollection('Kinetics',organism);
   ECOSYSTEM.addOrganism(organism,'TertiaryConsumers');
}


WORLD.execute();