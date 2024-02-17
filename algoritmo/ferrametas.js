var csvData = [];
var list_anos = [];

var emailcol = 0;
var statuscol = 0;
var lastsign = 0;

var list_lastsign = [];

var list_filtragem = [];

var listresults = [];

var msg = document.getElementById("msg");
var msgh = document.getElementById("msgh");
var mensagem =  document.getElementById("mensagem");



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
};

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


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Filtragem */
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
        
        //console.log(list_lastsign);
    }else{
        console.log('False');
    }
}


// Filtro

function filter(filteredData, emailcol, statuscol, lastsign){
    var tipoUsuario = document.getElementById('opcoesusuario').value;
    var status = document.getElementById('opcoesstatus').value;
    var ultimoLogin = document.getElementById('opcoeslast').value;
    listresults = [];

    if (tipoUsuario == 'Todos' && status == 'Todos' && ultimoLogin == 'Todos'){
        displayResultsFilter(filteredData);
    } else if (tipoUsuario != 'Todos' && status == 'Todos' && ultimoLogin == 'Todos'){
        if(tipoUsuario == 'Alunos'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                if (cell && typeof cell === 'string' && cell.length >= 4){
                    if (cell.substring(0, 4) == 'alun'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        }else if (tipoUsuario == 'Professores'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                if (cell && typeof cell === 'string' && cell.length >= 4){
                    if (cell.substring(0, 4) == 'prof'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }

            displayResultsFilter(listresults);

        }else if (tipoUsuario == 'Funcionários'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                if (cell && typeof cell === 'string' && cell.length >= 4){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun'){
                        listresults.push(filteredData[i]);
                    }
                } 
            }
            displayResultsFilter(listresults);
        } else{
            console.log('Erro! não especificado o campo de tipo Usuário.');
        }
    } else if (tipoUsuario == 'Todos' && status != 'Todos' && ultimoLogin == 'Todos'){
        if (status == 'Ativo'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 6){
                    if (cell.substring(0, 6) == 'Active'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        } else if (status == 'Suspenso'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 6){
                    if (cell.substring(0, 6) == 'Suspen'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else{
            console.log('Erro! não especificado o campo de status.');
        }
    } else if (tipoUsuario == 'Todos' && status == 'Todos' && ultimoLogin != 'Todos'){
        if(ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4){
                    if (cell.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        }else{
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4){
                    if (cell.substring(0, 4) == ultimoLogin){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        }
    } else if (tipoUsuario != 'Todos' && status != 'Todos' && ultimoLogin == 'Todos'){
        if(tipoUsuario == 'Alunos' && status == 'Ativo'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Active'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Alunos' && status == 'Suspenso'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Suspen'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        } else if(tipoUsuario == 'Professores' && status == 'Ativo'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Active'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Professores' && status == 'Suspenso'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Suspen'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Funcionários' && status == 'Ativo'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' && cell2.substring(0, 6) == 'Active'){
                        listresults.push(filteredData[i]);
                    }
                } 
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Funcionários' && status == 'Suspenso'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' && cell2.substring(0, 6) == 'Suspen'){
                        listresults.push(filteredData[i]);
                    }
                } 
            }
            displayResultsFilter(listresults);
        }else{
            console.log('Erro! não especificado o campo de tipo Usuário ou Status.');
        }
    } else if (tipoUsuario != 'Todos' && status == 'Todos' && ultimoLogin != 'Todos'){
        if(tipoUsuario == 'Alunos' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                    if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if (tipoUsuario == 'Professores' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                    if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if (tipoUsuario == 'Funcionários' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' && cell2.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        } else {
            if (tipoUsuario == 'Alunos'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                        if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
            } else if (tipoUsuario == 'Professores'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                        if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
            } else if (tipoUsuario == 'Funcionários'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                        if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' && cell2.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);

            } else{
                console.log('Erro! não especificado o campo de tipo Usuário ou Ultimo login.');
            }
        }
    } else if (tipoUsuario == 'Todos' && status != 'Todos' && ultimoLogin != 'Todos'){
        if(status == 'Ativo' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][statuscol];
                var cell2 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 6 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                    if (cell.substring(0, 6) == 'Active' && cell2.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(status == 'Suspenso' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][statuscol];
                var cell2 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 6 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                    if (cell.substring(0, 6) == 'Suspen' && cell2.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else{
            if (status == 'Ativo'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][statuscol];
                    var cell2 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 6 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                        if (cell.substring(0, 6) == 'Active' && cell2.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
            }else if (status == 'Suspenso'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][statuscol];
                    var cell2 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 6 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 4){
                        if (cell.substring(0, 6) == 'Suspen' && cell2.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);

            } else {
                console.log('Erro! não especificado o campo de tipo Status ou Ultimo login.');
            }
        }
    } else if (tipoUsuario != 'Todos' && status != 'Todos' && ultimoLogin != 'Todos'){
        if(tipoUsuario == 'Alunos' && status == 'Ativo' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Active' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Professores' && status == 'Ativo' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Active' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Funcionários' && status == 'Ativo' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' &&
                     cell2.substring(0, 6) == 'Active' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Alunos' && status == 'Suspenso' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Suspen' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Professores' && status == 'Suspenso' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Suspen' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);

        } else if(tipoUsuario == 'Funcionários' && status == 'Suspenso' && ultimoLogin == 'Nunca'){
            for(var i = 1; i < filteredData.length; i++){
                var cell = filteredData[i][emailcol];
                var cell2 = filteredData[i][statuscol];
                var cell3 = filteredData[i][lastsign];
                if (cell && typeof cell === 'string' && cell.length >= 4 &&
                cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                    if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' &&
                     cell2.substring(0, 6) == 'Suspen' && cell3.substring(0, 4) == 'Neve'){
                        listresults.push(filteredData[i]);
                    } 
                }
            }
            displayResultsFilter(listresults);
        } else {
            if(tipoUsuario == 'Alunos' && status == 'Ativo'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Active' && 
                        cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);

            } else if(tipoUsuario == 'Professores' && status == 'Ativo'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Active' && 
                        cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
    
            } else if(tipoUsuario == 'Funcionários' && status == 'Ativo'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' &&
                         cell2.substring(0, 6) == 'Active' && cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
    
            } else if(tipoUsuario == 'Alunos' && status == 'Suspenso'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) == 'alun' && cell2.substring(0, 6) == 'Suspen' && 
                        cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
    
            } else if(tipoUsuario == 'Professores' && status == 'Suspenso'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) == 'prof' && cell2.substring(0, 6) == 'Suspen' && 
                        cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
    
            } else if(tipoUsuario == 'Funcionários' && status == 'Suspenso'){
                for(var i = 1; i < filteredData.length; i++){
                    var cell = filteredData[i][emailcol];
                    var cell2 = filteredData[i][statuscol];
                    var cell3 = filteredData[i][lastsign];
                    if (cell && typeof cell === 'string' && cell.length >= 4 &&
                    cell2 && typeof cell2 === 'string' && cell2.length >= 6 &&
                    cell3 && typeof cell3 === 'string' && cell3.length >= 4){
                        if (cell.substring(0, 4) != 'prof' && cell.substring(0, 4) != 'alun' &&
                         cell2.substring(0, 6) == 'Suspen' && cell3.substring(0, 4) == ultimoLogin){
                            listresults.push(filteredData[i]);
                        } 
                    }
                }
                displayResultsFilter(listresults);
    
            } else {
                console.log('Erro! não especificado o campo de tipo Usuário, Status ou Ultimo login.')
            }
        }
    } else {
            console.log("Erro! Filtro não especificado!");
        }
}


