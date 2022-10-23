WORLD.registerEvent('generationOver');
WORLD.registerServiceToEvent('Generations','generationOver');

WORLD.registerEvent('agentOutOfCanvas');
WORLD.registerServiceToEvent('AgentBehaviour','agentOutOfCanvas');

WORLD.registerEvent('newGenerationReady');
WORLD.registerServiceToEvent('AgentBehaviour','newGenerationReady');


