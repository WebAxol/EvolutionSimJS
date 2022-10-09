'use strict'


for(let i = 0; i < 500; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(500, 500),
      sensitivity : 0,
      aspectColor : 'lawngreen',
      sensitivityFieldColor : 'rgba(0,255,0,0.03)'
   });


   WORLD.addToCollection('PrimaryConsumers', agent);
   WORLD.addToCollection('ActivePrimaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);
}


for(let i = 0; i < 100; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(200, 500),
      sensitivity : 100,
      maxSpeed    : 5,
      aspectColor : 'skyblue',
      sensitivityFieldColor : 'rgba(0,0,255,0.03)'
   });


   WORLD.addToCollection('SecondaryConsumers', agent);
   WORLD.addToCollection('ActiveSecondaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

}



for(let i = 0; i < 0; i++){

   var agent = buildAgent({
      pos : new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height),
      //pos : new Vector2D(200, 500),
      sensitivity : 100,
      maxSpeed    : 5,
      aspectColor : 'red',
      sensitivityFieldColor : 'rgba(255,0,0,0.03)'
   });


   WORLD.addToCollection('TertiaryConsumers', agent);
   WORLD.addToCollection('ActiveTertiaryConsumers', agent);
   WORLD.addToCollection('Kinetics', agent);

}





WORLD.execute();