function displayResultsFilter(filteredData) {
    listaemailapagar(filteredData, emailcol);

    var resultContainer2 = document.getElementById('list_filter_dados');
    
    var table = '<table style="margin: auto; padding:10px">';
    
    if (filteredData.length == 0){
        table = '<tr><td> Sem Resultado </td></tr>'
    } else{
        for (var i = 0; i < filteredData.length; i++) {
            table += '<tr>';
            for (var j = 0; j < filteredData[i].length; j++) {
                table += '<td>' + filteredData[i][j] + '</td>';
            }
            table += '</tr>';
        }
    }
    table += '</table>';

    resultContainer2.innerHTML = table;

}


function listaemailapagar(list, emailcol){
    var listaemailapagar = [];
    for (x=0 ;x < list.length ;x++){
        var email = list[x][emailcol];
        listaemailapagar.push(email); 
    }
    console.log(listaemailapagar);
}


function filtragemimp(listresults){
    var newWindow = window.open('', '_blank', 'width=600,height=400,scrollbars=yes');
        
    var table = '<table style="margin: auto; padding:10px">';

    for (var i = 0; i < listresults.length; i++) {
        table += '<tr>';
        for (var j = 0; j < listresults[i].length; j++) {
            table += '<td>' + listresults[i][j] + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';

    newWindow.document.write(table);

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*PAGINA DE CRIAÇÃO EM MASSA*/

lista_email = [];

function getemails (csvData, emailcol){
    for (var i = 1; i <= csvData.length; i++) {
        if (csvData[i] && csvData[i].hasOwnProperty(emailcol)) {
            var email = csvData[i][emailcol];
            lista_email.push(email);
        }
    }
}



var listacsv = [];



function Gerador(){
    var nomesTexto = document.getElementById("nomesInput").value;
    var unidade = document.getElementById('opcoesunidade').value;
    listacsv = [['First Name','Last Name [Required]','Email Address [Required]','Password [Required]', 'Org Unit Path [Required]','Change Password at Next Sign-In']];


    getemails(csvData, emailcol);

    // Dividir o texto em linhas
    var linhas = nomesTexto.split('\n');

    // Remover espaços extras em cada linha
    var nomesLimpos = linhas.map(function(nome) {
        return nome.trim();
    });

    // Remover linhas vazias
    var nomesFiltrados = nomesLimpos.filter(function(nome) {
        return nome !== "";
    });

    var primeirosNomes = nomesFiltrados.map(function(nomeCompleto) {
        var partes = nomeCompleto.split(' ');
        return partes[0];
    });  

    var lastNomes = nomesFiltrados.map(function(nomeCompleto) {
        var palavras = nomeCompleto.split(' ');
        palavras.shift();
        return palavras.join(' ');
        
    });

    var listnomeminjunto = nomesFiltrados.map(function(nomeCompleto){
         var nome = nomeCompleto.toLowerCase();
             // Substituir caracteres específicos
                nome = nome.replace(/ã/g, 'a');
                nome = nome.replace(/é/g, 'e');
                nome = nome.replace(/è/g, 'e');
                nome = nome.replace(/ò/g, 'o');
                nome = nome.replace(/ó/g, 'o');
                nome = nome.replace(/õ/g, 'o');
                nome = nome.replace(/á/g, 'a');
                nome = nome.replace(/ç/g, 'c');
                nome = nome.replace(/à/g, 'a');
                nome = nome.replace(/í/g, 'i');
                nome = nome.replace(/ì/g, 'i');
                nome = nome.replace(/ù/g, 'u');
                nome = nome.replace(/ú/g, 'u');
            // Remover espaços
         return nome = nome.replace(/\s/g, '');
    });

    var list = [];
    var list2 = [];

    for(x=0; x < nomesFiltrados.length ; x++){
        list = [];
        var fnome = primeirosNomes[x];
        var lnome = lastNomes[x];
        var Password = 'ananeri123'; 
        var org = '/Alunos/Alunos - '+ unidade;
        var change = 'TRUE';
        var nomeminjunto = listnomeminjunto[x];
        var email = 'aluno.'+nomeminjunto+'@ananerieducacao.com.br';

        if (lista_email.includes(email) == true) {
            list2.push(email);
        } else {
            list.push(fnome);
            list.push(lnome);
            list.push(email);
            list.push(Password);
            list.push(org);
            list.push(change);
            listacsv.push(list);
        }

    }

    if (list2.length > 0 && lista_email.length > 0){
        var text = "Segue os email já existem: <br>";
        for (var i=0; i < list2.length; i++){
            text += list2[i]+'<br>';
        }
        mensagem.style.display = 'block';
        msg.innerHTML =  text;
        msgh.style.backgroundColor = 'red';
        msgh.style.color = 'white';  // A propriedade é 'color', não 'Color'
        setTimeout(sumir_msg, 2000);
     }else if (lista_email.length == 0){
        var text = "É preciso que carregue os dados antes de criar novos emails<br>";
        mensagem.style.display = 'block';
        msg.innerHTML =  text;
        msgh.style.backgroundColor = 'red';
        msgh.style.color = 'white';  // A propriedade é 'color', não 'Color'
        setTimeout(sumir_msg, 2000);
     }else {
        displayCreateMassa(listacsv);
    }

    
}

function sumir_msg (){
    mensagem.style.display='none';
}


function displayCreateMassa(filteredData) {

    var resultContainer3 = document.getElementById('list_create_massa');
    
    var table = '<table style="margin: auto; padding:10px">';
    
    if (filteredData.length == 0){
        table = '<tr><td> Sem Resultado </td></tr>'
    } else{
        for (var i = 0; i < filteredData.length; i++) {
            table += '<tr>';
            for (var j = 0; j < filteredData[i].length; j++) {
                table += '<td>' + filteredData[i][j] + '</td>';
            }
            table += '</tr>';
        }
    }
    table += '</table>';

    resultContainer3.innerHTML = table;
}

// Função para converter array em CSV
function arrayToCSV(data) {
    return data.map(row => row.join(',')).join('\n');
}

// Função para iniciar o download
function downloadCSV() {
    // Converta o array para CSV
    const csvData = arrayToCSV(listacsv);

    // Crie um objeto Blob (Binary Large Object) com os dados CSV
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Crie um link de download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Defina o nome do arquivo CSV
    link.download = 'dados.csv';

    // Adicione o link ao documento
    document.body.appendChild(link);

    // Clique no link para iniciar o download
    link.click();

    // Remova o link do documento
    document.body.removeChild(link);
    }