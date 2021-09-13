//viendo la onda del fetch
/*let endpoint = "https://api.propublica.org/congress/v1/113/${chamber}/members.json";
let init = {
    headers:{
        "X-API-key": "71wMj8olnZ37pGOAzzp4DdIP8swr3HShHfItNlAu",
    }
};
fetch (endpoint, init)
    .then(res => res.json());
    .then(data => {
        tableLoyals (stadistics.leastLoyals, tableLeastLoyal);
    })
    .catch(err => console.error(err.message));*/

if (document.title == "TGIF Senate Loyal" || document.title == "TGIF House Loyal" ) {
    let statistics = {
        democrats:[],
        republicans:[],
        independents:[],
        averageVotesDemo: 0,
        averageVotesRepu: 0,
        averageVotesInde: 0,
        mostLoyals:[],
        leastLoyals:[],
        mostEngaged:[], //mas asistendias
        leastEngaged:[] //menos inasistencias
    }
    //longitud de los objetos partido
    statistics.democrats = data.results [0].members.filter(member => member.party == "D");
    statistics.republicans = data.results [0].members.filter(member => member.party == "R");
    statistics.independents = data.results [0].members.filter(member => member.party == "ID");
    //funcion para obtener porcentaje de lealtad del partido
    function totalPercent (party) {
        let outPercent = 0;
        party.forEach (member => {
            outPercent = outPercent + member.votes_with_party_pct;
        })
        outPercent /= party.length;
        return outPercent.toFixed(2);
    }
    statistics.averageVotesDemo = totalPercent(statistics.democrats);
    statistics.averageVotesRepu = totalPercent(statistics.republicans);
    statistics.averageVotesInde = totalPercent(statistics.independents);
    
    //funcion sort por parametro (por ej, votes_with_party_pct)
    let sortedArray = [];
    function arraySort (arreglo, propiedad, orden) {
        sortedArray = [...arreglo];
        if (orden == "descendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] > b[propiedad]) {
                    return -1;
                } else if (a[propiedad] < b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        if (orden == "ascendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] < b[propiedad]) {
                    return -1;
                } else if (a[propiedad] > b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        return sortedArray.slice (0, Math.ceil(sortedArray.length/10));;  
    }
    //verificacion del sort por "votes_with_party_pct" con 10%
    statistics.mostLoyals = arraySort(data.results[0].members, "votes_with_party_pct", "descendentes");
    statistics.leastLoyals = arraySort(data.results[0].members, "votes_with_party_pct", "ascendentes");
    
    //parametro missed_votes_pct
    statistics.mostEngaged = arraySort(data.results[0].members, "missed_votes_pct", "ascendentes");
    statistics.leastEngaged = arraySort(data.results[0].members, "missed_votes_pct", "descendentes");
    //tabla porcentajes
    let tableGlance = document.getElementById ("percentTable");
    
    function tablePercent () {
        let row1 = document.createElement ("tr");
        row1.innerHTML = `<td>Democrats</td><td>${stadistics.democrats.length}</td><td>${stadistics.averageVotesDemo}%</td>`;
        tableGlance.appendChild (row1);
        let row2 = document.createElement ("tr");
        row2.innerHTML = `<td>Republicans</td><td>${stadistics.republicans.length}</td><td>${stadistics.averageVotesRepu}%</td>`;
        tableGlance.appendChild (row2);
        let row3 = document.createElement ("tr");
        row3.innerHTML = `<td>Independents</td><td>${stadistics.independents.length}</td><td>${stadistics.averageVotesInde}%</td>`;
        tableGlance.appendChild (row3);
        let row4 = document.createElement ("tr");
        row4.innerHTML = `<td>Total</td><td>${data.results[0].members.length}</td><td>${totalPercent(data.results[0].members)}%</td>`;
        tableGlance.appendChild (row4);
    }
    tablePercent();
    //tablas de lealtad
    let tableLeastLoyal = document.getElementById ("leastLoyal");
    let tableMostLoyal = document.getElementById ("mostLoyal");
    
    function tableLoyals (arreglo, tablaInyectar) {
        arreglo.forEach (member => {
            if (member.middle_name == null) {
                member.middle_name = "";
            }
            let row = document.createElement ("tr");
            row.innerHTML = `<td><a href = "${member.url}"> ${member.first_name} ${member.middle_name} ${member.last_name}</a></td><td>${Math.ceil(((member.total_votes - member.missed_votes)*member.votes_with_party_pct)/100)}</td><td>${member.votes_with_party_pct}%</td>`;
            tablaInyectar.appendChild (row);
        })
    }
    tableLoyals (statistics.leastLoyals, tableLeastLoyal);
    tableLoyals (statistics.mostLoyals, tableMostLoyal);
} else {
    (document.title == "TGIF Senate Attendance" || document.title == "TGIF House Attendance")
    let statistics = {
        democrats:[],
        republicans:[],
        independents:[],
        averageVotesDemo: 0,
        averageVotesRepu: 0,
        averageVotesInde: 0,
        mostLoyals:[],
        leastLoyals:[],
        mostEngaged:[], //mas asistendias
        leastEngaged:[] //menos inasistencias
    }
    //longitud de los objetos partido
    statistics.democrats = data.results [0].members.filter(member => member.party == "D");
    statistics.republicans = data.results [0].members.filter(member => member.party == "R");
    statistics.independents = data.results [0].members.filter(member => member.party == "ID");
    //funcion para obtener porcentaje de lealtad del partido
    function totalPercent (party) {
        let outPercent = 0;
        party.forEach (member => {
            outPercent = outPercent + member.votes_with_party_pct;
        })
        outPercent /= party.length;
        return outPercent.toFixed(2);
    }
    statistics.averageVotesDemo = totalPercent(statistics.democrats);
    statistics.averageVotesRepu = totalPercent(statistics.republicans);
    statistics.averageVotesInde = totalPercent(statistics.independents);
    
    //funcion sort por parametro (por ej, votes_with_party_pct)
    let sortedArray = [];
    function arraySort (arreglo, propiedad, orden) {
        sortedArray = [...arreglo];
        if (orden == "descendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] > b[propiedad]) {
                    return -1;
                } else if (a[propiedad] < b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        if (orden == "ascendentes") {
            sortedArray.sort ((a, b) => {
                if (a[propiedad] < b[propiedad]) {
                    return -1;
                } else if (a[propiedad] > b[propiedad]) {
                    return 1;
                } else {
                    return 0;
                }
            })
        }
        return sortedArray.slice (0, Math.ceil(sortedArray.length/10));;  
    }
    //verificacion del sort por "votes_with_party_pct" con 10%
    statistics.mostLoyals = arraySort(data.results[0].members, "votes_with_party_pct", "descendentes");
    statistics.leastLoyals = arraySort(data.results[0].members, "votes_with_party_pct", "ascendentes");
    
    //parametro missed_votes_pct
    statistics.mostEngaged = arraySort(data.results[0].members, "missed_votes_pct", "ascendentes");
    statistics.leastEngaged = arraySort(data.results[0].members, "missed_votes_pct", "descendentes");
    //tabla porcentajes
    let tableGlance = document.getElementById ("percentTable");
    
    function tablePercent () {
        let row1 = document.createElement ("tr");
        row1.innerHTML = `<td>Democrats</td><td>${statistics.democrats.length}</td><td>${statistics.averageVotesDemo}%</td>`;
        tableGlance.appendChild (row1);
        let row2 = document.createElement ("tr");
        row2.innerHTML = `<td>Republicans</td><td>${statistics.republicans.length}</td><td>${statistics.averageVotesRepu}%</td>`;
        tableGlance.appendChild (row2);
        let row3 = document.createElement ("tr");
        row3.innerHTML = `<td>Independents</td><td>${statistics.independents.length}</td><td>${statistics.averageVotesInde}%</td>`;
        tableGlance.appendChild (row3);
        let row4 = document.createElement ("tr");
        row4.innerHTML = `<td>Total</td><td>${data.results[0].members.length}</td><td>${totalPercent(data.results[0].members)}%</td>`;
        tableGlance.appendChild (row4);
    }
    tablePercent();
    //tablas de compromiso
    let tableLeastAtt = document.getElementById ("leastLoyal");
    let tableMostAtt = document.getElementById ("mostLoyal");

    function tableEngaged (arreglo, tablaAtt) {
        arreglo.forEach (member => {
            if (member.middle_name == null) {
                member.middle_name = "";
            }
            let row = document.createElement ("tr");
            row.innerHTML = `<td><a href = "${member.url}"> ${member.first_name} ${member.middle_name} ${member.last_name}</a></td><td>${member.missed_votes}</td><td>${Math.ceil((member.missed_votes * 100)/ member.total_votes)}%</td>`;
            tablaAtt.appendChild (row);
        })
    }
    tableEngaged (statistics.leastEngaged, tableLeastAtt);
    tableEngaged (statistics.mostEngaged, tableMostAtt);
}
//array estadisticas creado. faltan agregar valores conforme se requiera

//tablas de compromiso
