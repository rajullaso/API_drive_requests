function tableCreate(){
    var body = document.body;
    var tbl  = document.createElement('table');
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black';

    for(var i = 0; i < 3; i++){
        var tr = tbl.insertRow();
        for(var j = 0; j < 2; j++){
            var td = tr.insertCell();
            td.appendChild(document.createTextNode('Cell'));
            td.style.border = '1px solid black';
        }
    }
    body.appendChild(tbl);
}
tableCreate();