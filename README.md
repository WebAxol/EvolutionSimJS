# EvolutionSimJS

This is an academic project that intends to understand how communities inside ecosystems can change and evolve depending on specific conditions.

<b>Warning:</b> This code is not ready for production and lacks some good practices - it was specifically made for academic research.

![EvolutionSimJS - Simulator in action](https://github.com/WebAxol/EvolutionSimJS/blob/master/img/simulator.png)

![EvolutionSimJS - Results graphed](https://github.com/WebAxol/EvolutionSimJS/blob/master/img/results.png)


  <h2><b>Main Features:</b></h2>

  - <b>Interface to set up experiments:</b>  The final user can establish the variables as he requires, so there is enough flexibility to run different kinds of experiments.
  
  - <b>Interface to retrieve and graph results of experiments: </b> It integrates Chart.js to visualize results and analyze trends
  
  - <b>The core piece - the simulator (not ready for production, it needs more testing and optimization)</b> 

<h2>Missing technical requirements for deployment</h2>

  - Index web page with links to the rest of frontend interfaces
  - Perform security tests on back-end controllers
  - Further test and optimize simulation; it must run at least at 30fps having a load of 500(consumers)x1000(producers)
  - Finish user interfaces and test UX
  - Turn all scripts into ECMAScript modules and import/export files
