
function toggleSubMenu(submenuId, submenuId2, submenuId3) {
    var submenu = document.getElementById(submenuId);
    var submenu2 = document.getElementById(submenuId2);
    var submenu3 = document.getElementById(submenuId3);
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
    } else {
      submenu.style.display = 'block';
      submenu2.style.display = 'none';
      submenu3.style.display = 'none';
    }
  }

function fechar(){
    window.close();
}

function fecharJanela(){
  var abrirJanela = document.getElementById('Janela');
  abrirJanela.style.display = 'none';
}

function abrirJanela(){
  var abrirJanela = document.getElementById('Janela');
  abrirJanela.style.display = 'block';
}

function showdash() {
  var dash = document.getElementById("dash");
  var filter = document.getElementById("filterdados");
  var create = document.getElementById("createmassa");

  if (dash && filter && create) {
      dash.style.display = "flex";
      filter.style.display = "none";
      create.style.display = "none";
  }
}

function showfilter() {
  var dash = document.getElementById("dash");
  var filter = document.getElementById("filterdados");
  var create = document.getElementById("createmassa");

  if (dash && filter && create) {
      dash.style.display = "none";
      filter.style.display = "flex";
      create.style.display = "none";
  }
}

function showcreate() {
  var dash = document.getElementById("dash");
  var filter = document.getElementById("filterdados");
  var create = document.getElementById("createmassa");

  if (dash && filter && create) {
      dash.style.display = "none";
      filter.style.display = "none";
      create.style.display = "flex";
  }
}