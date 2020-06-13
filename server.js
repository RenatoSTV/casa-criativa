// usei o express para cirar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

// const ideas = [
//    
//     {
//         img:"https://image.flaticon.com/icons/svg/2729/2729048.svg",
//         title:"Recortes",
//         category:"Criatividade",
//         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar pretium libero.",
//         url:"https://rocketseat.com.br"
//     },
// ]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar o uso de req.body
server.use(express.urlencoded({extended: true}))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criei uma rota "/"
// e capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no .get /!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return res.render("index.html", { ideas: lastIdeas })

    })


})

server.get("/ideias", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no .get /ideas!")
        }

        const reversedIdeas = [...rows].reverse()
    
        return res.render("ideias.html", { ideas: reversedIdeas })
    })

})

server.post("/", function(req,res){
    // Inserir dado na tabela
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no .post /!")
        }

        return res.redirect("/ideias")
    })

})

// Liguei meu servidor na porta 3000
server.listen(3000)