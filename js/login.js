// Verifica se o usuário já está logado
let sessao = JSON.parse(sessionStorage.getItem("sessao"))
if (!(sessao == null)) {
    window.location.href = sessao.nivel == "user" ? "rental.html" : "apartment.html";
}
// Referencias aos elementos do HTML
const inCpf = document.getElementById("inCpf");
const inSenha = document.getElementById("inSenha");
const btEntrar = document.getElementById("btEntrar");
const outSaida = document.getElementById("outSaida");

btEntrar.addEventListener("click", (event) => entrar(event));
// Função para entrar no sistema
function entrar(event) {
    event.preventDefault();
    let saida;
    // Verifica se os campos estão preenchidos
    if (inCpf.value == "" || inSenha.value == "") {
        saida = "Preencha os dois campos";
        inCpf.value == "" ? inCpf.focus() : inSenha.focus();
    
    } else {
        // Verifica se o usuário está cadastrado
        let flag = true
        let cadastros = JSON.parse(localStorage.getItem("vetCadastros"));
        for (let ind = 0; cadastros.length  > ind && flag; ind++) {
            let cadastro = cadastros[ind];
            // Verifica se o cpf informado está cadastrado e se a senha está correta
            if (cadastro.cpf == inCpf.value) {
                flag = false
                if (cadastro.senha == inSenha.value) {
                    sessionStorage.setItem("sessao", JSON.stringify(cadastro))
                    window.location.href = cadastro.nivel == "user" ? "rental.html?preco=todos" : "apartment.html";
                }
                else {
                    saida = "A senha informada está incorreta";
                }
            }
        }
        saida = flag ? "O cpf informado ainda não foi cadastrado": saida ;
    }
    outSaida.innerHTML = saida;
}



