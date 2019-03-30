document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================
  const grid = document.querySelector('.grid')
  const width = 16
  const squares = []
  let aliens = [18,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,40,41,42,43,44,45]
  let playerIndex = 247

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
  for(let i = 0; i < width * width; i++) {
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

  // ======================= LASERS =======================
  function fire() {
    // Create a variable which defines the start position based on the position of the player
    // Set a start position for the bullet to travel (this will have something to do with the width of the container minus the current div position for the bullet to travel straight up)
    
  }

  // ======================= ALIENS =======================
  // Create the aliens so they appear as a child of the divs that have been created by creating additional classes for .alien
  aliens.forEach((alienIndex) => {
    squares[alienIndex].classList.add('alien')
  })

  // Alien movement to remove class and then add class again using a set interval
  setInterval(() => {
    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.remove('alien')
    })

    aliens = aliens.map(alienIndex => alienIndex +1)
    console.log(aliens)
    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.add('alien')
    })
  }, 500)

  // Restrict the width of their movement so that they can only run across 12 central divs



  // ===================== ALIEN BOMBS =====================

  // CLOSING OF DOMContentLoaded
})
