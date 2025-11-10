// Selecionar a Seção About
const about = document.querySelector('#about');

// Selecionar o formulário
const formulario = document.querySelector('#formulario');

// Expressão Regular para validação de e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

// Função para buscar os dados no GitHub
async function getApiGithub(){

    try{

        // PASSO 01: Fazer uma Requisição GET para a API do GitHub
        const dadosPerfil = await fetch('https://api.github.com/users/nicollyjesus');

        // PASSO 02: Converter a Resposta da API para JSON
        const perfilJson = await dadosPerfil.json();
        

        // PASSO 03: Criar o HTML/CSS com os dados do Perfil

        let conteudo = `
        
            <!-- FOTO DO PERFIL -->
            <figure class="about_image">
                <img
                    src="${perfilJson.avatar_url}"
                    alt="Foto do perfil do GitHub - ${perfilJson.name}."
                >
            </figure>

            <!-- CONTEÚDO DO PERFIL -->
            <article class="about_content">

                <h2>Sobre mim</h2>
                <p>Sou engenheira de software full stack, moro em São Paulo, apaixonada por tecnologia, música e por tudo que envolve criar soluções que gerem impacto real. Tenho experiência atuando com desenvolvimento back-end e front-end, utilizando tecnologias como Java 11+, Spring Boot, APIs RESTful, microsserviços e arquitetura distribuída. </p>
                <p>Sou entusiasta de boas práticas de engenharia de software, testes automatizados, observabilidade com Datadog e integração com serviços em nuvem como AWS. </p>
                <p>Fora do trabalho, compartilho meus dias com três gatos e duas ratas twister, que tornam minha rotina ainda mais divertida. Acredito que cultivar interesses fora da área técnica,  explorar novas ideias e cuidar dos meus bichinhos, é essencial para manter a criatividade e o entusiasmo sempre vivos.</p>

                <div class="about_stats">
                    <a href="${perfilJson.html_url}" target="_blank" class="botao">Ver GitHub</a>
                    
                    <!-- Faltou esta div para alinhar os cards -->
                    <div class="stats-wrapper">
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.followers}</p>
                            <p class="stat-label">Seguidores</p>
                        </div>
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.public_repos}</p>
                            <p class="stat-label">Repositórios</p>
                        </div>
                    </div>

                </div>
            </article>

        `

        //PASSO 04: Adicionar o HTML dentro da Seção About

        about.innerHTML += conteudo;

    }catch(error){
        console.error(error);
    }
}

// Função de envio e validação do formulário
formulario.addEventListener('submit', function(event) {
    
    // Impedir o envio automático do formulário
    event.preventDefault();

    // Validação do campo nome
    const campoNome = document.querySelector('#nome');
    const txtNome = document.querySelector('#txtNome');

    // Nome precisa ter no minimo 3 caracteres
    if(campoNome.value.length < 3){
        txtNome.innerHTML = 'O Nome deve ter no mínimo 3 caracteres.';
        campoNome.focus();
        return;
    }else{
        txtNome.innerHTML = '';
    }

    // Validação do campo e-mail
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#txtEmail');

    // Verifica se o e-mail é válido
    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = 'Digite um e-mail válido.';
        campoEmail.focus();
        return;
    }else{
        txtEmail.innerHTML = '';
    }

     // Validação do campo assunto
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto = document.querySelector('#txtAssunto');

    // Assunto precisa ter no minimo 5 caracteres
    if(campoAssunto.value.length < 5){
        txtAssunto.innerHTML = 'O Assunto deve ter no mínimo 5 caracteres.';
        campoAssunto.focus();
        return;
    }else{
        txtAssunto.innerHTML = '';
    }

    // Se passou por todas as validações, envia o formulário
    formulario.submit();
})

// Chamar a função getAPIGithub()

getApiGithub();