let open = 0

function openModal(){
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
    const valor = event.target.valor.value
    const ativos = event.target.ativos.value

    const total = Number(ativos) * Number(valor)

    const card = `
                <div class="card">
                    <div class="ctop positive">
                        <h2>#1. ${ticker}</h2>
                            <h2> ${bolsa}</h2>
                    </div>

                    <div class="cmid">
                        <h1>Valor atual: <b style="color: var(--accent);">U$  ${valor} ↑</b> </h1>

                        <h2>Valor inicial: U$200,00</h2>
                    </div>

                    <div class="cbot">
                        <h2>Total investido (qtd.):</h2>
                        <h2>U$ ${total} (${ativos}x)</h2>
                    </div>

                </div>
    
    `
    let cardlist = document.querySelector('#cardcontainer').innerHTML
    cardlist += card
    document.querySelector('#cardcontainer').innerHTML = cardlist
    openModal()
}

