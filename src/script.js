


const data = [
];


function openData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.click();

    input.onchange = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function (event) {
            const lines = event.target.result.split('\n');
            for (const line of lines) {
                const values = line.split(',');
                const date = values[0];
                const hour = values[1];
                const value = parseFloat(values[2]);
                const year = parseInt(values[3]);
                const month = parseInt(values[4]);

                if (!isNaN(value) && !isNaN(year) && !isNaN(month)) {
                    data.push(new Datos(date, hour, value, year, month));
                }
            }

        };


    };


}

class Datos {
    constructor(date, hour, value, year, month) {
        this.date = date;
        this.hour = hour;
        this.value = value;
        this.year = year;
        this.month = month;
    }
}

function findMonth() {

    const inputNumero = document.getElementById('inputNumero');
    const year = parseFloat(inputNumero.value);

    const maxValues = new Array(12).fill(Number.NEGATIVE_INFINITY);

    for (const dato of data) {
        if (dato.year === year) {
            const monthIndex = dato.month - 1;
            const value = dato.value;
            if (value > maxValues[monthIndex]) {
                maxValues[monthIndex] = value;
            }
        }
    }
    return maxValues;
}

function renderTable() {

    const info = findMonth();

    const tableBody = document.getElementById('data-body');
    tableBody.innerHTML = '';

    const datas = [
        { month: 'Enero', value: -1 },
        { month: 'Febrero', value: -1 },
        { month: 'Marzo', value: -1 },
        { month: 'Abril', value: -1 },
        { month: 'Mayo', value: -1 },
        { month: 'Junio', value: -1 },
        { month: 'Julio', value: -1 },
        { month: 'Agosto', value: -1 },
        { month: 'Septiembre', value: -1 },
        { month: 'Octubre', value: -1 },
        { month: 'Noviembre', value: -1 },
        { month: 'Diciembre', value: -1 },
    ];



    if (datas.length === info.length) {
        for (let x = 0; x < info.length; x++) {
            datas[x].value = info[x];
        }
    } else {
        console.log('Los arreglos no tienen la misma longitud');
    }


    const monthlyData = {};

    datas.forEach(item => {
        const { month, value } = item;
        if (!monthlyData[month]) {
            monthlyData[month] = [value];
        } else {
            monthlyData[month].push(value);
        }
    });

    for (const month in monthlyData) {
        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        const valueCell = document.createElement('td');

        monthCell.textContent = month;
        const totalValue = monthlyData[month].reduce((acc, curr) => acc + curr, 0);
        const averageValue = totalValue / monthlyData[month].length;
        valueCell.textContent = averageValue.toFixed(2);

        row.appendChild(monthCell);
        row.appendChild(valueCell);
        tableBody.appendChild(row);
    }
}





