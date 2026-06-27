//referencias dos elementos do formulário
const inNome = document.getElementById("inNome");
const inCpf = document.getElementById("inCpf");
const inEmail = document.getElementById("inEmail");
const inTelefone = document.getElementById("inTelefone");
const inNascimento = document.getElementById("inNascimento");
const inSenha = document.getElementById("inSenha");
const rdGenero = document.getElementsByName("genero");
const cheTermo1 = document.getElementById("termo1");
const cheTermo2 = document.getElementById("termo2");
const cheTermo3 = document.getElementById("termo3");
const btnCadastrar = document.getElementById("btnCadastrar");
const outSaida = document.getElementById("outSaida");

// Escutar evento do botão de cadastro
btnCadastrar.addEventListener("click", (event) => cadastrar(event));

// Criar função que efetua o cadastro no local storage
function cadastrar(event) {
    event.preventDefault();
    let cadastro = {
        nome: inNome.value,
        cpf: inCpf.value,
        email: inEmail.value,
        telefone: inTelefone.value,
        nascimento: inNascimento.value,
        senha: inSenha.value,
        
    };
    let saida = "";
    if (inNome.value == "" || inCpf.value == "" || inEmail.value == "" || inTelefone.value == "" || inNascimento.value == "" || inSenha.value == "") {
        if (inNome.value == "") {
            inNome.focus();
            saida = "Preencha o campo nome";
        } else if (inCpf.value == "") {
            inCpf.focus();
            saida = "Preencha o campo CPF";
        } else if (inEmail.value == "") {
            inEmail.focus();
            saida = "Preencha o campo email";
        } else if (inTelefone.value == "") {
            inTelefone.focus();
            saida = "Preencha o campo telefone";
        } else if (inNascimento.value == "") {
            inNascimento.focus();
            saida = "Preencha o campo nascimento";
        } else if (inSenha.value == "") {
            inSenha.focus();
            saida = "Preencha o campo senha";
        }

    } else if (rdGenero[0].checked == true) {
        saida = "Selecione um gênero";
    } else {
        cadastro.genero = rdGenero[1].checked == true ? "Masculino" : "Feminino";
    }
    if (!cheTermo1.checked && !cheTermo2.checked) {
        cadastro.termos = true;
    } else {
        let flag = true;
        let cadastros = localStorage.getItem("vetCadastros") == null ? [] : JSON.parse(localStorage.getItem("vetCadastros"));
        for (let ind = 0; cadastros.length > ind && flag; ind++) {
            let cadastroLs = cadastros[ind];
            
            if (cadastroLs.cpf == inCpf.value) {
                saida = `${cadastroLs.nome} já está ${
                cadastro.genero == "Masculino" ? "registrado" : "registrada"
            }!`
                flag = false;
            }
        }
        if (flag) {
            cadastro.comunicacao = cheTermo3.checked ? true : false;
            console.log(cadastro);
            console.log(cadastros);
            cadastros.push(cadastro);
            localStorage.setItem("vetCadastros", JSON.stringify(cadastros));
            saida = `Parabéns ${cadastro.nome}, você foi ${
                cadastro.genero == "Masculino" ? "registrado" : "registrada"
            } com sucesso`
        }

    }
    outSaida.innerHTML = saida;
}




