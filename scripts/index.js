const gameboard = document.getElementById("gameboard");

const playerOneColor = "yellow";
const playerTwoColor = "red";
const highlightedRowColor = "lightgray";
const gameboardBackgroundColor = "blue"

gameboard.style.backgroundColor = gameboardBackgroundColor
if (
  playerOneColor === highlightedRowColor ||
  playerTwoColor === highlightedRowColor
) {
  alert("highlighted color matches one of the player colors");
}

let randomNum = !Math.floor(Math.random() * 2);
let activePlayerColor;
setactivePlayerColor(randomNum);

// setactivePlayerColor(true);
for (let rowNum = 0; rowNum < 6; rowNum++) {
  for (let colNum = 0; colNum < 7; colNum++) {
    const circlehole = document.createElement("div");
    circlehole.id = `${rowNum}_${colNum}`;
    circlehole.classList.add("circleholes", `col_${colNum}`);
    gameboard.append(circlehole);
  }
}

for (let col = 0; col < 7; col++) {
  const columns = document.getElementsByClassName(`col_${col}`);

  for (let columncell of columns) {
    columncell.addEventListener("mouseenter", () => {
      for (let column of columns) {
        if (!column.style.backgroundColor) {
          column.style.backgroundColor = highlightedRowColor;
        }
      }
      columncell.addEventListener("click", handleColumnClick);
    });
    columncell.addEventListener("mouseleave", () => {
      for (let column of columns) {
        if (column.style.backgroundColor === highlightedRowColor) {
          column.style.backgroundColor = "";
        }
      }
      columncell.removeEventListener("click", handleColumnClick);
    });
  }

  const column = document.getElementById(`0_${col}`);

  column.addEventListener("mouseleave", () => {
    for (let row = 0; row < 6; row++) {
      const circle = document.getElementById(`${row}_${col}`);

      if (circle.style.backgroundColor === highlightedRowColor) {
        circle.style.backgroundColor = "";
      } else {
        break;
      }
    }
  });

  function handleColumnClick() {
    console.log("clicked column");
    let row = 0;
    let circles = document.getElementById("gameboard").childNodes;

    for (let circle of circles) {
      if (
        !circle.style.backgroundColor === playerOneColor ||
        !circle.style.backgroundColor === playerTwoColor
      ) {
        circle.style.backgroundColor = "";
      }
    }

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
      if (
        nextCircle &&
        nextCircle.style.backgroundColor !== playerOneColor &&
        nextCircle.style.backgroundColor !== playerTwoColor &&
        row < 6 &&
        nextCircle.style.backgroundColor !== "yellow" //test
      ) {
        row++;
      } else {
        clearInterval(fallingTile);

        randomNum = !randomNum;
        setactivePlayerColor(randomNum);
        // console.log(randomNum)
      }
    }, 50);
  }
}

function setactivePlayerColor(boolean) {
  checkdiagonal();
  // console.log("diagonal: ", checkdiagonal());
  if (boolean) {
    activePlayerColor = playerOneColor;
  } else {
    activePlayerColor = playerTwoColor;
  }
  document.getElementById("player_up").style.backgroundColor =
    activePlayerColor;
}

const testers = document.getElementById("gameboard").children;

// testers[19].style.backgroundColor = "black";
// testers[31].style.backgroundColor = "black";

// testers[25].style.backgroundColor = "black";
// testers[26].style.backgroundColor = "black";
// testers[23].style.backgroundColor = "black";
// testers[31].style.backgroundColor = "black";

