const inCpf = document.getElementById("inCpf");
const inSenha = document.getElementById("inSenha");
const btEntrar = document.getElementById("btEntrar");

btEntrar.addEventListener("click", (event)=> entrar(event));

function entrar (event){
    event.preventDefault();
    if(inCpf.value == "" || inSenha.value == ""){
        alert("Preencha os dois campos")
        inCpf.value == "" ? inCpf.focus() : inSenha.focus();
    }else{
        let cadastros = JSON.parse(localStorage.getItem("vetCadastros"));
        console.log(cadastros);
        for(let ind = 0; cadastros.length > ind; ind++){
            let cadastro = cadastros[ind];
            if(cadastro.cpf == inCpf.value && cadastro.senha == inSenha.value){
                console.log("acheiiiiiiiiiiiiiiiiiiiii")
                localStorage.setItem("sessao", JSON.stringify(cadastro));
                console.log(localStorage);
            }
      }
    }
}



