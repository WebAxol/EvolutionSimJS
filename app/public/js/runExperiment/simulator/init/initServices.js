Init.prototype.initServices = () => {

    WORLD.registerService('Renderer',       new Renderer(c));
    WORLD.registerService('Motion',         new Motion());
    WORLD.registerService('Organism',       new Organism(ECOSYSTEM));
    WORLD.registerService('Statistics' ,    new Statistics(ECOSYSTEM));
    WORLD.registerService('Generations',    new Generations(ECOSYSTEM));
    WORLD.registerService('DataSend',       new DataSend(ECOSYSTEM));
}
