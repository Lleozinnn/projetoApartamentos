// Verifica se o usuário está logado, caso não esteja, redireciona para a página de login.
let sessao = JSON.parse(sessionStorage.getItem("sessao"))
if (!sessao) {
    window.location.href = "login.html";
}
// Referenciação de elementos
const outAp = document.getElementById("outAp");
const btSair = document.getElementById("btSair");
btSair.addEventListener("click", deslogar);
outAp.addEventListener("click", (event) => alugar(event));
// Receber dados da URL para definir as opçoes que se encaixam com o perfil do usuario.

const params = new URLSearchParams(window.location.search);
const cidade = params.get("localidade");
const negociacao = params.get("negociacao");
const preco = params.get("preco");

// Recebendo lista de objetos do local storage.

let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos"));

// Função que realiza filtragem das preferencias do usuarios com os apartamentos disponiveis.

function filtrar (){
    let apEncontrado = [];
    let precoMax, precoMin;
    let precoTratado = !preco || preco == "todos" ? "todos" : preco.split("-");
    let modoProcura = precoTratado == "todos" ? "todos" : "preco";
    precoMin = precoTratado[0];
    precoMax = precoTratado[1];
    // Percorre o vetor de apartamentos e verifica se o apartamento se encaixa com as preferencias do usuario.
    for(let ind = 0; ind < vetApartamentos.length; ind++){
        let ap = vetApartamentos[ind];
        if(modoProcura == "preco" && ap.negociacao == negociacao && ap.cidade == cidade && ap.valor <= precoMax && ap.valor >= precoMin && ap.situacao == "disponivel"){
            apEncontrado.push(ap);
        } else if (modoProcura == "todos" && ap.situacao == "disponivel" && ap.negociacao == negociacao) {
            apEncontrado.push(ap);
        } else {
            !negociacao ? apEncontrado.push(ap) : "";
        }
    }
    apEncontrado.length == 0 ? outAp.innerHTML = "<p>Nenhum apartamento foi encontrado</p>" : "";
    return apEncontrado;
}

// Função de mostrar os apartamentos filtrados para usuario.
function criarCard (ap){
    let card = `
    <div class="card">
        <img
            src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
            alt="Apartamento">
        <div class="card-conteudo">
            <span class="tag">${ap.negociacao}</span>
            <h2>Apartamento #${ap.numero}</h2>
            <p class="valor">R$ ${ap.valor.toFixed(2)}</p>
            <div class="infos">
                <p><strong>Cidade:</strong> ${ap.cidade}</p>
                <p>
                    <strong>Cômodos: ${ap.comodos}</strong><br>
                </p>
                <p>
                    <strong>Incluso: ${ap.incluso}</strong><br>
                </p>
                <p>
                    <strong>Situação:</strong>
                    <span class="status">${ap.situacao}</span>
                </p>
                <button class="btAlugar" data-id="${ap.numero}" ${ap.situacao == "disponivel" ? "" : "disabled"} >${ap.situacao == "disponivel" ? "Negociar este!" : "Ooops! Indisponível. "}</button>
            </div>
        </div>
    </div>
    `;
    return card;
}
 
// Função para criar os cards dos apartamentos.
function exibirAp(apartamentos){
    for(let ind = 0; apartamentos.length > ind; ind++){
        let ap = apartamentos[ind];
        outAp.innerHTML += criarCard(ap);
    }
}
// Função para trocar o estado de um apartamento de disponivel para indisponivel
function alugar(event) {
    let elemento = event.target;
    if(elemento.className == "btAlugar"){
        let numero = elemento.getAttribute("data-id");
        let vetAp = JSON.parse(localStorage.getItem("vetApartamentos"));
        let flag = true;
        for(let ind = 0; ind < vetAp.length && flag; ind++){
            let ap = vetAp[ind];
            if(ap.numero == numero){
                ap.situacao = "indisponivel";
                vetAp[ind] = ap;
                flag = false;
                localStorage.setItem("vetApartamentos",JSON.stringify(vetAp));
            }
        }
        location.reload(); 

    }
}
// Função para desfazer login do usuário
function deslogar () {
    sessionStorage.removeItem("sessao");
    window.location.href = "login.html";
}
exibirAp(filtrar());

