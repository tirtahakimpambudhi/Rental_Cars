

const data = groupAndSumByYear(groupByModels)
const data_bar = groupByCreate,
data_bar2 = groupByMerk
const bar = {
    type: 'bar',
    data: {
        labels: data_bar2.map(row => row.merk),
        datasets: [
            {
                label: 'You Model Cars Data',
                data: data.map(row => row.count),
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
            },
        ]
    }
}

const doughnut = {
    type : "doughnut",
    data : {
        labels : data.map(row => row.modelCars),
        datasets : [
            {
                labels:'You Model Cars Data',
                data: data.map(row => row.count),
                backgroundColor:colors,
                hoverOffset: 4
            }
        ]
    }
}
const line = {
    type: 'line',
    data: {
        labels: data.map(row => row.modelCars),
        datasets: [
            {
                label: 'You Model Cars Data',
                data: data.map(row => row.count),
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
            }
        ]
    }
}


new Chart(
    document.getElementById('myChart'), doughnut
);
new Chart(
    document.getElementById('myChart2'), bar
);
