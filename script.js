

/* Al cargar el script, detecta que haya transacciones en
el localStorage, si no las hay, no hace nada para evitar error,
si las hay las convierte de JSON String a objeto y las mete
en el array transacciones.
*/

var transacciones = JSON.parse(localStorage.getItem("operetas")) || [];


//Funcion que imprime en el HTML las transacciones guardadas en el array
function printListado(){
    var listado = transacciones.map(function(bar){
        return '<li>Importe: '+bar.importe+' Moneda: '+bar.moneda+'</li>'
      })
      document.getElementById("listado").innerHTML = listado;
    
}
printListado();

//Funcion que vacía transacciones en localStorage y en el array
function clear(){
    localStorage.clear();
    transacciones.splice(0,transacciones.length)
    console.log("Historial borrado correctamente")
    printListado();
}


//************************************************************************
// IMPORTAMOS DESDE EL HTML

//Traemos input donde ingresamos cantidad a convertir
let input = document.getElementById("input");
//Traemos el string donde imprimiremos conversion
let pesos = document.getElementById("pesos");
//variable de input de moneda.
let moneda = document.getElementById("moneda");
//Traemos boton submit
let submit = document.getElementById("button");
//Traemos boton clearTrans
let clearTrans = document.getElementById("clearTrans");
//************************************************************************


//FUNCION QUE REALIZA LA CONVERSION DE MONEDA
function valor(size){
 let importe = size;
 let monedaValue;
 switch(moneda.value){
    case 'dolar':
        monedaValue = 200.50;
        break;
    case 'euro':
        monedaValue = 234.50;
        break;
    case 'real':
        monedaValue = 52;
        break;
    case 'guarani':
        monedaValue = 0.029;
        break;
  } 
  let conversion = importe * monedaValue;
  pesos.innerText = conversion;
}

// Cuando hay entrada llama funcion valor con parametro ingresado
input.oninput = () => {valor(input.value)};
moneda.oninput = () => {valor(input.value)};
//Al presionar el boton de borrar, llama la funcion clear()
clearTrans.onclick = () => {clear()};
// Al presionar el boton submit, llama a la funcion whenSubmit()
submit.onclick  = () => {whenSubmit()}



//Funcion que agrega al array y al localstorage cuando es llamada los
//datos de conversion, e imprime el array en el HTML.
function whenSubmit(){
    transacciones.push({'importe': input.value , 'moneda': moneda.value});
    aLocalStorage = JSON.stringify(transacciones);
    localStorage.setItem("operetas",aLocalStorage);
    printListado();
}