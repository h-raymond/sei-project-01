document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================
  const grid = document.querySelector('.grid')
  const width = 16
  const squares = []
  let aliens = [18,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,40,41,42,43,44,45]
  let playerIndex = 247
  let alienMove = 0
  const alienMovement = [1,1,width,-1,-1,-1,-1,width,1,1]
  const score = document.querySelector('.score')
  let scoreTotal = 0

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

  // ======================= MISSILE =======================
  // Find the position of the player by using the playerIndex
  // Add an eventListener with Keydown for the spacebar that will generate the missile
  document.addEventListener('keydown', (e) => {
    let missileIndex = playerIndex - width
    if(e.keyCode === 32) {
      const missileInterval = setInterval(() => {
        let missileTarget = squares[missileIndex]
        missileTarget.classList.remove('missile')

        if(missileIndex - width >= 0) {
          missileIndex -= width
          missileTarget = squares[missileIndex]

          if (missileTarget.classList.contains('alien')) {
            console.log('explosion')// This is where we need to remove the alien from the array if we can target that specific one, or push it into an array of dead aliens
            const position = aliens.indexOf(missileIndex)
            aliens.splice(position, 1)
            missileTarget.classList.remove('alien')
            missileTarget.classList.remove('missile')
            scoreTotal++
            score.innertext = scoreTotal
            clearInterval(missileInterval)
          } else {
            missileTarget.classList.add('missile')
          }
        } else {
          missileTarget.classList.remove('missile')
        }
      }, 80)
    }
  })

  // =========== MISSILE INTERSECTION WITH ALIEN ==========
  // If the missile class is added to the same div as alien


  // ======================= ALIENS =======================
  // Create the aliens so they appear as a child of the divs that have been created by creating additional classes for .alien
  aliens.forEach((alienIndex) => {
    squares[alienIndex].classList.add('alien')
  })

  // Alien movement to remove class and then add class again using a set interval
  const alienTimer = setInterval(() => {
    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.remove('alien')
    })

    //add alienMovement array to each number in the aliens
    aliens = aliens.map((alienIndex) => alienIndex + alienMovement[alienMove])

    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.add('alien')
    })

    alienMove++
    if (alienMove === alienMovement.length) alienMove = 0
    if(aliens.some(alien => alien >= 240)) clearInterval(alienTimer)
  }, 500)


  // ===================== ALIEN BOMBS =====================
  const alienBombId = setInterval(alienBomb, 10000)

  function alienBomb() {
    const randomIndex = Math.floor(Math.random() * 10)
    let bombIndex = aliens[randomIndex]

    setInterval(() => {
      if(bombIndex + width <= 240) {
        squares[bombIndex].classList.remove('bomb')
        bombIndex += width
        squares[bombIndex].classList.add('bomb')
      } else {
        squares[bombIndex].classList.remove('bomb') //This is currently causing error messages
      }
      if(squares[bombIndex].classList.contains('player')) {
        squares[bombIndex].classList.remove('player')
      }
    }, 500)
  }

  alienBomb()

  // Ability for Alien to drop bomb when no alien is below. i.e. div +width is empty

  // CLOSING OF DOMContentLoaded
})
