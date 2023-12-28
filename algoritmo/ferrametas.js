var csvData = [];
var list_anos = [];

var emailcol = 0;
var statuscol = 0;
var lastsign = 0;

var list_lastsign = [];

var list_filtragem = [];


document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var csvContent = e.target.result;
        csvData = parseCSV(csvContent);
        showcolunm(csvData[0]);
        plotdados(csvData, emailcol, statuscol);
        listlastsign(csvData, lastsign);
        piegraf(list_anos);
        validacaocolunm(csvData, emailcol, statuscol, lastsign);
        displayFilteredResults(csvData);
        
    }; 
    reader.readAsText(file);

}

function parseCSV(csvContent) {
    var lines = csvContent.split('\n');
    var data = [];

    for (var i = 0; i < lines.length; i++) {
        var values = lines[i].split(',');
        data.push(values);
    }

    return data;
}

function showcolunm(filteredData){
    for (var j = 0; j < filteredData.length; j++) {
        if(filteredData[j] == 'Email Address [Required]'){
            emailcol = j;
        } else if(filteredData[j] == 'Status [READ ONLY]'){
            statuscol = j;
        } else if(filteredData[j] == 'Last Sign In [READ ONLY]'){
            lastsign = j;
        }
    };

}


function displayFilteredResults(filteredData) {

    var resultContainer = document.getElementById('list_dados');
    
    var table = '<table style="margin: auto; padding:10px">';
    
    for (var i = 0; i < filteredData.length; i++) {
        table += '<tr>';
        for (var j = 0; j < filteredData[i].length; j++) {
            table += '<td>' + filteredData[i][j] + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    resultContainer.innerHTML = table;

}



function showlistGlobal(filteredData){
    var newWindow = window.open('', '_blank', 'width=600,height=400,scrollbars=yes');
        
    var table = '<table style="margin: auto; padding:10px">';

    for (var i = 0; i < filteredData.length; i++) {
        table += '<tr>';
        for (var j = 0; j < filteredData[i].length; j++) {
            table += '<td>' + filteredData[i][j] + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    newWindow.document.write(table);
}


function plotdados(filteredData, emailcol, statuscol){

    var totaldecontas = document.getElementById('total_contas');
    var total_profA = document.getElementById('total_profA');
    var total_profI = document.getElementById('total_profI');
    var total_alunosA = document.getElementById('total_alunosA');
    var total_alunosI = document.getElementById('total_alunosI');
    var total_funciA = document.getElementById('total_funciA');
    var total_funciI = document.getElementById('total_funciI');


    var Ptotal_profA = document.getElementById('%total_profA');
    var Ptotal_profI = document.getElementById('%total_profI');
    var Ptotal_alunosA = document.getElementById('%total_alunosA');
    var Ptotal_alunosI = document.getElementById('%total_alunosI');
    var Ptotal_funciA = document.getElementById('%total_funciA');
    var Ptotal_funciI = document.getElementById('%total_funciI');

    
    var PPtotal_profA = document.getElementById('%%total_profA');
    var PPtotal_profI = document.getElementById('%%total_profI');
    var PPtotal_alunosA = document.getElementById('%%total_alunosA');
    var PPtotal_alunosI = document.getElementById('%%total_alunosI');
    var PPtotal_funciA = document.getElementById('%%total_funciA');
    var PPtotal_funciI = document.getElementById('%%total_funciI');


    var alunosA = 0;
    var alunosI = 0;
    var professorA = 0;
    var professorI = 0;
    var funcionariosA = 0;
    var funcionariosI = 0;

    
    for (var i = 1; i < filteredData.length - 1; i++) {
        var emailValue = filteredData[i][emailcol];
        if (typeof emailValue === 'string') {
            if (emailValue.substring(0, 4) == 'alun') {
                if (filteredData[i][statuscol].substring(0, 6) == 'Active'){
                    alunosA ++;
                } else if (filteredData[i][statuscol].substring(0, 6) == 'Suspen'){
                    alunosI ++;
                } else{
                    console.log('Erro - Status aluno!');
                }
            } else if (emailValue.substring(0,4) == 'prof'){
                if (filteredData[i][statuscol].substring(0, 6) == 'Active'){
                    professorA ++;
                } else if (filteredData[i][statuscol].substring(0, 6) == 'Suspen'){
                    professorI ++;
                } else{
                    console.log('Erro - Status professor!');
                }

            } else{
                if (filteredData[i][statuscol].substring(0, 6) == 'Active'){
                    funcionariosA ++;
                } else if (filteredData[i][statuscol].substring(0, 6) == 'Suspen'){
                    funcionariosI ++;
                } else{
                    console.log('Erro - Status funcionarios!');
                }
            }
        }
    }

    var VVPtotal_profA = (professorA*100)/(filteredData.length -2);
    var VVPtotal_profI = (professorI*100)/(filteredData.length -2);
    var VVPtotal_alunosA = (alunosA*100)/(filteredData.length -2);
    var VVPtotal_alunosI = (alunosI*100)/(filteredData.length -2);
    var VVPtotal_funciA = (funcionariosA*100)/(filteredData.length -2);
    var VVPtotal_funciI = (funcionariosI*100)/(filteredData.length -2);


    var VPtotal_profA = (professorA*100)/(professorA+professorI);
    var VPtotal_profI = (professorI*100)/(professorA+professorI);
    var VPtotal_alunosA = (alunosA*100)/(alunosA+alunosI);
    var VPtotal_alunosI = (alunosI*100)/(alunosA+alunosI);
    var VPtotal_funciA = (funcionariosA*100)/(funcionariosA+funcionariosI);
    var VPtotal_funciI = (funcionariosI*100)/(funcionariosA+funcionariosI);

    totaldecontas.innerHTML = filteredData.length - 2;
    total_profA.innerHTML = professorA;
    total_profI.innerHTML = professorI;
    total_alunosA.innerHTML = alunosA;
    total_alunosI.innerHTML = alunosI;
    total_funciA.innerHTML = funcionariosA;
    total_funciI.innerHTML = funcionariosI;

    Ptotal_profA.innerHTML = VPtotal_profA.toFixed(2);
    Ptotal_profI.innerHTML = VPtotal_profI.toFixed(2);
    Ptotal_alunosA.innerHTML = VPtotal_alunosA.toFixed(2);
    Ptotal_alunosI.innerHTML = VPtotal_alunosI.toFixed(2);
    Ptotal_funciA.innerHTML = VPtotal_funciA.toFixed(2);
    Ptotal_funciI.innerHTML = VPtotal_funciI.toFixed(2);

    PPtotal_profA.innerHTML = VVPtotal_profA.toFixed(2);
    PPtotal_profI.innerHTML = VVPtotal_profI.toFixed(2);
    PPtotal_alunosA.innerHTML = VVPtotal_alunosA.toFixed(2);
    PPtotal_alunosI.innerHTML = VVPtotal_alunosI.toFixed(2);
    PPtotal_funciA.innerHTML = VVPtotal_funciA.toFixed(2);
    PPtotal_funciI.innerHTML = VVPtotal_funciI.toFixed(2);

}

function listlastsign(filteredData, lastsign){
    for (var j = 1; j < filteredData.length - 1; j++) {
        list_anos.push(filteredData[j][lastsign].substring(0,4));
    }
    console.log(list_anos.length);
    console.log(csvData);
}

function piegraf(list){
    var values1= list;

    // Objeto para armazenar a frequência de cada valor
    var frequencia = {};

    // Percorre a array original e calcula a frequência de cada valor
    values1.forEach(function(valor) {
        if (frequencia[valor]) {
            frequencia[valor]++;
        } else {
            frequencia[valor] = 1;
        }
    });
        // Array com todos os valores únicos
    var valoresUnicos = Object.keys(frequencia).map(function(valor) {
        return valor;
    });

    // Array com a frequência de cada valor único
    var frequenciaValoresUnicos = valoresUnicos.map(function(valor) {
        return frequencia[valor];
    });

    list_lastsign = valoresUnicos;

    //console.log("Valores únicos:", valoresUnicos);
    //console.log("Frequência de cada valor:", frequenciaValoresUnicos);
    
    var valortotal = 0;
    for(var i = 0; i < frequenciaValoresUnicos.length; i++){
        valortotal =  valortotal + parseInt(frequenciaValoresUnicos[i]);
    };
    //console.log(valortotal);

    var percentual = []
    for(var i = 0; i < frequenciaValoresUnicos.length; i++){
        valor = (parseInt(frequenciaValoresUnicos[i]) * 100)/valortotal;
        percentual.push(parseFloat(valor.toFixed(2)));
    };
    //console.log(percentual);

    // Configuração do gráfico
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: percentual,
                //backgroundColor: colors
            }],
            labels: valoresUnicos
        },
        options: {
            responsive: false
        }
    };

    // Criação do gráfico
    var ctx = document.getElementById('myPieChart').getContext('2d');
    new Chart(ctx, config);
}



