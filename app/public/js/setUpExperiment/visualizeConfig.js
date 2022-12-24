const speciesTable = document.getElementById('speciesTableBody');
const relationshipTable = document.getElementById('relationshipTableBody');


function displaySpeciesAtTable(){
    let species = Object.keys(configurationJSON.species);

    speciesTable.innerHTML = '';

    species.forEach((specie) => {
        speciesTable.innerHTML += `<tr>
            <td>${specie}</td>
            <td>${configurationJSON.species[specie].minSpeed}-${configurationJSON.species[specie].maxSpeed}</td>
            <td>${configurationJSON.species[specie].minSense}-${configurationJSON.species[specie].maxSense}</td>
            <td>${configurationJSON.species[specie].foodFee}</td>
            <td>${configurationJSON.species[specie].initialPopulation}</td>
            <td>${configurationJSON.species[specie].populationLimit}</td>
        </tr>`
    });
}

function displayMutationsAtTable(){
    let speciesMutated = Object.keys(configurationJSON.mutations);

    mutationsTable.innerHTML = '';

    speciesMutated.forEach((specie) => {
        mutationsTable.innerHTML += `<tr>
            <td>${specie}</td>
            <td>${configurationJSON.mutations[specie].speed.probability}</td>
            <td>${configurationJSON.mutations[specie].speed.minChange}-${configurationJSON.mutations[specie].speed.maxChange}</td>
            <td>${configurationJSON.mutations[specie].sensitivity.probability}</td>
            <td>${configurationJSON.mutations[specie].sensitivity.minChange}-${configurationJSON.mutations[specie].sensitivity.maxChange}</td>
        </tr>`
    });
}


function displayRelationshipssAtTable(){
    let speciesRelationships = Object.keys(configurationJSON.relationships);

    mutationsTable.innerHTML = '';

    speciesMutated.forEach((specie) => {
        mutationsTable.innerHTML += `<tr>
            <td>${specie}</td>
            <td>${configurationJSON.mutations[specie].speed.probability}</td>
        </tr>`
    });
}