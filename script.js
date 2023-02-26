const form = document.querySelector('form')
const player1Name = document.getElementById('player1')
const player2Name = document.getElementById('player2')
const input = document.querySelector('input')
const button = document.querySelector('button')
const loginPage = document.querySelector('#form')
const main = document.querySelector('.main')
const key = document.querySelectorAll('[data-key]')
const board = document.querySelector('[data-board]')
const winningTextMessage = document.querySelector('[data-winning-text]')
const winningMain = document.querySelector('.winning-main')
const restartBtn = document.querySelector('[data-restart-btn]')
const restartPlayerBtn = document.querySelector('[data-restart-players-btn]')

let isCircleTurn = false

// Combinações de vitória
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]

// Validação dos nomes dos players para iniciar o jogo
const validateInput = ({target}) => {
  if (target.value.length > 2) {
    button.removeAttribute('disabled')
    return
  }
    button.setAttribute('disabled', '')
}

input.addEventListener('input', validateInput)

// Função que vê se uma sequência específica de células marcadas batem com alguma sequência pré definida de vitória
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combinations) => {
    return combinations.every((index) => { // O every está vendo se em cada posição do array (winningCombinations) tem a marcação de um player específico
      return key[index].classList.contains(currentPlayer) // Ex: Na key [posição 0], tem o X? Sim... na key [posição 1] tem X? Sim... na key [posição 2], tem o X? Sim... então retorna true
    }) // Key está sendo puxado pelo querySelectorAll, funcionando como um array, por isso podemos observar as posições independentementes
  })
}

// Função que vê se todas as células tem a classe X ou Circle... caso sim, da empate
const checkForDraw = () => {
  return [...key].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('circle')
  })
}

// Função para adicionar a classe na célula ( classe que será definida posteriormente )
const handleMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd)
}

// Função para mudar a classe, assim mudando de turno
const swapTurn = () => {
  isCircleTurn = !isCircleTurn
  board.classList.remove('circle')
  board.classList.remove('x')

  if (isCircleTurn) {
    board.classList.add('circle')
  } else {
    board.classList.add('x')
  }
}

// Funcionamento do jogo em si
const handleClick = (ev) => {
  const cell = ev.target
  const classToAdd = isCircleTurn ? 'circle' : 'x'

  // Colocar X ou Círculo
  handleMark(cell, classToAdd)

  // Verificar por vitória ou Empate
  const isWin = checkForWin(classToAdd)
  const isDraw = checkForDraw()
  if (isWin) {
    endGame(false)
  } else if (isDraw) {
    endGame(true)
  } else {
  // Mudar símbolo
  swapTurn()
  }
}

// Função que finaliza o jogo, verificando se a função de empate é verdadeira, se sim... exibe a mensagem de empate, se não, verifica quem ganhou e mostra a mensagem para o jogador
const endGame = (isDraw) => {
  if (isDraw) {
    winningTextMessage.innerText = "Empate!"
  } else {
    winningTextMessage.innerText = isCircleTurn ? player2Name.value + ' venceu!' : player1Name.value + ' venceu!'
  }
  winningMain.style.display = 'flex';
  main.style.display = 'none';
}

// Função para iniciar o jogo, após clicar em 'JOGAR'
function startGame() {
  if (player1Name.value !== "" && player2Name.value !== "") {
    loginPage.style.display = 'none';
    main.style.display = 'grid';
    winningMain.style.display = 'none';
    board.classList.add('x')
    
    // Loop para adicionar o 'X' ou o 'CIRCULO' apenas uma vez na célula
  for (const cell of key) {
    cell.classList.remove('circle')
    cell.classList.remove('x')
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, {once: true})
  }
  }
}

// Evento de submeter que não envia o formulário ao clicar em 'JOGAR' e inicia o jogo
form.addEventListener('submit', (ev) => {
  ev.preventDefault() 
  board.classList.add('x')
  startGame()
})

// Evento de clique para o botão de reiniciar, que limpa as classes da board e das keys para recomeça o jogo com os mesmos jogadores
restartBtn.addEventListener('click', startGame)


// Função para dar reload na página
const reloadClick = () => {
  location.reload()
}

// Evento de clique para o botão de mudar os nomes dos jogadores
restartPlayerBtn.addEventListener('click', reloadClick)