// Verificação de login 
let sessao = JSON.parse(sessionStorage.getItem("sessao"));
if (!sessao || sessao.nivel == "user") {
    window.location.href = "rental.html";
}

// referencias aos elementos do HTML
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
const btLimpar = document.getElementById("btLimpar");
const btSair = document.getElementById("btSair");
const inDisponivel = document.getElementById("inDisponivel");
const divDisponivel = document.getElementById("divDisponivel");
// Adicionando eventos aos botões
btCadastrar.addEventListener("click", (event) => cadastrar(event));
btDeletar.addEventListener("click", (event) => deletar(event));
btEditar.addEventListener("click", (event) => editar(event));
btLimpar.addEventListener("click", (event) => {
    event.preventDefault();
    limpar(event);
});
// Ocultando o checkbox de disponibilidade do apartamento
divDisponivel.style.display = "none";
btSair.addEventListener("click", deslogar);
// Função para cadastrar apartamento
function cadastrar(event) {

    event.preventDefault();
    let cadastroAp = {
        numero: Number(inNumero.value),
        valor: Number(inPreco.value),
        comodos: inComodos.value,
        incluso: inIncluso.value,
        negociacao: rdNegociacao[0].checked ? rdNegociacao[0].value : rdNegociacao[1].value,
        cidade: rdCidade[0].checked ? rdCidade[0].value : rdCidade[1].value,
        situacao: "disponivel"
    };
    console.log(cadastroAp);
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
        if (flag) { // ---> Com a flag false, isso nunca será executado!
            vetApartamentos.push(cadastroAp);
            localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
            outSaida.textContent = `Apartamento número ${cadastroAp.numero} cadastrado com sucesso!`;
        }
    }
}
// Função para deletar apartamento
function deletar(event) {
    event.preventDefault();
    // ferificaçoes se o numero do apartamento no qual o usuario quer deletar foi preenchido corretamente
    let numero = Number(inNumero.value);
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
        if (flag) {
            outSaida.innerHTML = `O apartamento numero ${numero} não foi encontrado`;
            inNumero.focus();
        } else {
            outSaida.innerHTML = `O apartemento numero ${numero} foi deletado com sucesso!`;
            localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
        }
    }

}
// Função para editar apartamento
function editar(event) {
    event.preventDefault();
    let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos"));
    let numero = Number(inNumero.value);
    if (inNumero.value == "") {
        outSaida.innerHTML = "Para editar um apartamento é necessario informar o numero do apartamento";
        inNumero.focus();
    } else {
        let flag = true;
        let ap;
        for (let ind = 0; ind < vetApartamentos.length; ind++) {
            if (vetApartamentos[ind].numero == numero) {
                ap = vetApartamentos[ind];
                flag = false;
            }
        }
        if (flag) {
            outSaida.innerHTML = `O apartamento numero ${numero} não foi encontrado!`;
            inNumero.focus();
        } else {
            if (btEditar.innerHTML == "Editar Apartamento") {
                inNumero.disabled = true;
                //campos de input 
                inPreco.value = ap.valor;
                inComodos.value = ap.comodos;
                inIncluso.value = ap.incluso;
                //campos radio button 
                ap.negociacao == "venda" ? rdNegociacao[0].checked = true : rdNegociacao[1].checked = true;
                ap.cidade == "Santa Teresa" ? rdCidade[0].checked = true : rdCidade[1].checked = true;
                btLimpar.disabled = true;
                btCadastrar.disabled = true;
                btDeletar.disabled = true;
                divDisponivel.style.display = "block";
                btEditar.innerHTML = "Confirmar edição";
            } else {
                let edicao = {
                    numero: Number(inNumero.value),
                    valor: Number(inPreco.value),
                    comodos: inComodos.value,
                    incluso: inIncluso.value,
                    negociacao: rdNegociacao[0].checked ? rdNegociacao[0].value : rdNegociacao[1].value,
                    cidade: rdCidade[0].checked ? rdCidade[0].value : rdCidade[1].value,
                    situacao:inDisponivel.checked ? "disponivel" : "indisponivel",
 
                };
                inDisponivel.checked ? edicao.situacao = "disponivel" : "";
                for (let ind = 0; ind < vetApartamentos.length; ind++) {
                    if (vetApartamentos[ind].numero == numero) {
                        vetApartamentos[ind] = edicao;
                    }
                }
                localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
                outSaida.innerHTML = `O apartamento numero ${numero} foi editado com sucesso!`;
                btEditar.innerHTML = "Editar Apartamento";
                inNumero.disabled = false;
                btLimpar.disabled = false;
                btCadastrar.disabled = false;
                btDeletar.disabled = false;
                divDisponivel.style.display = "none";
                limpar();
            }
        }
    }
}
// Função para limpar campos
function limpar(event) {
    // event.preventDefault();
    inNumero.value = "";
    rdCidade[0].checked = false;
    rdCidade[1].checked = false;
    rdNegociacao[0].checked = false;
    rdNegociacao[1].checked = false;
    inPreco.value = "";
    inIncluso.value = "";
    inComodos.value = "";
    inNumero.disabled = false;
    outSaida.innerHTML = "Campos limpos!";
}
// Função para deslogar
function deslogar() {
    sessionStorage.removeItem("sessao");
    window.location.href = "login.html";
}