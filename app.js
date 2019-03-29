document.addEventListener('DOMContentLoaded', () => {

  // ====================== VARIABLES =====================
  const grid = document.querySelector('.grid')
  const width = 16
  const squares = []
  let aliens = [17,18,19,20,21,22,23,24,25,26,27,28,29,30,33,34,35,36,37,38,39,40,41,42,43,44,45,46]


  // ======================== GRID ========================
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }



  // ======================= PLAYER =======================



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
  // Restrict the width of their movement so that they can only run across 14 divs



  // ===================== ALIEN BOMBS =====================

  // CLOSING OF DOMContentLoaded
})
