var canvas = document.getElementById("canvas");
var height = document.getElementById("input_height");
var width = document.getElementById("input_width");
var sizepick = document.getElementById("sizepick");
var color = document.getElementById("colorpick");
var r;
var c;
sizepick.onsubmit = function(event){
    event.preventDefault();
    clear_grid();
    make_grid();
};

function make_grid() {
    for (r=0; r<height.value; r++){
        const row = canvas.insertRow(r);
        for (c=0; c<width.value; c++){
            const cell = row.insertCell(c);
            cell.addEventListener("click", fill_square);
        }
    }
}

function clear_grid(){
    while (canvas.firstChild){
         canvas.removeChild(canvas.firstChild);
    }
}

function fill_square () {
    this.setAttribute("style", `background-color: ${color.value}`);
}
