'use strict'


for(let i = 0; i < 100; i++){

   var position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
   
   //console.log(position);

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
   WORLD.addToCollection('PrimaryConsumers',organism);
   WORLD.addToCollection('ActivePrimaryConsumers',organism);

}
 
for(let i = 0; i < 10; i++){

   var position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
   
   //console.log(position);

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

   WORLD.addToCollection('SecondaryConsumers',organism);
   WORLD.addToCollection('ActiveSecondaryConsumers',organism);

}


for(let i = 0; i < 0; i++){

   var position = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
   
   //console.log(position);

   var organism = WORLD.createAgent('Organism', 
   {
      'info' :{
         pos: position,
         maxSpeed : 5,
         sensitivity : 100
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

   WORLD.addToCollection('TertiaryConsumers',organism);
   WORLD.addToCollection('ActiveTertiaryConsumers',organism);

}


WORLD.execute();