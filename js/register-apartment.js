const inNumero = document.getElementById("inNumero");
const inCidade = document.getElementById("inCidade");
const inPreco = document.getElementById("inPreco");
const inIncluso = document.getElementById("inIncluso");
const inComodos = document.getElementById("inComodos");
const sltNegociacao = document.getElementById("sltNegociacao");
const inIncluso = document.getElementById("inIncluso");
const btnCadastrar = document.getElementById("btnCadastrar");
const outSaida = document.getElementById("outSaida");

btnCadastrar.addEventListener("click", (event) => cadastrar(event));

function cadastrar(event) {
    event.preventDefault();
    let cadastrov ={
        numero:inNumero.value,
        valor:inPreco.value,
        comodos:inComodos.value,
        incluso:inIncluso.value,
    } 
}