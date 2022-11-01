const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WORLD = new World();
const ECOSYSTEM = new Ecosystem(WORLD, 

    {
        'Producers': {
            colorA : 'lawngreen',
            colorB : 'rgba(0,255,0,0.1)',
            maxSpeed : 0,
            minSpeed : 0,
            maxSense : 10,
            minSense : 0,
            foodFee  : 0
        },
        'SpecieA': {
            colorA : 'skyblue',
            colorB : 'rgba(0,0,255,0.1)',
            maxSpeed : 5,
            minSpeed : 5,
            maxSense : 100,
            minSense : 100,
            foodFee  : 1
        },
        'SpecieB': {
            colorA : 'purple',
            colorB : 'rgba(255,0,255,0.1)',
            maxSpeed : 5,
            minSpeed : 5,
            maxSense : 100,
            minSense : 100,
            foodFee  : 2
        }
    }, 
    {
        'SpecieA' :  { 'Producers' : 1},
        'SpecieB' : { 'Producers' : 1 }
    }
);

console.log(ECOSYSTEM);