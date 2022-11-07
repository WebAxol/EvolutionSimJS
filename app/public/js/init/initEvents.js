WORLD.registerEvent('agentOutOfCanvas');
WORLD.registerServiceToEvent('AgentBehaviour','agentOutOfCanvas');

WORLD.registerEvent('generationOver');
WORLD.registerServiceToEvent('Statistics','generationOver');

WORLD.registerEvent('summaryCreated');
WORLD.registerServiceToEvent('Generations','summaryCreated');

WORLD.registerEvent('newGenerationReady');
WORLD.registerServiceToEvent('AgentBehaviour','newGenerationReady');



WORLD.registerEvent('Test');
WORLD.registerServiceToEvent('AgentBehaviour','Test');


WORLD.registerEvent('simulationOver');
