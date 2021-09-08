import './App.css';
import React, { useEffect } from 'react';

/* const MAX_DROPS_SUM = 11;
const MIN_DROPS_SUM = 6; */


var length = 100;
var lengthD = 86.6025403785;
var lengthY = 50;
const numbersList = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]

var img1 = new Image();
var imgMountain = new Image();
img1.src = "http://www.fonstola.ru/large/201111/49563.jpg";

imgMountain.src = "https://www.abirus.ru/user/Image/Culture/Architec/yhs1.jpg"
const imgClay = new Image();
imgClay.src = 'https://lh3.googleusercontent.com/proxy/Rdn_rK_91ieSg1-wHfQkZhmx_t_S4I9R5xNmqpvfnKqXS-QV0A6KMpHhhETbEQkcJAY_NOB5j3ss0J7e3Y-OJo02tiQubdKQ-i8Aiqfg1kfiJJk_BBfow55CF4CzhY4bxXefswr8y6ueirHFdYmrgzd6iitwQYiKz4zOHHI9VQ';

const imgGrass = new Image();
imgGrass.src = 'https://thumbs.dreamstime.com/b/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%B0%D1%8F-%D0%BB%D1%83%D0%B6%D0%B0%D0%B9%D0%BA%D0%B0-4976575.jpg'

const imgForest = new Image();
imgForest.src = 'https://img5tv.cdnvideo.ru/webp/shared/files/201908/1_960015.jpg'

const imgDesert = new Image();
imgDesert.src = 'https://betonkompleks.com.ua/wp-content/uploads/2015/06/rechnoy-pesok.jpeg'

let createdFields = [];

/* function draw() {
  setTimeout(() => {
    onGenerateMap();
  }, 1500)
}
 */
/* const getDropsQuantity = (value, dimension = 6) => {
  let count = 0;
  for (let cube1 = 1; cube1 <= dimension; cube1++) {
    for (let cube2 = 1; cube2 <= dimension; cube2++) {
      if (cube1 + cube2 === value) {
        count++;
      }
    }
  }

  return count;
} */

/* function getDrops() {
  const dropsMap = {};

  return (value) => {
    if (dropsMap.value) {
      return dropsMap.value
    }
    const drops = getDropsQuantity(value);
    dropsMap[value] = drops;
    return drops;
  }
} */

//const getDropsNumber = getDrops();

