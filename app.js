document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================
  const grid = document.querySelector('.grid')
  const width = 16
  const squares = []
  let aliens = [18,19,20,21,22,23,24,25,26,27,28,29,34,35,36,37,38,39,40,41,42,43,44,45]
  let playerIndex = 247
  let alienMove = 0
  const alienMovement = [1,1,width,-1,-1,-1,-1,width,1,1]

  // ====================== FUNCTIONS =====================
  // function playerPosition(){
  //   squares.find(square => square.classList.contains('player'))
  // }
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

  // ======================= LASERS =======================
  // Find the position of the player by using the playerIndex
  // Add an eventListener with Keydown for the spacebar that will generate the bullet
  document.addEventListener('keydown', (e) => {
    let bulletIndex = playerIndex - width
    if(e.keyCode === 32) {
      setInterval(() => {
        squares[bulletIndex].classList.remove('bullet')
        bulletIndex -= width
        squares[bulletIndex].classList.add('bullet')
      }, 80)
      if(bulletIndex-width >= 0){
        squares[bulletIndex].classList.remove('bullet')
      }
    }
  })
  //Add the bullet to the div ABOVE the player's current position (this should be - width of the current position)
  // Create a setInterval function for the bullet which will then -width * width (as the height is the same in my case) so that the bullet goes from it's start position to the end at the top of the container




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
    console.log(aliens)
    //loop through the aliens array
    //add alienMovement array to each number in the aliens

    aliens = aliens.map((alienIndex) => alienIndex + alienMovement[alienMove])

    console.log(aliens)

    aliens.forEach((alienIndex) => {
      squares[alienIndex].classList.add('alien')
    })

    alienMove ++
    if (alienMove === alienMovement.length) alienMove = 0

    if(aliens.some(alien => alien >= 240)) clearInterval(alienTimer)
  }, 30)


  // Restrict the width of their movement so that they can only run across 12 central divs



  // ===================== ALIEN BOMBS =====================

  // CLOSING OF DOMContentLoaded
})
