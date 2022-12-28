Init.prototype.initCollections = () => {

    WORLD.registerCollection('Renderables');
    WORLD.registerCollection('Kinetics');

    // Note, the rest of collections utilised to store Producer and Consumer agents are defined from the Ecosystem module and its submodules
}