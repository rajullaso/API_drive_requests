$(document).onloadstart(getData());
const header = document.querySelector('header');
const section1 = document.getElementById('events');
const section2 = document.getElementById('festive');
const section3 = document.getElementById('nolective');
var calendario = [];
function getData() {
  var xhttp = new XMLHttpRequest();
  var user = getCookie('username');

  xhttp.onreadystatechange = function () {
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
  var datos = arr['datos'][0];

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

  today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  calendario = datos['calendario'];
  showCalendar(currentMonth, currentYear, calendario);
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
  var calendar = document.getElementById('calendar');

  main.style.display = 'none';
  schedule.style.display = 'block';
  firstTrim.style.display = 'block';
  secondTrim.style.display = 'none';
  thirdTrim.style.display = 'none';
  grades.style.display = 'none';
  calendar.style.display = 'none';
}

function main() {
  var schedule = document.getElementById('schedule');
  var main = document.getElementById('dinamic-content');
  var grades = document.getElementById('grades');
  var calendar = document.getElementById('calendar');

  main.style.display = 'block';
  schedule.style.display = 'none';
  grades.style.display = 'none';
  calendar.style.display = 'none';
}

function gradesTab() {
  var schedule = document.getElementById('schedule');
  var main = document.getElementById('dinamic-content');
  var grades = document.getElementById('grades');
  var calendar = document.getElementById('calendar');

  main.style.display = 'none';
  schedule.style.display = 'none';
  grades.style.display = 'block';
  main.style.display = 'none';
  calendar.style.display = 'none';
}

function calTab() {
  var calendar = document.getElementById('calendar');
  var main = document.getElementById('dinamic-content');
  var grades = document.getElementById('grades');
  var schedule = document.getElementById('schedule');

  main.style.display = 'none';
  schedule.style.display = 'none';
  calendar.style.display = 'block';
  grades.style.display = 'none';
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
  if (evaluaciones.content != null) {
    var trimestre1 = evaluaciones[0];
    for (asignatura = 0; asignatura < trimestre1['asignaturas'].length; asignatura++) {
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
    for (asignatura = 0; asignatura < trimestre2['asignaturas'].length; asignatura++) {
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
    for (asignatura = 0; asignatura < trimestre3['asignaturas'].length; asignatura++) {
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
}

function takeData(calendario) {
  showEvents(calendario);
  showFestivos(calendario);
  showNoLectivos(calendario);
}

function showEvents(calendario) {
  const events = calendario['eventos'];

  for (var key in events) {
    var value = events[key];
    get_event_dates(value.inicio, value.fin);
  }
}

function get_event_dates(inicio, fin) {
  //la diferencia de días entre el principio y el fin del evento
  var end_parts = fin.split("/");
  var end_day = end_parts[0];
  var end_month = end_parts[1];
  var end_year = end_parts[2];

  var init_parts = inicio.split("/");
  var init_day = init_parts[0];
  var init_month = init_parts[1];
  var init_year = init_parts[2];

  var days = end_day - init_day;
  var months = end_month - init_month;

  if (days > 0) {

    if (months > 0) {
      days = daysInMonth(init_month, init_year) - init_day + end_day;

      for (let j = 0; j < months - 1; j++) {
        days += daysInMonth(init_month + j, init_year);
      }
    }

    // cada día entre el inicio y el final se pinta
    for (let i = 0; i < days + 1; i++) {
      var next_day = parseInt(init_day, 10) + i;
      var next_month = parseInt(init_month, 10);
      var datestring = pad(next_day) + "/" + pad(next_month) + "/" + init_year;

      addToCal(datestring, 'event');

      var did_month_change = daysInMonth(init_month, init_year) - init_day;

      if (did_month_change == 0) {
        init_month++;
      }
    }
  } else {
    // si el evento empieza y termina el mismo día
    addToCal(inicio, 'event');
  }
}

function addToCal(day, day_class) {
  if (document.getElementById(`${day}`) != null) {
    document.getElementById(`${day}`).classList.add(`${day_class}`);
  }
}

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function showFestivos(calendario) {
  const festiv = calendario['festivos'];

  for (var key in festiv) {

    var free_day = festiv[key];

    addToCal(free_day, 'free_day');
  }
}

function showNoLectivos(calendario) {
  const nolect = calendario['noLectivos'];

  for (var key in nolect) {

    var value = nolect[key];

    addToCal(value, 'holiday')
  }
}

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear, calendario);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear, calendario);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear, calendario);
}

function showCalendar(month, year, calendario) {
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let firstDay = (new Date(year, month)).getDay();
  firstDay--;

  tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear = document.getElementById("monthAndYear");

  monthAndYear.innerHTML = months[month] + " " + year;

  // creating all cells
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth(month, year)) {
        break;
      }
      else {
        cell = document.createElement("td");
        cell.id = pad(date) + "/" + pad((month + 1)) + "/" + year;
        cellText = document.createTextNode(date);

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.classList.add("bg-info");
        } // color today's date

        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row); // appending each row into calendar body.
  }
  takeData(calendario);
}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}