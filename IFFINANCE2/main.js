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

function openModal(modalId) {
    if (open == 0) {
        document.querySelector(modalId).style.display = 'flex'

        open = 1
    }
    else {
        document.querySelector(modalId).style.display = 'none'
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

    //Dá um ID aleatório pro card e adiciona 1 caso esse ID já exista
    let idcard = 1 //Math.floor(Math.random() * 10000)
    while (document.getElementById(idcard)) {
        idcard += 1
    }

    //Define a estrutura do card
    const card = `
                <div class="card" id="${idcard}" onmouseleave="showBTN(event)" onmouseenter="showBTN(event)">
                    <div class="ctop ${saldo}">
                        <h2>#1. <span class="cticker">${ticker}</span></h2>
                            <h2><span class="cbolsa">${bolsa}</span></h2>
                    </div>

                <div class="cmid">
                        <h1>Valor atual: <b style="color: ${color};">U$ <span class="cvalor">${valor}</span> ${symbol}</b> </h1>

                        <h2>Valor inicial: U$<span class="cvalorini">${valorini}</span></h2>
                </div>

                <div class="cbot">
                        <h2>Total investido (qtd.):</h2>
                        <h2>U$<span class="ctotal">${total}</span> (<span class="cativos">${ativos}</span>x)</h2>
                </div>

                <div class="enx"> 
                        <button type="button" onclick="openEditCard(event)">Editar</button>
                        <button type="button" onclick="deleteCard(event)">Excluir</button>    
                </div>
    `

    //Adiciona o card à lista e fecha o modal
    let cardlist = document.querySelector('#cardcontainer').innerHTML
    cardlist += card

    document.querySelector('#cardcontainer').innerHTML = cardlist
    openModal('#add')

    //Reseta o formulário de enviar o card
    document.getElementById('ticker').value = ""
    document.getElementById('bolsa').value = "null"
    document.getElementById('valorini').value = ""
    document.getElementById('valor').value = ""
    document.getElementById('ativos').value = ""
}


function editTicker(event) {
    event.preventDefault()
    const selcardbyid = document.getElementById(idcard.value)



    selcardbyid.querySelector('.cticker').innerText = document.getElementById('editticker').value
    selcardbyid.querySelector('.cbolsa').innerText = document.getElementById('editbolsa').value
    selcardbyid.querySelector('.cvalorini').innerText = document.getElementById('editvalorini').value
    selcardbyid.querySelector('.cvalor').innerText = document.getElementById('editvalor').value
    selcardbyid.querySelector('.cativos').innerText = document.getElementById('editativos').value

    //Calculo do valor total e adição de casas decimais
    let total = Number(document.getElementById('editativos').value) * document.getElementById('editvalor').value
    total = total.toString()

    if (total.split(".")[1]?.length == 0) {
        total += ".00"
    }
    else {
        total = Number(total).toFixed(2)
    }

    selcardbyid.querySelector('.ctotal').innerText = total
    

    openModal('#edit')
}

function openEditCard(event) {
    const selcard = event.target.closest('.card')

    document.getElementById('idcard').value = selcard.id
    document.getElementById('editticker').value = selcard.querySelector('.cticker').innerText
    document.getElementById('editbolsa').value = selcard.querySelector('.cbolsa').innerText
    document.getElementById('editvalorini').value = selcard.querySelector('.cvalorini').innerText
    document.getElementById('editvalor').value = selcard.querySelector('.cvalor').innerText
    document.getElementById('editativos').value = selcard.querySelector('.cativos').innerText
    

    console.log(idcard.value)
    openModal('#edit')
}