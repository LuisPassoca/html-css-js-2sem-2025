let open = 0
let opencards = 0

function deleteCard(event) {
    event.target.closest('.card').remove()
    opencards = 0
}

function showBTN(event) {
    
    if (opencards == 0) {
        event.target.querySelector('.enx').style.display = 'flex'
        opencards = 1
    }
    else {
        event.target.querySelector('.enx').style.display = 'none'
        opencards = 0
    }
}

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


    //Converte as casas decimais do número digitado e as adiciona caso não informadas
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

    //Define a cor do card e o símbolo de acordo com o valor
    let saldo = valor - valorini
    let color = ""
    let symbol = ""

    if (saldo > 0) {
        saldo = "positive"
        color = "var(--accent)"
        symbol = "↑"
    }
    else {
        if (saldo < 0) {
            saldo = "negative"
            color = "#9e2f2f"
            symbol = "↓"
            
        }
        else {
            saldo = "neutral"
            symbol = "--"
        }
    }

    //Cálculo de ativos
    let total = Number(ativos) * valor
    total = total.toString()

    if (total.split(".")[1]?.length == 0) {
        total += ".00"
    }
    else {
        total = Number(total).toFixed(2)
    }

    //Define a estrutura do card
    const card = `
                <div class="card" onmouseleave="showBTN(event)" onmouseenter="showBTN(event)">
                    <div class="ctop ${saldo}">
                        <h2>#1. ${ticker}</h2>
                            <h2> ${bolsa}</h2>
                    </div>

                <div class="cmid">
                        <h1>Valor atual: <b style="color: ${color};">U$ ${valor} ${symbol}</b> </h1>

                        <h2>Valor inicial: U$${valorini}</h2>
                </div>

                <div class="cbot">
                        <h2>Total investido (qtd.):</h2>
                        <h2>U$${total} (${ativos}x)</h2>
                </div>

                <div class="enx"> 
                        <button type="button" onclick="">Editar</button>
                        <button type="button" onclick="deleteCard(event)">Excluir</button>    
                </div>
    `

    //Adiciona o card à lista e fecha o modal
    let cardlist = document.querySelector('#cardcontainer').innerHTML
    cardlist += card

    document.querySelector('#cardcontainer').innerHTML = cardlist
    openModal()
}
