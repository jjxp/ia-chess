var generarTablero = function() {
    var tablero = $("#tablero");
    var mapping_i = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var color = "blanca";

    for(var j = 8; j >= 1; j--) {
        for(var i = 0; i < 8; i++) {
            var casilla;
            var clear;

            clear = i === 0 ? "clear:left" : "";

            casilla = '<div id="' + mapping_i[i] + j + '" class="casilla ' + color + '" style="' + clear + '"></div>';

            color = color === "negra" ? "blanca" : "negra";

            if(i == 7) {
                color = color === "negra" ? "blanca" : "negra";
            }

            tablero.append(casilla);
        }
    }
};

var colocarPiezas = function(posicion) {
    for(var key in posicion) {
        $("#" + key).addClass(posicion[key]);
    }
}

var posicion = {
    "a8" : "TorreNegra",
    "b8" : "CaballoNegro",
    "c8" : "AlfilNegro",
    "d8" : "ReinaNegra",
    "e8" : "ReyNegro",
    "f8" : "AlfilNegro",
    "g8" : "CaballoNegro",
    "h8" : "TorreNegra",
    "a7" : "PeonNegro",
    "b7" : "PeonNegro",
    "c7" : "PeonNegro",
    "d7" : "PeonNegro",
    "e7" : "PeonNegro",
    "f7" : "PeonNegro",
    "g7" : "PeonNegro",
    "h7" : "PeonNegro",
    "a1" : "TorreBlanca",
    "b1" : "CaballoBlanco",
    "c1" : "AlfilBlanco",
    "d1" : "ReinaBlanca",
    "e1" : "ReyBlanco",
    "f1" : "AlfilBlanco",
    "g1" : "CaballoBlanco",
    "h1" : "TorreBlanca",
    "a2" : "PeonBlanco",
    "b2" : "PeonBlanco",
    "c2" : "PeonBlanco",
    "d2" : "PeonBlanco",
    "e2" : "PeonBlanco",
    "f2" : "PeonBlanco",
    "g2" : "PeonBlanco",
    "h2" : "PeonBlanco"
}

generarTablero();

colocarPiezas(posicion);

$(".casilla").click(function(e) {

    if($(".selected").length) {
        var selectedId = $(".selected").attr("id");
        var piezaSeleccionada = $(".selected").attr('class').split(/\s+/)[2];

        if($(this).attr('class').split(/\s+/).length == 3) {
            $(this).removeClass($(this).attr('class').split(/\s+/)[2]);
        }

        $(this).addClass(piezaSeleccionada);

        $(".selected").removeClass(piezaSeleccionada);
        $(".selected").removeClass("selected");
    } else {
        $(this).addClass("selected");
    }
});