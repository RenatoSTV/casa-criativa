// usei o express para cirar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title:"Cursos de Programação",
        category:"Estudo",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title:"Exercícios",
        category:"Saúde",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title:"Meditação",
        category:"Mentalidade",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title:"Karaokê",
        category:"Diversão em Familia",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729038.svg",
        title:"Pintura",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
    {
        img:"https://image.flaticon.com/icons/svg/2729/2729048.svg",
        title:"Recortes",
        category:"Criatividade",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
        url:"https://rocketseat.com.br"
    },
]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// configuração do nunjucks
const nunjucks= require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criei uma rita "/"
// e capturo o pedido do cliente para responder
server.get("/", function(req, res){

    const reversedIdeas = [...ideas].reverse()
    let lastIdeas = []
    for (let idea of reversedIdeas){
        if (lastIdeas.length < 2){
            lastIdeas.push(idea)
        }
    }

    return res.render("index.html", {ideas: lastIdeas})
})

server.get("/ideias", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", {ideas: reversedIdeas})
})

// Liguei meu servidor na porta 3000
server.listen(3000)