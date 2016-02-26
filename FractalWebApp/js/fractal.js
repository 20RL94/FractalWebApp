
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

window.setInterval(function () {
    var clock = new Clock(new Date());
    document.getElementById("date").innerHTML = "<b>" + clock.getDateString() + "</b>";
    document.getElementById("time").innerHTML = "<b>" + clock.getTimeString() + "</b>";
},1);

window.onload = function () {
  

    var canvas = document.getElementById("fractal");
    var painting = new Fractal(canvas);
    picture = painting.setBounds(-2.5, 4, -1.5, 3);

    canvas.addEventListener("mousedown", function (event) {
        mouseStart = getMousePos(canvas, event);
        isDragging = true;
    });

    canvas.addEventListener("mousemove", function (event) {
        if (isDragging) {
            var ctx = canvas.getContext("2d");
            var mousePos = getMousePos(canvas, event);
            ctx.putImageData(picture,0,0);
            ctx.strokeRect(mouseStart.x, mouseStart.y,
                          mousePos.x - mouseStart.x,
                          mousePos.y - mouseStart.y);
        }
    });

    canvas.addEventListener("mouseup", function (event) {
        if (isDragging) {
            var mousePos = getMousePos(canvas, event);
            var start = painting.toComplex(mouseStart.x, mouseStart.y);
            var end = painting.toComplex(mousePos.x, mousePos.y)
            picture=painting.setBounds(start.real, end.real - start.real,
                               start.imag, end.imag - start.imag);
            isDragging = false;
        }
    });

    //painting.paint;
    //window.onkeypress = function (event) {
    //    if (event.keyCode == 0) {
    //        // normale Taste
    //        if (event.charCode == 43) // +
    //            painting.zoomin();
    //        else if (even.charCode == 45) // -
    //            painting.zoomout();
    //    }
    //    else {
    //        painting.translate(event.keyCode);
    //    }

    //}
};

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
    this.abs = function (c) {
        return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
}

var Fractal = function (canvas) {
    this.canvas = canvas;
    this.maxiteration = 64;
    this.maxabs = 50;

    this.calculate = function (c) {
        var x = new Complex(0, 0);
        var cnt = 0;
        for (; cnt < this.maxiteration && x.abs() < this.maxabs; cnt++)
            x = x.mult(x).add(c);
        return cnt;
    }

    // Koordinatentransformation
    this.toComplex = function (x, y) {
        var cr = this.minreal + x * this.sizereal / this.canvas.width;
        var ci = this.minimag + this.sizeimag - y * this.sizeimag / this.canvas.height;
        return new Complex(cr, ci);
    }

    this.paint = function () {
        var palette = new Palette();
        var ctx = canvas.getContext("2d");
        for (var x = 0; x < this.canvas.width; x++)
            for (var y = 0; y < this.canvas.height; y++) {
                var c = this.toComplex(x, y);
                var nr = this.calculate(c);
                var color = palette.colors65[nr]; // 256
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
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

    // this.setBounds(-2.5, 4, -1.5, 3);
}
