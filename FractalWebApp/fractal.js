var mouseStart;
var isDragging = false;
var picture;
$(document).ready(function () {
    $("#refresh").click(function () {
        var maxiteration = parseInt($("#iter_count").val(), 10);
        var maxabs = parseInt($("#abs").val(), 10);

        var painting = new Fractal($("#fractal")[0], maxiteration, maxabs);
        picture = painting.setBounds(-2.5, 4, -1.5, 3);
    });
});

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

window.setInterval(function () {
    var clock = new Clock(new Date());
    $("#date").html("<b>" + clock.getDateString() + "</b>");
    $("#time").html("<b>" + clock.getTimeString() + "</b>");
}, 1000);

function fillControls(canvas,painting) {
    for (var i=200;i<=1000;i+=100) {
        $("select")
            .append($("<option>" + i + "</option>"));
    }
    $("#width").change(function () {
        canvas.width = $(this).val();
        painting.paint();
    });

    $("#height").change(function () {
        canvas.width = $(this).val();
        painting.paint();
    });
    for (var i = 50; i <= 250; i+=25) {
        $("<tr><td>" + i + "</td></tr>")
            .appendTo($("table tbody"))
            .hover(function () {
                $(this).css({"background-color": "lightblue","cursor": "pointer"})
            },function(){
                $(this).css("background-color", "")
            })
            .click(function(){
                painting.maxiteration = parseInt($(this).text());
                painting.paint();
            });
    }
    
   
    
}

$(function () {
   
    var canvasObj = $("#fractal");
    var canvas = canvasObj.get(0);
    var painting = new Fractal(canvas, 100, 50);
    fillControls(canvas,painting);

    picture = painting.setBounds(-2.5, 4, -1.5, 3);

   canvasObj.mousedown(function (event) {
        mouseStart = getMousePos(canvas, event);
        isDragging = true;
    });

    canvasObj.mousemove(function (event) {
        if (isDragging) {
            var ctx = canvas.getContext("2d");
            var mousePos = getMousePos(canvas, event);
            ctx.putImageData(picture, 0, 0);
            ctx.strokeRect(mouseStart.x, mouseStart.y,
                            mousePos.x - mouseStart.x,
                            mousePos.y - mouseStart.y);
        }
    });
    canvasObj.mouseup(function (event) {
        if (isDragging) {
            var mousePos = getMousePos(canvas, event);
            var start = painting.toComplex(mouseStart.x, mouseStart.y);
            var end = painting.toComplex(mousePos.x, mousePos.y);
            picture = painting.setBounds(start.real, end.real - start.real,
                                start.imag, end.imag - start.imag);
            isDragging = false;
        }
    });
});




var Complex = function (real, imag) {
    this.real = real;
    this.imag = imag;
    this.add = function (c) {
        return new Complex(this.real + c.real, this.imag + c.imag);
    }
    this.mult = function (c) {
        return new Complex(this.real * c.real - this.imag * c.imag,
                           this.real * c.imag + this.imag * c.real);
    }
    this.abs = function () {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
}

var Fractal = function (canvas, iter, abs) {
    this.canvas = canvas;
    this.maxiteration = iter;
    this.maxabs = abs;

    this.calculate = function (c) {
        var x = new Complex(0, 0);
        var y = new Complex(0,0);
        var z = new Complex(0,0);
        var cnt = 0;
        for (; cnt < this.maxiteration && x.abs() < this.maxabs; cnt++) {
           
          
            x = x.mult(x).add(c);
            
          
      
           
        }
        return cnt;
    }

    // Koordinatentransformation
    this.toComplex = function (x, y) {
        var cr = this.minreal + x * this.sizereal / this.canvas.width;
        var ci = this.minimag + this.sizeimag - y * this.sizeimag / this.canvas.height;
        return new Complex(cr, ci);
    }

    this.paint = function () {
        var pallette = new Palette();
        var ctx = canvas.getContext("2d");
        for (var x = 0; x < this.canvas.width; x++) {
            for (var y = 0; y < this.canvas.height; y++) {
                var c = this.toComplex(x, y);
                var nr = this.calculate(c);
                var color = pallette.colors256[nr];
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        return ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    this.setBounds = function (minreal, sizereal, minimag, sizeimag) {
        this.minreal = minreal;
        this.sizereal = sizereal;
        this.minimag = minimag;
        this.sizeimag = sizeimag;
        return this.paint();
    }
}