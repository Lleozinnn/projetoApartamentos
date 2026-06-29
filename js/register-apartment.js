const inNumero = document.getElementById("inNumero");
const RdCidade = document.getElementsByName("cidade");
const inPreco = document.getElementById("inPreco");
const inIncluso = document.getElementById("inIncluso");
const inComodos = document.getElementById("inComodos");
const rdNegociacao = document.getElementsByName("negociacao");
const btnCadastrar = document.getElementById("btnCadastrar");
const outSaida = document.getElementById("outSaida");

btnCadastrar.addEventListener("click", (event) => cadastrar(event));

function cadastrar(event) {
    event.preventDefault();
    let cadastroAp = {
        numero: inNumero.value,
        valor: inPreco.value, // Correção: transformar para number
        comodos: inComodos.value,
        incluso: inIncluso.value,
        negociacao: rdNegociacao.value,
        cidade: RdCidade.value,

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
    } else if (RdCidade[0].checked == false && RdCidade[1].checked == false) {
        outSaida.textContent = "Selecione a cidade";
    }else {
        let flag = true;
        let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos")) || [];
        for (let ind = 0; ind < vetApartamentos.length; ind++) {
            let ap = vetApartamentos[ind];
            if (ap.numero == cadastroAp.numero) {
                flag = false; // ---> Define a flag como false dentro do bloco if, apenas se o cadastro existir.
                outSaida.textContent = `Apartamento número ${cadastroAp.numero} já cadastrado`;  
            }
            // flag = false;  ---> Flag fica "false" independente da condição
            console.log("aqui")
        }
        if (flag) { // ---> Com a flag false, isso nunca será executado!
            vetApartamentos.push(cadastroAp);
            localStorage.setItem("vetApartamentos", JSON.stringify(vetApartamentos));
            outSaida.textContent = `Apartamento número ${cadastroAp.numero} cadastrado com sucesso!`;
        }
    }
}

