document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================

  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  const playerInfo = document.querySelector('.player-info')
  const finalScore = document.querySelector('#final-score')
  const playerLives = document.querySelectorAll('.lives img')
  const endGame = document.querySelector('.end-game')
  const playAgainBtn = document.querySelector('#play-again')
  const width = 16
  const squares = []
  const aliensStart = [2,3,4,5,6,7,8,9,10,11,12,13,18,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,40,41,42,43,44,45]
  const alienMovement = [1,1,width,-1,-1,-1,-1,width,1,1]
  let aliens = aliensStart
  let playerIndex = 247
  let alienMove = 0
  let scoreTotal = 0
  let bombInterval = 0
  let livesRemaining = 3

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
  // startGame function

  // clear all the alien classes from the grid
  // re-set the alien array
  // re-set the score
  // apply the alien classes
  // start the movement
  // start the bombs dropping
  // hide the start/end screen

  function newGame() {
    endGame.classList.add('hidden')
    playerInfo.classList.remove('hidden')
    playerIndex = 247
    livesRemaining = 3
    scoreTotal = 0
    bombInterval = 0
    alienMove = 0
    aliensStart
    clearInterval(bombInterval)
    clearInterval(alienTimer)
    clearInterval(alienBombTimer)
    moveAliens()
    alienBomb()
  }
  function gameOver() {
    clearInterval(bombInterval)
    clearInterval(alienTimer)
    clearInterval(alienBombTimer)
    // Display end game screen
    grid.style.display = 'none'
    endGame.classList.remove('hidden')
    playerInfo.classList.add('hidden')
    finalScore.innerText = scoreTotal
  }

  // ======================== GRID ========================

  for(let i = 0; i < width ** 2; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  // ======================= PLAYER =======================

  // Set the player inside the grid
  addPlayerClass()
  // Setting up keycodes to enable player movement
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
    }
  })

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

          //Increase the score by +1
          scoreTotal++
          //Update the innerText to the scoreTotal
          score.innerText = scoreTotal

          clearInterval(missileInterval)

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
    if (alienMove === alienMovement.length) alienMove = 0
    if(aliens.some(alien => alien >= 240)) {
      gameOver()
    }
  }

  function alienBomb() {
    // const randomIndex = Math.floor(Math.random() * 10)
    let bombIndex = aliens[Math.floor(Math.random() * aliens.length)]
    // make sure we clear the interval so we don't duplicate it
    bombInterval = setInterval(() => {

      // check that our index won't go out of range
      if(bombIndex + width <= squares.length) {

        // ensure we allow enough "width" for the bomb to reach the bottom
        if(bombIndex + width <= 255) {
          squares[bombIndex].classList.remove('bomb')
          bombIndex += width
          squares[bombIndex].classList.add('bomb')
        } else {
          squares[bombIndex].classList.remove('bomb')
        }
        // remove the bomb and player when it hits the player
        if(squares[bombIndex].classList.contains('player')) {
          livesRemaining--
          for(let i=0;i<playerLives.length - livesRemaining;i++) {
            playerLives[i].classList.add('hidden')
          }
          // End the game, ie stop all the intervals
          if(livesRemaining === 0){ //OR ALIENS IN ARRAY REACH THE BOTTOM
            clearInterval(bombInterval)
            clearInterval(alienTimer)
            clearInterval(alienBombTimer)
            // Display end game screen
            grid.style.display = 'none'
            endGame.classList.remove('hidden')
            playerInfo.classList.add('hidden')
            finalScore.innerText = scoreTotal
          }
          squares[bombIndex].classList.remove('bomb')
        }
      // otherwise just remove the bomb because we'll go out of index
      } else {
        squares[bombIndex].classList.remove('bomb')
      }
    }, 500)
  }

  // ======================= MISSILE =======================
  // Find the position of the player by using the playerIndex
  // Add an eventListener with Keydown for the spacebar that will generate the missile
  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32) fireMissile()
  })

  playAgainBtn.addEventListener('click', newGame)


  // ======================= ALIENS =======================
  // Create the aliens so they appear as a child of the divs that have been created by creating additional classes for .alien
  aliens.forEach((alienIndex) => {
    squares[alienIndex].classList.add('alien')
  })

  // Alien movement to remove class and then add class again using a set interval
  const alienTimer = setInterval(moveAliens, 500)

  // ===================== ALIEN BOMBS =====================
  const alienBombTimer = setInterval(alienBomb, 1000)

  // CLOSING OF DOMContentLoaded
})
