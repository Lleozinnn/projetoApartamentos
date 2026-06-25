//referencias dos elementos do formulário
const inNome = document.getElementById("inNome");
const inCpf = document.getElementById("inCpf");
const inEmail = document.getElementById("inEmail");
const inTelefone = document.getElementById("inTelefone");
const inNascimento = document.getElementById("inNascimento");
const inSenha = document.getElementById("inSenha");
const rdGenero = document.getElementById("genero");
const cheTermo1 = document.getElementById("termo1");
const cheTermo2 = document.getElementById("termo2");
const cheTermo3 = document.getElementById("termo3");
const btnCadastrar = document.getElementById("btnCadastrar");

// Escutar evento do botão de cadastro
btnCadastrar.addEventListener("click",cadastrar());

// Criar função que valida os campos do formulario 

// Criar função que efetua o cadastro no local storage
