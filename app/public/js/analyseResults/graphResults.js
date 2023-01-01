const canvas = document.getElementById('chartCanvas');
const c = canvas.getContext('2d');
const colors = ['skyblue','orange','lawngreen','violet','red'];
 


const formatResult = (result) => {
    
    var species = Object.keys(result.results[0]);
    var formatted = {};
    

    species.forEach(specie => {
        formatted[specie] = []; 
    });
    
    console.log(result.results);

    result.results.forEach(currentGeneration => {

        species.forEach(specie => {
            let data = currentGeneration[specie];
            formatted[specie].push(data); 
        });
        
    });

    return formatted;
}

const createChart = (formattedResult) => {

    const species = Object.keys(formattedResult);
    const generationNumber = formattedResult[species[0]].length;
    const labels = Array(generationNumber).fill(0);
    const datasets = [];

    species.forEach((specieName, index) => {
        datasets.push({
            label: specieName,
            data: formattedResult[specieName],
            fill: false,
            borderColor: colors[index],
            tension: 0.1
        })
    });

    const data  = {
        labels: labels,
        datasets: datasets
    };

    const config = {
        type : 'line',
        data : data
    }

    new Chart(c,config);
}