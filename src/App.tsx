import './App.css';
import clayImage from './images/clay.jpg';
import desertImage from './images/desert.jpg';
import forestImage from './images/forest2.jpg';
import grassImage from './images/grass.jpg';
import stonesImage from './images/stones.jpg';
import cornImage from './images/corn.jpg';


import React, { useEffect } from 'react';
import { shuffle } from './helpers/shuffle';
import { RawMaterialType } from './interfaces/geks-fields';
import { drawMap } from './helpers/drawing';
import { generateMapInternal, tryToGenerateMap } from './helpers/generate-map';


const numbersList = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
const resourseTypeList = [
  RawMaterialType.Corn, RawMaterialType.Corn, RawMaterialType.Corn, RawMaterialType.Corn,
  RawMaterialType.Mountain, RawMaterialType.Mountain, RawMaterialType.Mountain,
  RawMaterialType.Clay, RawMaterialType.Clay, RawMaterialType.Clay,
  RawMaterialType.Sheep, RawMaterialType.Sheep, RawMaterialType.Sheep, RawMaterialType.Sheep,
  RawMaterialType.Forest, RawMaterialType.Forest, RawMaterialType.Forest, RawMaterialType.Forest
];
const imgMountain = new Image(), imgClay = new Image(), imgGrass = new Image(), imgForest = new Image(), imgDesert = new Image(), imgCorn = new Image()
imgMountain.src = stonesImage;
imgClay.src = clayImage;
imgGrass.src = grassImage;
imgForest.src = forestImage;
imgDesert.src = desertImage;
imgCorn.src = cornImage;

function onGenerateMap() {
  let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.font = 'bold 40px serif';

  var patternCorn = ctx.createPattern(imgCorn, 'repeat');
  var patternMountain: CanvasPattern = ctx.createPattern(imgMountain, 'repeat');
  var patternClay: CanvasPattern = ctx.createPattern(imgClay, 'repeat') as CanvasPattern;
  var patternGrass = ctx.createPattern(imgGrass, 'repeat');
  var patternForest = ctx.createPattern(imgForest, 'repeat');
  var patternDesert = ctx.createPattern(imgDesert, 'repeat');

  const patternsMap = new Map<RawMaterialType, CanvasPattern>();
  patternsMap.set(RawMaterialType.Corn, patternCorn)
  patternsMap.set(RawMaterialType.Mountain, patternMountain)
  patternsMap.set(RawMaterialType.Clay, patternClay)
  patternsMap.set(RawMaterialType.Sheep, patternGrass)
  patternsMap.set(RawMaterialType.Forest, patternForest)
  patternsMap.set(RawMaterialType.Desert, patternDesert)



  shuffle(resourseTypeList);
  shuffle(numbersList);
  const internalGeks = generateMapInternal();
  const geksMap = tryToGenerateMap(internalGeks, [...numbersList], [...resourseTypeList])

  if (geksMap) {
    drawMap(ctx, geksMap, patternsMap);
  }

}


function App() {

  useEffect(() => {
    setTimeout(() => onGenerateMap(), 1200);
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
