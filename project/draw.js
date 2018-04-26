var can, Context,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        bsize: 10,
        down: false,
    },
    stroke = [],
    current_Stroke = null;


function redraw () {
    Context.clearRect(0, 0, can.width(), can.height());
    Context.lineCap = 'round';
    for (var a = 0;  a < stroke.length;  a++) {
        var b = stroke[a];
        Context.strokeStyle = b.color;
        Context.lineWidth = b.bsize;
        Context.beginPath();
        Context.moveTo(b.points[0].x, b.points[0].y);
        for (var c = 0; c < b.points.length; c++) {
            var d = b.points[c];
            Context.lineTo(d.x, d.y);
        }
        Context.stroke();
    }
}

function init () {
    can = $('#draw');
    can.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    Context = can[0].getContext('2d');

    function mouseEvent (evt) {
        brush.x = evt.pageX;
        brush.y = evt.pageY;

        current_Stroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
    }

    can.mousedown(function (evt) {
        brush.down = true;

        current_Stroke = {
            color: brush.color,
            bsize: brush.bsize,
            points: [],
        };

        stroke.push(current_Stroke);

        mouseEvent(evt);
    }).mouseup(function (evt) {
        brush.down = false;

        mouseEvent(evt);

        current_Stroke = null;
    }).mousemove(function (evt) {
        if (brush.down)
            mouseEvent(evt);
    });

  
    $('#savebutton').click(function () {
        window.open(can[0].toDataURL()); 
    });

    $('#undobutton').click(function () {
        stroke.pop();
        redraw();
    });

    $('#clearbutton').click(function () {
        stroke = [];
        redraw();
    });

    $('#colorpicker').on('input', function () {
        brush.color = this.value;
    });

    $('#brushsize').on('input', function () {
        brush.bsize = this.value;
    });
}

$(init);

