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

    const n = result.results.length; 

    for(let i = 0; i < ((n < 200) ? n : 200); i++){

        let currentGeneration = result.results[i];

        species.forEach(specie => {
            let data = currentGeneration[specie];
            formatted[specie].push(data); 
        });
    }

    return formatted;
}

const createChart = (formattedResult) => {

    const species = Object.keys(formattedResult);
    const generationNumber = formattedResult[species[0]].length;
    const labels = Array(generationNumber).fill(0);
    const datasets = [];

    for(let i = 0; i < generationNumber ; i++){
        labels[i] = i;
    }

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

    const options = {
        scales: {
            x: { title: { display: true, text: 'generations' }},
            y: { title: { display: true, text: 'population (organisms per specie)' }}
        }
      }

    const config = {
        type : 'line',
        data : data,
        options: options
    }

    new Chart(c,config);
}