let open = 0

function openModal() {
    if (open == 0) {
        document.querySelector('.modal').style.display = 'flex'

        open = 1
    }
    else {
        document.querySelector('.modal').style.display = 'none'
        open = 0
    }
}

function addTicker(event) {
    event.preventDefault()

    const ticker = event.target.ticker.value
    const bolsa = event.target.bolsa.value
    let valor = event.target.valor.value
    let valorini = event.target.valorini.value
    const ativos = event.target.ativos.value



    valor = valor.replace(",", ".")

    if (valor.split(".")[1]?.length == 0) {
        valor += ".00"
    }
    else {
        valor = Number(valor).toFixed(2)
    }

    valorini = valorini.replace(",", ".")

    if (valorini.split(".")[1]?.length == 0) {
        valorini += ".00"
    }
    else {
        valorini = Number(valorini).toFixed(2)
    }


    let saldo = valor - valorini
    console.log(saldo)

    if (saldo > 0) {
        saldo = "positive"
        var cardmid = `
                    <div class="cmid">
                        <h1>Valor atual: <b style="color: var(--accent);">U$  ${valor} ↑</b> </h1>

                        <h2>Valor inicial: U$${valorini}</h2>
                    </div>
        `
    }
    else {
        if (saldo < 0) {
            saldo = "negative"
            var cardmid = `
                    <div class="cmid">
                        <h1>Valor atual: <b style="color: #9e2f2f;">U$ ${valor} ↓</b> </h1>

                        <h2>Valor inicial: U$${valorini}</h2>
                    </div>
        `
        }
        else {
            saldo = "neutral"
            var cardmid = `
                    <div class="cmid">
                        <h1>Valor atual: <b>U$ ${valor} --</b> </h1>

                        <h2>Valor inicial: U$${valorini}</h2>
                    </div>
        `
        }
    }








    let total = Number(ativos) * valor
    total = total.toString()

    if (total.split(".")[1]?.length == 0) {
        total += ".00"
    }
    else {
        total = Number(total).toFixed(2)
    }





    const cardtop = `
                <div class="card">
                    <div class="ctop ${saldo}">
                        <h2>#1. ${ticker}</h2>
                            <h2> ${bolsa}</h2>
                    </div>
`

    const cardbot = `
                    <div class="cbot">
                        <h2>Total investido (qtd.):</h2>
                        <h2>U$${total} (${ativos}x)</h2>
                    </div>

                </div>
    `

    const card = cardtop + cardmid + cardbot

    console.log(bolsa)

    if (bolsa != "null") {
    let cardlist = document.querySelector('#cardcontainer').innerHTML
    cardlist += card

    document.querySelector('#cardcontainer').innerHTML = cardlist
    openModal()
    document.getElementById('adderror').style.display = 'none'
    }

    else {
        document.getElementById('adderror').style.display = 'flex'
    }
}

