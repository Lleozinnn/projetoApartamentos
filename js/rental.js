const outAp = document.getElementById("outAp");
// Criação da lista de apartamentos disponiveis. Já feito pelo Léo 

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
    let  precoTratado = preco.split("-");
    let situacao = "disponivel";

    precoMin = precoTratado[0];
    precoMax = precoTratado[1];
    
    for(let ind = 0; ind < vetApartamentos.length; ind++){
        let ap = vetApartamentos[ind];
        if(ap.cidade == cidade && ap.valor <= precoMax && ap.valor >= precoMin && ap.situacao == situacao){
            apEncontrado.push(ap);
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
            <p><strong>Cidade:</strong>${ap.cidade}</p>
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
        </div>
        <button>Ver detalhes</button>
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
exibirAp(filtrar());

