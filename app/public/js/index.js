'use strict'

var renderer = new Renderer(c);
var mainLoop = new MainLoop();
/*
renderer.renderBox({
    pos : { x  : 100, y : 100},
    width  : 100,
    height : 100,
    background : 'green'
})
*/
for(let i = 0; i < 300; i++){
    renderer.renderCircle({
        pos : { x : Math.random() * 3000, y : Math.random() * 1500},
        radius  : Math.random() * 100,
        background: 'rgba(255,0,0,0.5)'
    })
}