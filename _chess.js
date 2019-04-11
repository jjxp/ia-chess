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

var posiblesMovimientos = function(color) {
    var movimientos = [];

    if (color !== "Blancas" && color !== "Negras") {
        console.error("Error - Color de piezas no reconocido");
    } else {
        var colorRival = color === "Blancas" ? "Negras" : "Blancas";

        // Movimiento peones
        $("div .Peon" + color).each(function (i) {
            var posicion = this.id;

            var letra = posicion.substr(0, 1);
            var numero = parseInt(posicion.substr(1, 1));

            // Si todavía no se ha movido, permitir dar dos pasos
            if ((color === "Blancas" && posicion.endsWith("2")) || (color === "Negras" && posicion.endsWith("7"))) {
                nuevoNumero = color === "Blancas" ? numero + 2 : numero - 2;
                nuevaPosicion = letra + toString(nuevoNumero);
                movimientos.push([posicion, nuevaPosicion]);
            }

            // Si no tengo ninguna pieza delante, permitir mover un paso siempre que no me salga del tablero
            var nuevoNumero = color === "Blancas" ? numero + 1 : numero - 1;

            if (nuevoNumero >= 1 && nuevoNumero <= 8) {
                nuevaPosicion = letra + toString(nuevoNumero);
                if ($("#" + nuevaPosicion).attr("class").split(" ").length <= 2) {
                    // Si no he llegado al final, movimiento normal
                    if (nuevoNumero !== 1 || nuevoNumero !== 8) {
                        movimientos.push([posicion, nuevaPosicion]);
                    } else {
                        // Si he llegado al final, permite convertir el peón en Reina, Torre, Alfil o Caballo
                        var piezasConvertir = ["Reina", "Torre", "Alfil", "Caballo"];
                        for (var i = 0; i < piezasConvertir.length; i++) {
                            movimientos.push([posicion, nuevaPosicion, piezasConvertir[i]]);
                        }
                    }
                }
            }

            // Si encuentro una pieza enemiga en una diagonal inmediata, permitir comer
            nuevoNumero = nuevoNumero;
            var letras = ["a", "b", "c", "d", "e", "f", "g", "h"];
            var posLetra = letras.indexOf(letra);

            if (posLetra >= 1) {
                var nuevaLetra = letras[posLetra - 1];
                var nuevaPosicion = nuevaLetra + toString(nuevoNumero);
                if ($("#" + nuevaPosicion + "[class$='" + colorRival + "']").length == 1) {
                    movimientos.push([posicion, nuevaPosicion]);
                }
            }

            if (posLetra < 8) {
                var nuevaLetra = letras[posLetra + 1];
                var nuevaPosicion = nuevaLetra + toString(nuevoNumero);
                if ($("#" + nuevaPosicion + "[class$='" + colorRival + "']").length == 1) {
                    movimientos.push([posicion, nuevaPosicion]);
                }
            }

            // Comer al paso
        });
    }

    return movimientos;
}

var posicion = {
    "a8" : "TorreNegras",
    "b8" : "CaballoNegras",
    "c8" : "AlfilNegras",
    "d8" : "ReinaNegras",
    "e8" : "ReyNegras",
    "f8" : "AlfilNegras",
    "g8" : "CaballoNegras",
    "h8" : "TorreNegras",
    "a7" : "PeonNegras",
    "b7" : "PeonNegras",
    "c7" : "PeonNegras",
    "d7" : "PeonNegras",
    "e7" : "PeonNegras",
    "f7" : "PeonNegras",
    "g7" : "PeonNegras",
    "h7" : "PeonNegras",
    "a1" : "TorreBlancas",
    "b1" : "CaballoBlancas",
    "c1" : "AlfilBlancas",
    "d1" : "ReinaBlancas",
    "e1" : "ReyBlancas",
    "f1" : "AlfilBlancas",
    "g1" : "CaballoBlancas",
    "h1" : "TorreBlancas",
    "a2" : "PeonBlancas",
    "b2" : "PeonBlancas",
    "c2" : "PeonBlancas",
    "d2" : "PeonBlancas",
    "e2" : "PeonBlancas",
    "f2" : "PeonBlancas",
    "g2" : "PeonBlancas",
    "h2" : "PeonBlancas"
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