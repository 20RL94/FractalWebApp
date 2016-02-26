Palette = function() {
    this.colors65 = [
        "rgb(255, 255, 255)", //  0 weiß
        "rgb(112, 219, 147)", //  1 aquamarin
        "rgb(50, 204, 153)", //  2 mittel-aquamarin
        "rgb(0, 0, 0)", //  3 schwarz
        "rgb(0, 0, 255)", //  4 blau
        "rgb(95, 159, 159)", //  5 kadettenblau
        "rgb(66, 66, 11)", //  6 kornblumenblau
        "rgb(107, 35, 142)", //  7 dunkelblau
        "rgb(191, 216, 216)", //  8 hellblau
        "rgb(143, 143, 188)", //  9 hellstahlblau
        "rgb(50, 50, 204)", // 10 mittelblau
        "rgb(47, 47, 79)", // 11 mitternachtsblau
        "rgb(35, 35, 142)", // 12 marineblau
        "rgb(50, 153, 204)", // 13 himmelblau
        "rgb(0, 127, 255)", // 14 blau
        "rgb(35, 107, 142)", // 15 stahlblau
        "rgb(255, 127, 0)", // 16 koralle
        "rgb(0, 255, 255)", // 17 cyan
        "rgb(142, 35, 35)", // 18 ziegelrot
        "rgb(165, 42, 42)", // 19 braun
        "rgb(204, 127, 50)", // 20 gold
        "rgb(219, 219, 112)", // 21 gold
        "rgb(234, 234, 127)", // 22 mittelgold
        "rgb(0, 255, 0)", // 23 grün
        "rgb(47, 79, 47)", // 24 dunkelgrün
        "rgb(79, 79, 47)", // 25 dunkelolivgrün
        "rgb(35, 142, 35)", // 26 waldgrün
        "rgb(50, 204, 50)", // 27 grün
        "rgb(107, 142, 35)", // 28 mittelwaldgrün
        "rgb(66, 111, 66)", // 29 mittelmeergrün
        "rgb(127, 255, 0)", // 30 mittelquellgrün
        "rgb(143, 188, 143)", // 31 blaugrün
        "rgb(35, 142, 107)", // 32 meergrün
        "rgb(0, 255, 127)", // 33 quellgrün
        "rgb(153, 204, 50)", // 34 gelbgrün
        "rgb(47, 79, 79)", // 35 dunkelgrün
        "rgb(84, 84, 84)", // 36 schwachgrau
        "rgb(168, 168, 168)", // 37 hellgrau
        "rgb(192, 192, 192)", // 38 grau
        "rgb(159, 159, 95)", // 39 khaki
        "rgb(255, 0, 255)", // 40 magenta
        "rgb(142, 35, 107)", // 41 maroon
        "rgb(204, 50, 50)", // 42 orange
        "rgb(219, 112, 219)", // 43 orchidee
        "rgb(153, 50, 204)", // 44 dunkelorchidee
        "rgb(147, 112, 219)", // 45 mittelorchidee
        "rgb(188, 143, 143)", // 46 pink
        "rgb(234, 173, 234)", // 47 kirsch
        "rgb(255, 0, 0)", // 48 rot
        "rgb(79, 47, 47)", // 49 indianerrot
        "rgb(219, 112, 147)", // 50 mittelvioletrot
        "rgb(255, 0, 127)", // 51 orangerot
        "rgb(204, 50, 153)", // 52 violetrot
        "rgb(11, 66, 66)", // 53 lachs
        "rgb(142, 107, 135)", // 54 sienna
        "rgb(219, 147, 112)", // 55 gelgbraun
        "rgb(216, 191, 216)", // 56 distel
        "rgb(173, 234, 234)", // 57 türkis
        "rgb(112, 147, 219)", // 58 dunkeltürkis
        "rgb(112, 219, 219)", // 59 mitteltürkis
        "rgb(79, 47, 79)", // 60 violet
        "rgb(159, 95, 159)", // 61 blauviolet
        "rgb(216, 216, 191)", // 62 weizen
        "rgb(255, 255, 0)", // 63 gelb
        "rgb(147, 219, 112)" // 64 grüngelb
    ];

    this.colors256 = [];

    i = 0;
    for (; i < 64; i++) {
        this.colors256[i] = "rgb(" + (i*4) + "," + (255-i*4) + "," + (i*4) + ")";
    }
    for (i = 64; i < 128; i++) {
        this.colors256[i] = "rgb(" + (255-(i-64)*4) + ", 0, 255)";
    }
    for (i = 128; i < 192; i++) {
        this.colors256[i] = "rgb(0," + ((i-128)*4) + "," + (255-(i-128)*4)+ ")";
    }
    for (i = 192; i < 256; i++) {
        this.colors256[i] = "rgb(" + ((i-192)*4) + "," + (255-(i-192)*4) + ", 0)";
    }
}