function checkdiagonal() {
  let output = false;
  const gameboardTiles = document.getElementById("gameboard").children;

  if (gameboardTiles.length < 1) {
    // console.log("here");
    return output;
  }

  // Search through the gameboard tiles and find the first one that has a style: color attribute
  let rowlength = 7;

  for (let i = 0; i < gameboardTiles.length; i++) {
    let backslashdir = [];
    let forwardslashdiag = [];
    let horizontaldir = [];
    let verticaldir = [];
    if (!gameboardTiles[i].hasAttribute("style")) {
      if (i === gameboardTiles.length) {
        return false;
      } else {
        continue;
      }
    }

    let startingTileIndex = i;
    let startingTile = gameboardTiles[startingTileIndex];
    const tile = gameboardTiles[i];

    if (
      tile.style.backgroundColor &&
      tile.style.backgroundColor !== highlightedRowColor
    ) {
      let checkingTile = gameboardTiles[startingTileIndex - rowlength + 1];
      /*             */
      // check forward slash diagonal direction

      output = checkTiles(
        rowlength,
        startingTileIndex,
        startingTile,
        checkingTile,
        forwardslashdiag,
        output,
        "forwardslash",
      );

      // check backslash diagonal direction
      checkingTile = gameboardTiles[startingTileIndex - rowlength - 1];

      output = checkTiles(
        rowlength,
        startingTileIndex,
        startingTile,
        checkingTile,
        backslashdir,
        output,
        "backslash",
      );

      // check vertical direction
      checkingTile = gameboardTiles[startingTileIndex - rowlength];

      output = checkTiles(
        rowlength,
        startingTileIndex,
        startingTile,
        checkingTile,
        verticaldir,
        output,
        "vertical",
      );

      // check horizontal direction
      checkingTile = gameboardTiles[startingTileIndex + 1];

      // console.log(startingTile);
      // console.log(checkingTile);

      // console.log(startingTileIndex);

      output = checkTiles(
        rowlength,
        startingTileIndex,
        startingTile,
        checkingTile,
        horizontaldir,
        output,
        "horizontal",
      );
    }
  }

  return output;
}

function checkTiles(
  rowlength,
  startingTileIndex,
  startingTile,
  checkingTile,
  collectionArray,
  output,
  direction,
) {
  // console.log("checking", direction)
  const gameboardTiles = document.getElementById("gameboard").children;

  // if (!checkingTile){
    // console.log(checkingTile)
    // return false
  // }

  // console.log(startingTile)
  // console.log(checkingTile)
  if (
    checkingTile &&
    startingTile.style.backgroundColor === checkingTile.style.backgroundColor
  ) {
    collectionArray.push(startingTile);
    for (let index = 1; index < 5; index++) {
      // if (checkingTile)
      // console.log(index)
      // console.log(Array.from(new Set(collectionArray)))
      if (
        checkingTile && 
        startingTile.style.backgroundColor ===
        checkingTile.style.backgroundColor
      ) {
        collectionArray.push(checkingTile);

        switch (direction) {
          case "forwardslash":
            console.log("checking forwardslash", startingTile.style.backgroundColor);
            checkingTile =
              gameboardTiles[startingTileIndex - (rowlength * index) + index];
            break;

          case "backslash":
            console.log("checking backslash", startingTile.style.backgroundColor);
            checkingTile =
              gameboardTiles[startingTileIndex - (rowlength * index) - index];
            break;

          case "horizontal":
            console.log("checking horizontal", startingTile.style.backgroundColor);
            checkingTile = gameboardTiles[startingTileIndex + index];
            break;

          case "vertical":
            console.log("checking vertical", startingTile.style.backgroundColor);
            checkingTile = gameboardTiles[startingTileIndex - (rowlength * index)];
            break;
        }
      } else {
        continue;
      }
    }
    collectionArray = Array.from(new Set(collectionArray));
    // console.log(collectionArray);
    if (collectionArray.length === 4) {
      output = true;
      console.log(output);
      if (output === true) {
        showWin()
      }
      return output;
    } else {
      return output;
    }
  }
}

function showWin() {
  console.log("win detected")
  const winningMessage = document.createElement("div")
  winningMessage.id = "winningMessage"
  winningMessage.style.border = `1px solid ${activePlayerColor}`
  winningMessage.innerText = `${activePlayerColor.charAt(0).toUpperCase() + activePlayerColor.slice(1)} Player Wins!`

  const restartBtn = document.createElement("button")
  restartBtn.innerText = "New Game"
  restartBtn.addEventListener("click", () => document.location.reload())
  winningMessage.append(restartBtn)
  document.getElementById("gameboard").before(winningMessage)
}
