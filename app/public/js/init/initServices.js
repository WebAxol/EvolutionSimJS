
WORLD.registerService('Renderer', new Renderer(c));
WORLD.registerService('AgentBehaviour', new AgentBehaviour({

   'SecondaryConsumers' : { 'PrimaryConsumers' : 1 },
   'TertiaryConsumers' :  { 'SecondaryConsumers' : 1}

}));
WORLD.registerService('Motion', new Motion());