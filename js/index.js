// Referencias aos elementos do HTML
const sltNegociacao = document.getElementById("sltNegociacao");
const sltPreco = document.getElementById("sltPreco");

// Adicionando evento ao select de negociação
sltNegociacao.addEventListener("change", () => {
  faixaPreco(sltNegociacao.value);
});

// Lista de objeto com 20 apartamentos. Insere no localStorage, assim que a página index é carregada sob algumas condições
const vetApartamentos = [
  {
    "numero": 1,
    "negociacao": "venda",
    "valor": 100000,
    "comodos": "1 sala, 3 quartos, 2 banheiros, 1 varanda, 1 cozinha, 1 área de serviço",
    "incluso": "Água, Luz, Internet",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 2,
    "negociacao": "aluguel",
    "valor": 1500,
    "comodos": "1 sala, 1 quarto, 1 banheiro, 1 cozinha",
    "incluso": "Condomínio, Internet",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 3,
    "negociacao": "venda",
    "valor": 250000,
    "comodos": "1 sala, 2 quartos, 2 banheiros, 1 cozinha, 1 área de serviço",
    "incluso": "Gás encanado",
    "situacao": "indisponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 4,
    "negociacao": "aluguel",
    "valor": 2200,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 varanda, 1 cozinha",
    "incluso": "Água, Internet",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 5,
    "negociacao": "venda",
    "valor": 450000,
    "comodos": "1 sala ampla, 3 quartos (1 suíte), 3 banheiros, 1 varanda gourmet, 1 cozinha",
    "incluso": "Segurança 24h, Academia",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 6,
    "negociacao": "aluguel",
    "valor": 1200,
    "comodos": "1 quarto/sala, 1 banheiro, 1 cozinha americana",
    "incluso": "Água, Luz",
    "situacao": "indisponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 7,
    "negociacao": "venda",
    "valor": 180000,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 cozinha",
    "incluso": "Nenhum",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 8,
    "negociacao": "aluguel",
    "valor": 3100,
    "comodos": "1 sala, 3 quartos, 2 banheiros, 1 vaga de garagem, 1 cozinha",
    "incluso": "Condomínio, IPTU, Água",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 9,
    "negociacao": "venda",
    "valor": 320000,
    "comodos": "1 sala, 2 quartos (1 suíte), 2 banheiros, 1 cozinha, 1 área de serviço",
    "incluso": "Internet, Gás",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 10,
    "negociacao": "aluguel",
    "valor": 1800,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 cozinha",
    "incluso": "Luz, Internet",
    "situacao": "indisponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 11,
    "negociacao": "venda",
    "valor": 600000,
    "comodos": "2 salas, 4 quartos (2 suítes), 4 banheiros, 2 varandas, 1 cozinha planejada",
    "incluso": "Condomínio, Área de Lazer",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 12,
    "negociacao": "aluguel",
    "valor": 2500,
    "comodos": "1 sala, 2 quartos, 2 banheiros, 1 varanda, 1 cozinha",
    "incluso": "Água, Gás",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 13,
    "negociacao": "venda",
    "valor": 135000,
    "comodos": "1 sala, 1 quarto, 1 banheiro, 1 cozinha",
    "incluso": "Nenhum",
    "situacao": "indisponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 14,
    "negociacao": "aluguel",
    "valor": 950,
    "comodos": "1 quarto, 1 banheiro, 1 cozinha pequena",
    "incluso": "Internet",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 15,
    "negociacao": "venda",
    "valor": 210000,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 cozinha, 1 vaga de garagem",
    "incluso": "Água",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 16,
    "negociacao": "aluguel",
    "valor": 4000,
    "comodos": "1 sala ampla, 3 quartos (2 suítes), 3 banheiros, 1 varanda, 1 cozinha",
    "incluso": "Todos os serviços do condomínio",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 17,
    "negociacao": "venda",
    "valor": 850000,
    "comodos": "1 sala de estar, 1 sala de jantar, 4 quartos (3 suítes), 5 banheiros, Cozinha, DCE",
    "incluso": "Portaria 24h, Limpeza",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 18,
    "negociacao": "aluguel",
    "valor": 1650,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 cozinha",
    "incluso": "Condomínio, Gás",
    "situacao": "indisponivel",
    "cidade": "Santa Maria de Jetibá"
  },
  {
    "numero": 19,
    "negociacao": "venda",
    "valor": 115000,
    "comodos": "1 sala, 2 quartos, 1 banheiro, 1 cozinha",
    "incluso": "Nenhum",
    "situacao": "disponivel",
    "cidade": "Santa Teresa"
  },
  {
    "numero": 20,
    "negociacao": "aluguel",
    "valor": 5500,
    "comodos": "1 sala integrada, 2 suítes, 2 banheiros, 1 varanda estendida, Cozinha gourmet",
    "incluso": "Internet Fibra, Limpeza Semanal",
    "situacao": "disponivel",
    "cidade": "Santa Maria de Jetibá"
  }
];

let apartamentos = localStorage.getItem("vetApartamentos");

// Se não estiver, define-o.
if (!apartamentos) {
    localStorage.setItem("vetApartamentos",JSON.stringify(vetApartamentos));
}

// Definindo faixa de preco de acordo com a modalidade de negociacão escolhida.
function faixaPreco (negociacao){
  sltPreco.innerHTML = `<option value="todos"  selected>Todos</option>`;
  if(negociacao == 'aluguel'){
    // Min 950 Max 5500
    for(let ind = 950; ind < 5500; ind += 500){
      let max = ind + 500;
      let opt = `<option value="${ind}-${max}">${ind} - ${max}</option>`;
      sltPreco.innerHTML += opt;
    }
  }else{
    // Min 100.000 Max 850.000
    for(let ind = 100000; ind < 850000; ind += 50000){
      let max = ind + 50000;
      let opt = `<option value="${ind}-${max}">${ind} - ${max}</option>`;
      sltPreco.innerHTML += opt;
    }
  }
}


