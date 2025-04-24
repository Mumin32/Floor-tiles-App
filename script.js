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

  const garageTiles = document.querySelectorAll('.garage-tile');
  console.log(garageTiles);
  garageTiles.forEach((tile) => {
    let color = getComputedStyle(tile);
    console.log(color.backgroundColor);
  });
});
