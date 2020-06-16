$(document).onloadstart(getData());

function getData() {
  var xhttp = new XMLHttpRequest();
  var user = getCookie('username');

  xhttp.onreadystatechange = function() {
    var myArr = JSON.parse(xhttp.response);
    assign_data_to_fields(myArr);
  };

  xhttp.open('POST', 'https://script.google.com/macros/s/AKfycbw5ZFBZPJTSfldVIICOdY_K5YhsKEhPSN-H_Hm8x8M8JzARYkbm/exec');
  xhttp.setRequestHeader("Content-Type", "text/plain");
  xhttp.send(user);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function assign_data_to_fields(arr) {
  var datos = arr['datos'][1];

  var nombre = datos['nombre'] + ' ' + datos['apellido1'] + ' ' + datos['apellido2'];
  document.getElementById('nombre').innerHTML = nombre;

  var email = datos['email'];
  document.getElementById('email').innerHTML = email;

  create_schedule(datos);

  var avisos = datos['avisos'];
  show_advises(avisos);

  asistencia = datos['asistencia'];
  asistance(asistencia);


  var notas = datos['notas'];
  grades_settler(notas);

  /*
  var calendario = datos['calendario'];
  document.getElementById('calendario').innerHTML = calendario;
  
  var grupo = datos['grupo'];
  document.getElementById('grupo').innerHTML = grupo;
  
  var carnet = datos['carnet'];
  document.getElementById('carnet').innerHTML = carnet;
  
  var codigoQr = datos['codigoQr'];
  document.getElementById('codigoQr').innerHTML = codigoQr;
    
  var sancionPracticas = datos['sancionPracticas'];
  document.getElementById('sancionPracticas').innerHTML = sancionPracticas;
*/
}

function show_advises(avisos) {
  var advises_list = '';
  for (var i = 0; i < avisos.length; i++) {
    advises_list += avisos[i] + '\n';
  };

  alert(advises_list);
}

const getSche = document.getElementById('get-sche');
getSche.addEventListener('click', schedule);

function schedule() {
  var schedule = document.getElementById('schedule');
  var main = document.getElementById('dinamic-content');
  var firstTrim = document.getElementById('firstTrim');
  var secondTrim = document.getElementById('secondTrim');
  var thirdTrim = document.getElementById('thirdTrim');
  var grades = document.getElementById('grades');

  main.style.display = 'none';
  schedule.style.display = 'block';
  firstTrim.style.display = 'block';
  secondTrim.style.display = 'none';
  thirdTrim.style.display = 'none';
  grades.style.display = 'none';
}

function main() {
  var schedule = document.getElementById('schedule');
  var main = document.getElementById('dinamic-content');
  var grades = document.getElementById('grades');

  main.style.display = 'block';
  schedule.style.display = 'none';
  grades.style.display = 'none';
}

function gradesTab() {
  var schedule = document.getElementById('schedule');
  var main = document.getElementById('dinamic-content');
  var grades = document.getElementById('grades');

  main.style.display = 'none';
  schedule.style.display = 'none';
  grades.style.display = 'block';
}

function select1() {
  var selectedSection = document.getElementById('dropdownMenuButton');
  var selectedTrim = document.getElementById('selectedTrim');
  var firstTrim = document.getElementById('firstTrim');
  var secondTrim = document.getElementById('secondTrim');
  var thirdTrim = document.getElementById('thirdTrim');
  var section1 = document.getElementById('primerTrim');
  selectedSection.innerHTML = section1.innerHTML;
  selectedTrim.innerHTML = section1.innerHTML;
  firstTrim.style.display = 'block';
  secondTrim.style.display = 'none';
  thirdTrim.style.display = 'none';
}

function select2() {
  var selectedSection = document.getElementById('dropdownMenuButton');
  var selectedTrim = document.getElementById('selectedTrim');
  var firstTrim = document.getElementById('firstTrim');
  var secondTrim = document.getElementById('secondTrim');
  var thirdTrim = document.getElementById('thirdTrim');
  var section2 = document.getElementById('segundoTrim');
  selectedSection.innerHTML = section2.innerHTML;
  selectedTrim.innerHTML = section2.innerHTML;
  firstTrim.style.display = 'none';
  secondTrim.style.display = 'block';
  thirdTrim.style.display = 'none';
}

function select3() {
  var selectedSection = document.getElementById('dropdownMenuButton');
  var selectedTrim = document.getElementById('selectedTrim');
  var firstTrim = document.getElementById('firstTrim');
  var secondTrim = document.getElementById('secondTrim');
  var thirdTrim = document.getElementById('thirdTrim');
  var section3 = document.getElementById('tercerTrim');
  selectedSection.innerHTML = section3.innerHTML;
  selectedTrim.innerHTML = section3.innerHTML;
  firstTrim.style.display = 'none';
  secondTrim.style.display = 'none';
  thirdTrim.style.display = 'block';
}

function asistance(asistencia) {
  var total_classes = asistencia.length;
  var present_days = 0;
  for (i = 0; i < total_classes; i++) {
    var asistio = asistencia[i]['valor'];
    if (asistio == 'SI') {
      present_days++;
    }
  };

  var percentage_mean = (present_days * 100) / total_classes;
  var absence = total_classes - present_days;
  document.getElementById('faltas').innerHTML = absence + ' faltas';

  var progress_circle = $("#progress-circle").gmpc({
    color: '#33b35a',
    line_width: 5,
    percent: percentage_mean
  });

  progress_circle.gmpc('animate', percentage_mean, 3000);
};

function create_schedule(datos) {
  var trimestre = datos['horario'];

  for (evaluacion = 0; evaluacion < trimestre.length; evaluacion++) {
    var dias_lectivos = trimestre[evaluacion];

    for (dia_semanal = 0; dia_semanal < dias_lectivos.length; dia_semanal++) {
      var asignaturas = dias_lectivos[dia_semanal]['hora'];

      for (asignatura = 0; asignatura < asignaturas.length; asignatura++) {
        var detalles = asignaturas[asignatura];

        var aula = `${evaluacion}Aula${asignatura}${dia_semanal}`;
        var content = `${evaluacion}content${asignatura}${dia_semanal}`;
        var prof1 = `${evaluacion}Prof1${asignatura}${dia_semanal}`;
        var prof2 = `${evaluacion}Prof2${asignatura}${dia_semanal}`;

        var clase = detalles['aula'];
        var contenido = detalles['contenido'];
        var profesor1 = detalles['profesor'][0];
        var profesor2 = detalles['profesor'][1];

        document.getElementById(aula).innerHTML = clase;
        document.getElementById(content).innerHTML = contenido;
        document.getElementById(prof1).innerHTML = profesor1;
        document.getElementById(prof2).innerHTML = profesor2;
      }
    }
  }
}

function grades_settler(notas) {
    var evaluaciones = notas['evaluaciones'];
    var body = document.getElementById("grades_table");
    body.innerHTML = '';
    var trimestre1 = evaluaciones[0];
        for(asignatura = 0; asignatura < trimestre1['asignaturas'].length; asignatura++) {
            var txt = trimestre1['asignaturas'][asignatura];
            body.innerHTML += `

                <tr>
                    <td style="color: green; font-weight: bold" scope="row">${trimestre1.nombre}</td>
                    <td scope="row">${txt.nombre}</td>
                    <td>${txt.nota}</td>
                </tr>
            `
        }
    var trimestre2 = evaluaciones[1];
        for(asignatura = 0; asignatura < trimestre2['asignaturas'].length; asignatura++) {
            var txt = trimestre2['asignaturas'][asignatura];
            body.innerHTML += `

                <tr>
                    <td style="color: blue; font-weight: bold" scope="row">${trimestre2.nombre}</td>
                    <td scope="row">${txt.nombre}</td>
                    <td>${txt.nota}</td>
                </tr>
            `
        }
    var trimestre3 = evaluaciones[2];
        for(asignatura = 0; asignatura < trimestre3['asignaturas'].length; asignatura++) {
            var txt = trimestre3['asignaturas'][asignatura];
            body.innerHTML += `

                <tr>
                    <td style="color: orange; font-weight: bold" scope="row">${trimestre3.nombre}</td>
                    <td scope="row">${txt.nombre}</td>
                    <td>${txt.nota}</td>
                </tr>
            `
        }
}

/*function grades_settler(notas) {
  var evaluaciones = notas['evaluaciones'];
  var body = document.getElementById("grades_table");
  var tbl = document.createElement('table');
  var thead = tbl.createTHead();
  var row = thead.insertRow();

  tbl.style.width = '100%';
  tbl.style.border = '1px solid black';

  for (evaluacion = 0; evaluacion < evaluaciones.length; evaluacion++) {
    var trimestre = evaluaciones[evaluacion];
    var th = document.createElement("th");
    var text = document.createTextNode(trimestre['nombre']);
    th.appendChild(text);
    row.appendChild(th);

  for (asignatura = 0; asignatura < trimestre['asignaturas'].length; asignatura++) {
    var tr = tbl.insertRow();
    var td = tr.insertCell();
    var txt = trimestre['asignaturas'][asignatura];

    var datosAsignatura = document.createTextNode(`${txt['nombre'] + "= " + txt['nota']}`);

    td.appendChild(datosAsignatura);

    if (txt['algunaNotaHnd'] != '') {
      var hndata = txt['hnd'];
      for (hnd = 0; hnd < hndata.length; hnd++) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        var englishDegree = hndata[hnd];

        var datosHND = document.createTextNode(`${englishDegree['nombre']}` + `${englishDegree['nota']}` + `${englishDegree['comentario']}`);
        td.appendChild(datosHND);
      }
    }

    if (txt['algunaNotaUf'] != '') {
      var ufdata = txt['ufesor'];

      for (uf = 0; uf < ufdata.length; uf++) {
        var tr = tbl.insertRow();
        var td = tr.insertCell();
        var teacherDegree = ufdata[uf];

        var datosuf = document.createTextNode(`${teacherDegree['nombre']}` + `${teacherDegree['nota']}` + `${teacherDegree['comentario']}` + `${teacherDegree['profesor']}`);
        td.appendChild(datosuf);
      }
    }
    
  }
  body.appendChild(tbl);
  }
}*/