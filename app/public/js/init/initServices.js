
WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('Motion', new Motion());
WORLD.registerService('AgentBehaviour', new AgentBehaviour(ECOSYSTEM));
WORLD.registerService('SummaryMaker' ,  new SummaryMaker(ECOSYSTEM));
WORLD.registerService('Generations',    new Generations(ECOSYSTEM));