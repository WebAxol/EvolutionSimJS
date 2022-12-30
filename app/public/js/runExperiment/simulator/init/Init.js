'use strict'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const WORLD = new World();
const EXPERIMENT_DETAILS = {
   id : undefined, name : undefined
};

const colorPalettes = [
   ['skyblue','rgba(0,0,255,0.1)'      ],
   ['orange' ,'rgba(255,100,0,0.1)'    ],
   ['lawngreen'  , 'rgba(0,255,0,0.1)' ],
   ['violet'  , 'rgba(255,0,200,0.1)'  ],
   ['red'  , 'rgba(200,0,0,0.1)'       ]
];

var ECOSYSTEM;

class Init{

   prepareAndRunSimulation(experiment){

      // Relevant details for identification

      EXPERIMENT_DETAILS.id   = experiment._id;
      EXPERIMENT_DETAILS.name = experiment.name;

      this.setColorToSpecies(experiment.species);
   
      // Data models and schemas initialization

      this.initAgentTypes();
      this.initCollections();

      ECOSYSTEM = new Ecosystem(WORLD, experiment);

      // Functional modules and communication logic initialization

      this.initServices();
      this.initEvents();

      this.startWorld();
   }

   setColorToSpecies(species){

      let specieNames = Object.keys(species);

      specieNames.forEach((specieName, index) => {
         species[specieName].colorA = colorPalettes[index % (colorPalettes.length)][0];
         species[specieName].colorB = colorPalettes[index % (colorPalettes.length)][1];
      });
   }

   startWorld(){

      // methods defined as prototypes at initEvents.js and initServices.js, etc.

      WORLD.execute();
   
      // EVENT TO PAUSE OR RESUME WORLD EXECUTION
   
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
}