function onGenerateMap() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.font = 'bold 40px serif';

  var patternCorn = ctx.createPattern(img1, 'repeat');
  var patternMountain = ctx.createPattern(imgMountain, 'repeat');
  var patternClay = ctx.createPattern(imgClay, 'repeat');
  var patternGrass = ctx.createPattern(imgGrass, 'repeat');
  var patternForest = ctx.createPattern(imgForest, 'repeat');
  var patternDesert = ctx.createPattern(imgDesert, 'repeat');

  const geksList = [
    patternCorn, patternCorn, patternCorn, patternCorn,
    patternMountain, patternMountain, patternMountain,
    patternClay, patternClay, patternClay,
    patternGrass, patternGrass, patternGrass, patternGrass,
    patternForest, patternForest, patternForest, patternForest];

  shuffle(geksList);

  const pickRandomResource = () => {
    return geksList.shift();
  }

  let numbers = [...numbersList];
  shuffle(numbers);

  let currentId = 0;


  const pickRandomValue = (cubeNumbers = numbers) => {
    return numbers.pop();
    /* return currentId;

    if (cubeNumbers.length === 0) {
      throw new TypeError('0 items');
    }
    const randomNumbers = [...cubeNumbers];
    var currentValue = randomNumbers.shift();
    /*     console.log('currentId', currentId)
     */   /*  console.log(createdFields); */

/* 
    const siblingGeks = createdFields.filter(createdField => {
      return createdField.siblings.find(sibling => sibling.find(index => currentId === index))
    });

    if (siblingGeks.length === 0) {
      const valueIndex = numbers.findIndex(item => item === currentValue);
      numbers.splice(valueIndex, 1);
      return currentValue;
    }


    let isValidGeks = false;
    for (let siblingGeksItem of siblingGeks) {
      console.log('sibling geks item', siblingGeksItem)

      const siblingCrosses = siblingGeksItem.siblings.filter(siblings => siblings.find(item => item === currentId))

      const isValidCross = (geksIndexes, currentValue) => {
        const crossValues = geksIndexes.map(geksIndex => createdFields[geksIndex].value)

        if (crossValues.find(currentValue)) {
          return false;
        }

        const dropsSum = [...crossValues, currentValue].map(item => getDropsNumber(item)).reduce((a, b) => a + b, 0);
        if (dropsSum > MAX_DROPS_SUM || dropsSum < MIN_DROPS_SUM) {
          return false;
        }

        return true;

      }

      const invalidCross = siblingCrosses.find(cross => !isValidCross(cross, currentValue));

      if (invalidCross) {
        break;
      } else {
        isValidGeks = true;
      }
    }

    if (isValidGeks) {
      const valueIndex = numbers.findIndex(item => item === currentValue);
      numbers.splice(valueIndex, 1);
      return currentValue;
    }

    return pickRandomValue(randomNumbers) */ 
  }

  drawGeks(ctx, lengthD * 2 + 1, 0, pickRandomResource(), { id: ++currentId, siblings: [[4], [4, 5], [5, 2], [2]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 4 + 1, 0, pickRandomResource(), { id: ++currentId, siblings: [[1], [1, 5], [5, 6], [6, 3], [3]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 6, 0, pickRandomResource(), { id: ++currentId, siblings: [[2], [2, 6], [6, 7], [7]], value: pickRandomValue() });

  drawGeks(ctx, lengthD, lengthY * 3 + 1, pickRandomResource(), { id: ++currentId, siblings: [[1], [1, 5], [5, 9], [8, 9], [8]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 3 + 1, lengthY * 3 + 1, pickRandomResource(), { id: ++currentId, siblings: [[4, 1], [1, 2], [2, 6], [6, 10], [10, 9], [9, 4]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 5 + 2, lengthY * 3 + 1, pickRandomResource(), { id: ++currentId, siblings: [[5, 2], [2, 3], [3, 7], [7, 11], [10, 11], [5, 10]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 7 + 1, lengthY * 3 + 1, pickRandomResource(), { id: ++currentId, siblings: [[6, 3], [3], [12], [11, 12], [6, 11]], value: pickRandomValue() });

  drawGeks(ctx, 0, lengthY * 6 + 2, pickRandomResource(), { id: ++currentId, siblings: [[4], [4, 9], [9, 13], [13]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 2 + 1, lengthY * 6 + 2, pickRandomResource(), { id: ++currentId, siblings: [[8, 4], [4, 5], [5, 10], [10, 14], [13, 14], [13, 8]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 4 + 2, lengthY * 6 + 2, patternDesert, { id: ++currentId, siblings: [[9, 5], [5, 6], [6, 11], [11, 15], [14, 15], [9, 14]] });
  drawGeks(ctx, lengthD * 6 + 2, lengthY * 6 + 2, pickRandomResource(), { id: ++currentId, siblings: [[10, 6], [6, 7], [7, 12], [12, 16], [15, 16], [10, 15]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 8 + 2, lengthY * 6 + 2, pickRandomResource(), { id: ++currentId, siblings: [[11, 7], [7], [16], [11, 16]], value: pickRandomValue() });

  drawGeks(ctx, lengthD, lengthY * 9 + 2, pickRandomResource(), { id: ++currentId, siblings: [[8], [8, 9], [9, 14], [14, 17], [17]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 3, lengthY * 9 + 2, pickRandomResource(), { id: ++currentId, siblings: [[13, 9], [9, 10], [10, 15], [15, 18], [17, 18], [13, 17]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 5, lengthY * 9 + 2, pickRandomResource(), { id: ++currentId, siblings: [[14, 10], [10, 11], [11, 16], [16, 19], [18, 19], [14, 18]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 7, lengthY * 9 + 2, pickRandomResource(), { id: ++currentId, siblings: [[15, 11], [11, 12], [12], [19], [15, 19]], value: pickRandomValue() });

  drawGeks(ctx, lengthD * 2 + 2, lengthY * 12 + 2, pickRandomResource(), { id: ++currentId, siblings: [[13], [13, 14], [14, 18], [18]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 4 + 2, lengthY * 12 + 2, pickRandomResource(), { id: ++currentId, siblings: [[17, 14], [14, 15], [15, 19], [17], [19]], value: pickRandomValue() });
  drawGeks(ctx, lengthD * 6 + 2, lengthY * 12 + 2, pickRandomResource(), { id: ++currentId, siblings: [[18, 15], [15, 16], [16], [18]], value: pickRandomValue() });

  return null;
}

function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function drawGeks(ctx, currentX = 0, currentY = 0, pattern1, settings) {
  ctx.fillStyle = pattern1;
  ctx.beginPath();
  ctx.moveTo(currentX += lengthD, currentY);
  ctx.lineTo(currentX += lengthD, currentY += lengthY);
  ctx.lineTo(currentX, currentY += length);
  ctx.lineTo(currentX -= lengthD, currentY += lengthY);
  ctx.lineTo(currentX -= lengthD, currentY -= lengthY);
  ctx.lineTo(currentX, currentY -= length);

  ctx.fill();
  ctx.closePath()



  if (settings.value) {
    ctx.beginPath()
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)"
    ctx.arc(currentX + lengthD, currentY + lengthY, 30, 0, 4 * Math.PI);
    ctx.fill();
    ctx.closePath();


    ctx.beginPath()
    ctx.fillStyle = (settings.value === 6 || settings.value === 8) ? 'red' : 'black';
    ctx.fillText(settings.value, currentX + lengthD - 15, currentY + lengthY + 10);
    ctx.closePath();
  }

  createdFields.push(settings);


}


function App() {

  useEffect(() => {
    setTimeout(() => onGenerateMap(), 500);
  }, []);
  return (
    <div className="App">
      <div>
        <button className="generate-button" onClick={onGenerateMap}> Generate map</button>
        <canvas id="canvas" width="1200" height="800"></canvas>
      </div>

      {useEffect}
    </div>
  );
}

export default App;
