//Creando el array con los miembros via JSON
let membersArray = data.results[0].members;
//Incrustando en una variable el id del select
let selectStates = document.getElementById ("stateSelect");
//Creando un array de estados
let states = [];
membersArray.forEach (member => {
    if (!states.includes(member.state)) {
        states.push (member.state);
    }
});
/*function includeStates (arreglo, estados) {
    arreglo.forEach (member => {
        if (!estados.includes(member.state)) {
            estados.push (member.state);
        }
    })
}*/
states.sort();
//Creando los elementos para trabajar con estados
states.forEach (state => {
    let option = document.createElement ("option");
    option.innerText = state;
    option.value = state;
    selectStates.appendChild (option);
})
/*function forEachStates (estados) {
    estados.forEach (state => {
        let option = document.createElement ("option");
        option.innerText = state;
        option.value = state;
        selectStates.appendChild (option);
    })
}*/
//Creando la funcion para llenar la tabla
function fillTable (array, idTable) {
    let tableToFill = document.getElementById(idTable);
    tableToFill.innerHTML = "";
    if (array.length == 0) {
        let row = document.createElement ("tr");
        row.innerHTML = `<td class="noFilter" colspan="5">Select at least One filter to apply</td>`
        tableToFill.appendChild (row);
    }
    array.forEach(member => {
        let row = document.createElement ("tr");
        row.innerHTML = `<td><a href = "${member.url}"> ${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td><td>${member.party}</td><td>${member.state}</td><td>${member.seniority}</td><td>${member.votes_with_party_pct}%</td>`;
        tableToFill.appendChild (row);
    });
}
fillTable (membersArray, "tableData");
//Creando los eventos
let formFiltros = document.getElementById("formFilter");
formFiltros.addEventListener ("change", (e) => {

let checkboxes = formFiltros.querySelectorAll ("[type='checkbox']");
let checkeds = Array.from (checkboxes).filter (checkbox => checkbox.checked);
    if  (checkeds.length == 0) {
        let filteredList = onlyStates(membersArray, selectStates.value);
        fillTable (filteredList, "tableData");
        
    } else {
        let selectedParty = checkeds.map (checkbox => checkbox.value);
        let selectedS = selectStates.value;
        let filteredList = filterStateCheckboxes (membersArray, selectedS, selectedParty);
        fillTable (filteredList, "tableData"); 
    }
});
/*function allCheckboxes () {
    let checkboxes = formFiltros.querySelectorAll ("[type='checkbox']");
    let checkeds = Array.from (checkboxes).filter (checkbox => checkbox.checked);
        if  (checkeds.length == 0) {
            let filteredList = onlyStates(membersArray, selectStates.value);
            fillTable (filteredList, "tableData");
            
        } else {
            let selectedParty = checkeds.map (checkbox => checkbox.value);
            let selectedS = selectStates.value;
            let filteredList = filterStateCheckboxes (membersArray, selectedS, selectedParty);
            fillTable (filteredList, "tableData"); 
        }
};*/
function filterStateCheckboxes (member, state, party) {
    let filterMember = [];
    member.forEach (accion => {
        if (accion.state == state || state == "all") {
            if (party.includes(accion.party)) {
                filterMember.push (accion);
            }
        }
    })
    return filterMember;
}
function onlyStates(arreglo, estado) {
    if (estado == "all") {
        return arreglo;
    } else {
        let soloEstados = arreglo.filter (miembro => miembro.state == estado);
        return soloEstados;
    }  
}