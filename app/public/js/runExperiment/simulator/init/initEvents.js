Init.prototype.initEvents = () => {
    
    // events

    WORLD.registerEvent('agentOutOfCanvas');
    WORLD.registerEvent('generationOver');
    WORLD.registerEvent('summaryCreated');
    WORLD.registerEvent('newGenerationReady');
    WORLD.registerEvent('simulationOver');
    WORLD.registerEvent('organismHunted');
    WORLD.registerEvent('organismOutOfEnergy');


    // event subscribers

    WORLD.registerServiceToEvent('Organism'     ,'agentOutOfCanvas');
    WORLD.registerServiceToEvent('Statistics'   ,'generationOver');
    WORLD.registerServiceToEvent('Generations'  ,'summaryCreated');
    WORLD.registerServiceToEvent('Organism'     ,'newGenerationReady');
    WORLD.registerServiceToEvent('Organism'     ,'organismHunted');
    WORLD.registerServiceToEvent('Organism'     ,'organismOutOfEnergy');
    WORLD.registerServiceToEvent('DataSend'     ,'simulationOver');


}

