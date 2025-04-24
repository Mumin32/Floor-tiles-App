// Elements //////////
const colorOptions = document.querySelectorAll('.color-option');
const garage = document.querySelector('.garage');
const form = document.querySelector('.form');
const submit = document.querySelector('#submit');
const container = document.querySelector('.container');
const grid = document.querySelector('.garage');
const calculate = document.querySelector('#calculate');
const result = document.querySelector('.result');
let selectedColor;
result.classList.add('hidden');
let isProcessing = false;

/////////////////////////////
//functions /////////////////
////////////////
const calcTiles = (m) => Math.floor((m * 100) / 40);
const calcRest = (m) => Number.parseFloat((m * 100).toFixed(2) % 40);
const addRowOrColumn = function (rest, rowOrCol) {
  if (rest >= 80) {
    rowOrCol++;
    rowOrCol++;
  }
  if (rest >= 40 && rest < 80) {
    rowOrCol++;
  }
  return rowOrCol;
};

//Select your color !

submit.addEventListener('click', function (e) {
  e.preventDefault();
  isProcessing = true;
  colorOptions.forEach((option) => {
    option.addEventListener('click', function (e) {
      e.preventDefault();
      colorOptions.forEach((opt) => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
      selectedColor = option.dataset.color;
    });
  });

  garage.innerHTML = '';
  const widthInput = document.querySelector('#widthInput').value;
  const heightInput = document.querySelector('#heightInput').value;
  if (!widthInput || !heightInput) {
    return alert('Type width and hight correct! ');
  }
  const cols = calcTiles(widthInput);
  const rows = calcTiles(heightInput);
  const restW = calcRest(widthInput);
  const restH = calcRest(heightInput);

  addRowOrColumn(restW, cols);
  addRowOrColumn(restH, rows);

  garage.style.gridTemplateColumns = `repeat(${cols}, 40px) ${restW}px`;
  garage.style.gridTemplateRows = `repeat(${rows}, 40px) 40px`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement('div');
      tile.className = 'garage-tile';
      grid.appendChild(tile);
      tile.addEventListener('click', () => {
        tile.style.backgroundColor = selectedColor;
      });
    }

    const restTileWidth = document.createElement('div');
    restTileWidth.className = 'rest-tile';
    restTileWidth.style.width = `${restW}px`;
    grid.appendChild(restTileWidth);
    restTileWidth.addEventListener('click', () => {
      restTileWidth.style.backgroundColor = selectedColor;
    });
  }
  //Last row
  if (restH != 0) {
    for (let c = 0; c < cols; c++) {
      const restTileHeight = document.createElement('div');
      restTileHeight.className = 'rest-tile';
      restTileHeight.style.width = `40px`;
      restTileHeight.style.height = `${restH}px`;
      grid.appendChild(restTileHeight);

      restTileHeight.addEventListener('click', () => {
        restTileHeight.style.backgroundColor = selectedColor;
      });
    }
  }
  // Edge tile !
  const cornerTile = document.createElement('div');
  cornerTile.className = 'rest-tile';
  cornerTile.style.width = `${restW}px`;
  cornerTile.style.height = `${restH}px`;
  grid.appendChild(cornerTile);

  cornerTile.addEventListener('click', () => {
    cornerTile.style.backgroundColor = selectedColor;
  });
  //////////////////
  ////////////////
  //////////////
  //Calculating and Writing in Html result !
});
calculate.addEventListener('click', function () {
  console.log('ipis');
  if (isProcessing) {
    const AllGarageTiles = document.querySelectorAll('.garage-tile');
    let green = 0;
    let blue = 0;
    let red = 0;
    let grey = 0;

    AllGarageTiles.forEach((tile) => {
      const bg = tile.style.backgroundColor;
      if (bg === 'green') green++;
      else if (bg === 'red') red++;
      else if (bg === 'blue') blue++;
      else if (bg === 'grey') grey++;
    });

    if (AllGarageTiles.length > blue + red + green + grey) {
      alert('Fill every filed with color ! ');
    } else {
      isProcessing = false;
      result.classList.remove('hidden');
      result.innerHTML = ` <p>Green Tiles: ${green} </p>
        <p>Blue Tiles: ${blue} </p>
         <p>Red Tiles: ${red} </p>
         <p>Grey Tiles: ${grey}  </p>
         You need ${green + blue + red + grey} Tiles in total
         `;
    }
  }
});
