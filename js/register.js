//referencias dos elementos do formulário
const inNome = document.getElementById("inNome");
const inCpf = document.getElementById("inCpf");
const inEmail = document.getElementById("inEmail");
const inTelefone = document.getElementById("inTelefone");
const inNascimento = document.getElementById("inNascimento");
const inSenha = document.getElementById("inSenha");
const rdGenero = document.getElementsByName("rdGenero");
const rdNivel = document.getElementsByName("rdNivel");
const cheTermo1 = document.getElementById("termo1");
const cheTermo2 = document.getElementById("termo2");
const cheTermo3 = document.getElementById("termo3");
const btCadastrar = document.getElementById("btCadastrar");
const outSaida = document.getElementById("outSaida");

// Escutar evento do botão de cadastro
btCadastrar.addEventListener("click", (event) => cadastrar(event));

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
    // Verifica se os campos estão preenchidos
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
        // Verifica se o gênero e o nível foram selecionados
    } else if (rdGenero[0].checked == true) {
            saida = "Selecione um gênero";
    } else if (rdNivel[0].checked == true) {
        saida = "Selecione um nível";
    }
    // Verifica se os termos foram aceitos
    else if (!cheTermo1.checked || !cheTermo2.checked) {
        cadastro.termos = false;
        saida = "Aceite pelo menos, os dois primeiros termos para criar conta.";
    } else {
        cadastro.nivel = rdNivel[1].checked == true ? "user" : "admin";
        cadastro.genero = rdGenero[1].checked == true ? "Masculino" : "Feminino";
        let flag = true;
        let cadastros = localStorage.getItem("vetCadastros") == null ? [] : JSON.parse(localStorage.getItem("vetCadastros"));
        for (let ind = 0; cadastros.length > ind && flag; ind++) {
            let cadastroLs = cadastros[ind];

            if (cadastroLs.cpf == inCpf.value) {
                saida = `${cadastroLs.nome} já está ${cadastro.genero == "Masculino" ? "registrado" : "registrada"
                    }!`;
                flag = false;
            }
        }
        // Se o cpf não estiver cadastrado, adiciona o novo cadastro ao local storage
        if (flag) {
            cadastro.comunicacao = cheTermo3.checked ? true : false;
            console.log(cadastro);
            console.log(cadastros);
            cadastros.push(cadastro);
            localStorage.setItem("vetCadastros", JSON.stringify(cadastros));
            saida = `Parabéns ${cadastro.nome}, você foi ${cadastro.genero == "Masculino" ? "registrado" : "registrada"
                } com sucesso`
            window.location.href = "login.html"
        }
    }
    outSaida.innerHTML = saida;
}




