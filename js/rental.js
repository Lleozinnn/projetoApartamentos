// Criação da lista de apartamentos disponiveis. Já feito pelo Léo 

// Receber dados da URL para definir as opçoes que se encaixam com o perfil do usuario.

const params = new URLSearchParams(window.location.search);
const localidade = params.get("localidade")

// Recebendo lista de objetos do local storage.

let vetApartamentos = JSON.parse(localStorage.getItem("vetApartamentos"));

// Função que realiza filtragem das preferencias do usuarios com os apartamentos disponiveis.

function filtrar (){
    let apEncontrado = [];
    for(let ind = 0; ind < vetApartamentos.length; ind++){
        console.log("aqui")
        let ap = vetApartamentos[ind];
        if(ap.cidade == cidade && ap.valor <= precoMax && ap.valor >= precoMin && ap.situacao == situacao){
            apEncontrado.push(ap);
        }
    }
    return apEncontrado;
}

console.log(filtrar());

// Função de mostrar os apartamentos filtrados para usuario.

// Função para criar os cards dos apartamentos.

