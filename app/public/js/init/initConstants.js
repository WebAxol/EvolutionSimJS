const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const WORLD = new World();
const ECOSYSTEM = new Ecosystem(WORLD, 

    ['PrimaryConsumers','SecondaryConsumers','TertiaryConsumers'], 
    {
        'SecondaryConsumers' : { 'PrimaryConsumers' : 1 },
        'TertiaryConsumers' :  { 'SecondaryConsumers' : 1}
    }
);

console.log(ECOSYSTEM);