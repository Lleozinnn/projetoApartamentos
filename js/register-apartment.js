const inNumero = document.getElementById("inNumero");
const rdCidade = document.getElementsByName("cidade");
const inPreco = document.getElementById("inPreco");
const inIncluso = document.getElementById("inIncluso");
const inComodos = document.getElementById("inComodos");
const rdNegociacao = document.getElementsByName("negociacao");
const btCadastrar = document.getElementById("btCadastrar");
const outSaida = document.getElementById("outSaida");
const btDeletar = document.getElementById("btdeletar");
const btEditar = document.getElementById("btEditar");

btCadastrar.addEventListener("click", (event) => cadastrar(event));
btDeletar.addEventListener("click", (event) => deletar(event));
btEditar.addEventListener("click", (event) => editar(event));

function cadastrar(event) {
    event.preventDefault();
    let cadastroAp = {
        numero: Number(inNumero.value),
        valor: Number(inPreco.value),
        comodos: inComodos.value,
        incluso: inIncluso.value,
        negociacao: rdNegociacao.value,
        cidade: rdCidade.value,

    }
    if (inNumero.value == "" || inPreco.value == "" || inComodos.value == "" || inIncluso.value == "") {
        if (inNumero.value == "") {
            inNumero.focus();
            outSaida.textContent = "Preencha o campo número";
        } else if (inPreco.value == "") {
            inPreco.focus();
            outSaida.textContent = "Preencha o campo preço";
        } else if (inComodos.value == "") {
            inComodos.focus();
            outSaida.textContent = "Preencha o campo cômodos";
        } else if (inIncluso.value == "") {
            inIncluso.focus();
            outSaida.textContent = "Preencha o campo incluso como por exemplo: água, luz, internet";
        }
    } else if (rdNegociacao[0].checked == false && rdNegociacao[1].checked == false) {
        outSaida.textContent = "Selecione o tipo de negociação";
    } else if (rdCidade[0].checked == false && rdCidade[1].checked == false) {
        outSaida.textContent = "Selecione a cidade";
    } else {
        let flag = true;
        let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos")) || [];
        for (let ind = 0; ind < vetApartamentos.length; ind++) {
            let ap = vetApartamentos[ind];
            if (ap.numero == cadastroAp.numero) {
                outSaida.textContent = `Apartamento número ${cadastroAp.numero} já cadastrado`;
                flag = false;
            }

        }
        if (flag) {
            vetApartamentos.push(cadastroAp);
            localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
            outSaida.textContent = `Apartamento número ${cadastroAp.numero} cadastrado com sucesso!`;
        }
    }
}
function deletar(event) {
    event.preventDefault();
    // ferificaçoes se o numero do apartamento no qual o usuario quer deletar foi preenchido corretamente
    let numero = Number(inNumero.value)
    if (inNumero.value == "") {
        outSaida.innerHTML = "Para deletar um apartamento é necessario informar o numero do apartamento."
    } else {
        let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos"));
        let flag = true;
        for (let ind = 0; ind < vetApartamentos.length; ind++) {
            if (vetApartamentos[ind].numero == numero) {
                vetApartamentos.splice(ind, 1);
                flag = false;
            }
        }
        console.log(vetApartamentos);
        if(flag){
            outSaida.innerHTML = `O apartamento numero ${numero} não foi encontrado`
            inNumero.focus();
        }else{
            outSaida.innerHTML = `O apartemento numero ${numero} foi deletado com sucesso!`
            localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
        }
    }

}
function editar (event){
    event.preventDefault();
    let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos"));
    let numero = Number(inNumero.value)
    if(inNumero.value == ""){
        outSaida.innerHTML = "Para editar um apartamento é necessario informar o numero do apartamento"
        inNumero.focus();
    }else{
        let flag = true;
        let ap ;
        for(let ind = 0; ind < vetApartamentos.length; ind++){
            if(vetApartamentos[ind].numero == numero){
                ap = vetApartamentos[ind]
                flag = false;
            }
        }
        if(flag){
            outSaida.innerHTML = `O apartamneto numero ${numero} não foi encontrado!`
            inNumero.focus(); 
        }else{
            inNumero.disabled = true;
            //campos de input 
            inPreco.value = ap.valor;
            inComodos.value = ap.comodos;
            inIncluso.value = ap.incluso;
            //campos radio button 
            ap.negociacao == "venda" ? rdNegociacao[0].checked = true : rdNegociacao[1].checked = true;
            ap.cidade == "Santa Teresa" ? rdCidade[0].checked = true : rdCidade[1].checked = true;

        }
    }
}