// Filtragem 
// construção dos select

// confirmação das variaves no dados csv e criação dass opçoes de ultimo ano
function validacaocolunm(filteredData, emailcol, statuscol, lastsign){
        var opclistar = document.getElementById('opcoeslast');

    if(filteredData[0][emailcol] == 'Email Address [Required]' && filteredData[0][statuscol] == 'Status [READ ONLY]' && filteredData[0][lastsign] == 'Last Sign In [READ ONLY]'){
        var opc = '';
        for (x = 0; x < list_lastsign.length + 1; x++){
            if (x == 0){
                opc += '<option value="Todos"> Todos';
            }else{
                if (list_lastsign[x-1] == 'Neve'){
                    opc+='<option value="Nunca"> Nunca';
                } else{
                    opc+='<option value="'+list_lastsign[x-1]+'"> '+list_lastsign[x-1];
                }

            }
            opc += '</option>';
        };
        opclistar.innerHTML = opc;
        
        console.log(list_lastsign);
    }else{
        console.log('False');
    }
}


// Filtro
/*
function filter(filteredData, emailcol, statuscol, lastsign){
    var tipoUsuario = document.getElementById('opcoesusuario').value;
    var status = document.getElementById('opcoesstatus').value;
    var ultimoLogin = document.getElementById('opcoeslast').value;

    // Aqui você pode realizar a lógica de filtragem com base nos valores selecionados
    var resultadoFiltragem = [tipoUsuario, status, ultimoLogin];
    if (resultadoFiltragem[0] == ){

    }
    for (var i = 1; i < filteredData.length; i++) {
        for (var j = 0; j < filteredData[i].length; j++) {

        }
    }


}*/



