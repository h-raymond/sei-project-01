// ====================== VARIABLES NOT REQUIRED BEFORE DOM LOADS =====================

const width = 16
const squares = []
const aliensStart = [2,3,4,5,6,7,8,9,10,11,12]
// 13,18,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,40,41,42,43,44,45]
const alienMovement = [1,1,width,-1,-1,-1,-1,width,1,1]
let aliens = aliensStart.slice()
let playerIndex = 247
let alienMove = 0
let scoreTotal = 0
let bombIntervals = []
let livesRemaining = 3
let alienTimer
let alienBombTimer

document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================

  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const playerInfo = document.querySelector('.player-info')
  const finalScore = document.querySelector('#final-score')
  const playerLives = document.querySelectorAll('.lives img')
  const endGame = document.querySelector('.end-game')
  const playAgainBtns = document.querySelectorAll('.play-again')
  const endMessage = document.querySelector('.message')
  const startGame = document.querySelector('.start-game')

  // ====================== FUNCTIONS =====================

  function addPlayerClass(){
    squares[playerIndex].classList.add('player')
  }
  function movePlayer() {
    // find the square with the class of "player"
    const player = squares.find(square => square.classList.contains('player'))
    // remove the class of player from that square
    player.classList.remove('player')
    // add the class of player to square the player should move to
    addPlayerClass()
  }
  function fireMissile(){
    let missileIndex = playerIndex - width
    let missileTarget = squares[missileIndex]

    const missileInterval = setInterval(() => {
      missileTarget.classList.remove('missile')

      if(missileIndex - width >= 0) {
        missileIndex -= width
        missileTarget = squares[missileIndex]

        if(missileTarget.classList.contains('alien')) {

          const position = aliens.indexOf(missileIndex)
          aliens.splice(position, 1)
          missileTarget.classList.remove('alien')
          missileTarget.classList.remove('missile')

          scoreTotal++
          score.innerText = scoreTotal
          clearInterval(missileInterval)

          if(aliens.length === 0) gameOver('Du gewinnst! (You Win!)')

        } else {
          missileTarget.classList.add('missile')
        }
      } else {
        missileTarget.classList.remove('missile')
      }
    }, 80)
  }
  function moveAliens() {
    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.remove('alien')
    })
    //add alienMovement array to each number in the aliens
    aliens = aliens.map((alienIndex) => alienIndex + alienMovement[alienMove])

    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.add('alien')
    })

    //Increase alien moves through the array
    alienMove++
    if(alienMove === alienMovement.length) alienMove = 0
    if(aliens.some(alien => alien >= 240)) {
      gameOver('Du verlierst! (You Lose!)')
    }
  }
  function alienBomb() {
    let bombIndex
    if (aliens.length > 0){
      bombIndex = aliens[Math.floor(Math.random() * aliens.length)]
    }
    // make sure we clear the interval so we don't duplicate it
    const bombInterval = setInterval(() => {
      if (squares[bombIndex]){
        squares[bombIndex].classList.remove('bomb')
        if(squares[bombIndex].classList.contains('player') && livesRemaining !== 0) {
          livesRemaining--
          console.log(livesRemaining, ' lives left')
          for(let i=0;i<playerLives.length-livesRemaining;i++){
            playerLives[i].classList.add('hidden')
          }
        } else if (livesRemaining === 0) {
          gameOver('Du verlierst! (You Lose!)')
        }
        if (squares[bombIndex + width]) {
          squares[bombIndex + width].classList.add('bomb')
          bombIndex += width
        } else clearInterval(bombInterval)
      }

    }, 100)
    bombIntervals.push(bombInterval)
  }
  function newGame() {
    // Elements that have to be reset to start a newGame
    console.log('click')
    startGame.classList.add('hidden')
    endGame.classList.add('hidden')
    playerInfo.classList.remove('hidden')
    grid.style.display = 'flex'
    scoreTotal = 0
    score.innerText = scoreTotal
    aliens = aliensStart.slice()
    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.add('alien')
    })
    //Functions to run to allow the game to begin
    addPlayerClass()
    alienTimer = setInterval(moveAliens, 500)
    alienBombTimer = setInterval(alienBomb, 1000)
  }
  function gameOver(message) {
    bombIntervals.forEach(bombInterval => clearInterval(bombInterval))
    clearInterval(alienTimer)
    clearInterval(alienBombTimer)
    // Display end game screen
    grid.style.display = 'none'
    endGame.classList.remove('hidden')
    playerInfo.classList.add('hidden')
    endMessage.innerText = message
    finalScore.innerText = score.innerText

    //Reset all the other elements of the game play to restart on newGame() being triggered
    playerLives.forEach(life => life.classList.remove('hidden'))
    livesRemaining = 3
    playerIndex = 247
    bombIntervals = []
    alienMove = 0
    squares.forEach(square => square.removeAttribute('class'))
  }
  function gameStart() {
    startGame.classList.remove('hidden')
    grid.style.display = 'none'
  }
  for(let i = 0; i < width ** 2; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
      // Move Left --> Left Key
        if(playerIndex % width > 0) {
          playerIndex--
          movePlayer()
        }
        break
      case 39:
      // Move Right --> Right Key
        if(playerIndex % width < width - 1) {
          playerIndex++
          movePlayer()
        }
        break
      case 32:
        fireMissile()
        break
    }
  })
  playAgainBtns.forEach(button => button.addEventListener('click', newGame))

  gameStart()


  // CLOSING OF DOMContentLoaded
})
