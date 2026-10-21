const gameboard = document.getElementById("gameboard");

const playerOneColor = "red";
const playerTwoColor = "yellow";

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

      // if (!circle.style.backgroundColor){
      //     circle.style.backgroundColor = "blue";
      // } else {
      //     break
      // }
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
    //   console.log(circle.id);
      circle.style.backgroundColor = playerOneColor;
      if (prevCircle) {
        prevCircle.style.backgroundColor = "";
      }
      if (nextCircle && !nextCircle.style.backgroundColor && row < 6) {
        row++;
      } else {
        // console.log("else");
        clearInterval(fallingTile);
      }
    }, 50);
  });

  document.getElementById("5_5").style.backgroundColor = "yellow";

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
