const gameboard = document.getElementById("gameboard");

const playerOneColor = "black";
const playerTwoColor = "gray";

let randomNum = !(Math.floor(Math.random() *2))
let activePlayerColor
setactivePlayerColor(randomNum)


for (let rowNum = 0; rowNum < 6; rowNum++) {
  for (let colNum = 0; colNum < 7; colNum++) {
    const circlehole = document.createElement("div");
    circlehole.id = `${rowNum}_${colNum}`;
    circlehole.classList.add("circleholes", `col_${colNum}`);
    gameboard.append(circlehole);
  }
}

for (let col = 0; col < 7; col++) {
  const column = document.getElementById(`0_${col}`);

  column.addEventListener("mouseenter", () => {
    for (let row = 0; row < 6; row++) {
      const circle = document.getElementById(`${row}_${col}`);
    }
  });

  column.addEventListener("click", () => {
    let row = 0;

    const fallingTile = setInterval(() => {
      let prevCircle;
      if (row > 0) {
        prevCircle = document.getElementById(`${row - 1}_${col}`);
      }

      const circle = document.getElementById(`${row}_${col}`);
      const nextCircle = document.getElementById(`${row + 1}_${col}`);

      circle.style.backgroundColor = activePlayerColor;
      if (prevCircle) {
        prevCircle.style.backgroundColor = "";
      }
      if (nextCircle && !nextCircle.style.backgroundColor && row < 6) {
        row++;
      } else {
        clearInterval(fallingTile);
        console.log(randomNum)

        randomNum = !randomNum
        setactivePlayerColor(randomNum)
        // console.log(randomNum)
      }
    }, 50);
  });

  // document.getElementById("5_5").style.backgroundColor = "yellow";

  column.addEventListener("mouseleave", () => {
    for (let row = 0; row < 6; row++) {
      const circle = document.getElementById(`${row}_${col}`);

      if (circle.style.backgroundColor === "blue") {
        circle.style.backgroundColor = "";
      } else {
        break;
      }
    }
  });

  // column.style.backgroundColor = "red"
}

function setactivePlayerColor(boolean) {
  console.log("diagonal: ",checkdiagonal())

  if (boolean) {
    activePlayerColor = playerOneColor
  } else {
    activePlayerColor = playerTwoColor
  }
  document.getElementById("player_up").style.backgroundColor = activePlayerColor;
}

function checkdiagonal() {
  const gameboardTiles = document.getElementById("gameboard").childNodes

  let forwardslashdiag = []
  let backslashdir = []

  // for (let i = 0; i < gameboardTiles.length; i++) {
  //   console.log(gameboardTiles[i+8].style.backgroundColor)
  //   if (gameboardTiles[i+8]){
  //     gameboardTiles[i+8].style.backgroundcolor = "purple"
  //   }
  // }
  
  return true
}