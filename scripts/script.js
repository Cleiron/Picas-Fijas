function AbrirCerrarMenu() {
    $(".desplegable").toggle("slide")
}

function generarceldas() {
    tabla = ""
    for (i=0; i<9; i++) {
        tabla += '<div class="fila" id="fila'+i+'">'
        for (j=0; j<4; j++) {
            tabla+='<div id="'+i+'_'+j+'" class="celda"></div>'
        }
        tabla += '<div class="celda celda_f" id="f'+i+'"></div><div class="celda celda_p" id="p'+i+'"></div></div>'
    }
    document.getElementById("tabla").innerHTML=tabla;
}

var num = []
var fila = 0
var pos = 0
var intento = []

function juego() {
    //generar numero random de 4 cifras no repetidas
    num.push(parseInt(Math.random()*9))
    for (j=0;j<3;j++) {
    while (true) {
        n = parseInt(Math.random()*9)
        rep = false //asumo falso
        for (i=0; i<num.length;i++) {
            if (n==num[i]) rep = true 
        }
        if (rep==false) {num.push(n); break;}
    }}
    //
    fila = 0
    pos = 0
}

function obtenerTiempo() {
    tiempo = new Date()
    aux = tiempo.getDate()+'/'+(tiempo.getMonth()+1)+'/'+tiempo.getFullYear()+' '+tiempo.getHours() + ":" + tiempo.getMinutes() + ":" + tiempo.getSeconds()
    return aux
}

function guardarResultado(info) {
    console.log(info)
    if (localStorage.getItem("puntuaciones") == null) {
        primerentrada = []
        primerentrada[0] = info
        localStorage.setItem("puntuaciones", JSON.stringify(primerentrada))
    } else {
        entrada = obtenerResultado()
        entrada.push(info)
        localStorage.setItem("puntuaciones", JSON.stringify(entrada))
    }
}

function obtenerResultado() {
    return JSON.parse(localStorage.getItem("puntuaciones"))
}

function puntuaciones() {
    if (localStorage.getItem("puntuaciones") == null) {
        document.getElementById("puntuaciones").innerHTML='<p>No hay puntuaciones</p>'
    } else {
        info = obtenerResultado()
        codigotabla = "<table><th>Momento</th><th>Resultado</th><th>Nro</th><th>Intentos</th>"
        for (let i=0; i<info.length; i++) {
            if (info[i][1]=="Acertado") {
                codigotabla+='<tr><td>'+info[i][0]+'</td><td>'+info[i][1]+'</td><td>'+info[i][2]+'</td><td>'+info[i][3]+'</td></tr>'
            } else {
                codigotabla+='<tr><td>'+info[i][0]+'</td><td>'+info[i][1]+'</td><td>'+info[i][2]+'</td><td>-</td></tr>'
            }
        }
        codigotabla+="</table>"
        document.getElementById("puntuaciones").innerHTML=codigotabla
    }
}

function comprobar(intento) {
    picas = 0
    fijas = 0
    for (let i=0; i<4; i++) {
        for (let j=0; j<4; j++) {
            if (num[i]==intento[j]) {
                if (i==j) fijas++; else picas++;
                break
            }
        }
    }
    document.getElementById('p'+fila).innerText=picas
    document.getElementById('f'+fila).innerText=fijas
    document.getElementById('fila'+(fila+1)).style.animation="0.6s giroenx linear 1"
    if (fijas==4) {
        tiempo = obtenerTiempo()
        document.getElementById('resultado').innerText="Acertaste!"
        document.getElementById('mensaje').innerText="Numero acertado: "+num[0]+num[1]+num[2]+num[3]+". Intentos: "+(fila+1)
        document.getElementById('fin').showModal()
        document.getElementById('fin').style.display="flex"
        guardarResultado([tiempo,'Acertado',''+num[0]+num[1]+num[2]+num[3],fila+1])
    }
    if ((fila==8)&&(fijas!=4)) {
        tiempo = obtenerTiempo()
        document.getElementById('resultado').innerText="Casi!"
        document.getElementById('mensaje').innerText="Numero objetivo: "+num[0]+num[1]+num[2]+num[3]+"."
        document.getElementById('fin').showModal()
        document.getElementById('fin').style.display="flex"
        guardarResultado([tiempo,'Fallido',''+num[0]+num[1]+num[2]+num[3]])
    }
}

function ingresa(str) {
    if ((str=="b")&&(pos>0)) {
        pos--
        document.getElementById(fila+'_'+pos).innerText=''
        document.getElementById('n'+intento.pop()).style.display="flex"
        return false
    }
    if (str=="b") return false
    if ((str=="ok")&&(intento.length==4)) {
        comprobar(intento)
        for (let i=0; i<4; i++) {
            pos--
            document.getElementById('n'+intento.pop()).style.display="flex"
        }
        fila++
        return true
    }
    if (str=="ok") return false

    if (intento.length==4) return false
    str=parseInt(str)

    if (intento.length == 0) {
        intento.push(str)
    } else {
        for (let i=0; i<intento.length;i++) {
            if (str==intento[i]) return false 
        }
        intento.push(str)
    }
    document.getElementById('n'+str).style.display="None"
    switch (str) {
        case 0: document.getElementById(fila+'_'+pos).innerText='0';
        break;
        case 1: document.getElementById(fila+'_'+pos).innerText='1';
        break;
        case 2: document.getElementById(fila+'_'+pos).innerText='2';
        break;
        case 3: document.getElementById(fila+'_'+pos).innerText='3';
        break;
        case 4: document.getElementById(fila+'_'+pos).innerText='4';
        break;
        case 5: document.getElementById(fila+'_'+pos).innerText='5';
        break;
        case 6: document.getElementById(fila+'_'+pos).innerText='6';
        break;
        case 7: document.getElementById(fila+'_'+pos).innerText='7';
        break;
        case 8: document.getElementById(fila+'_'+pos).innerText='8';
        break;
        case 9: document.getElementById(fila+'_'+pos).innerText='9';
        break;
    }
    if (pos<4) pos++

}

//animaciones
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });