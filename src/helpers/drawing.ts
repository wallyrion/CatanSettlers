import { GeksField, RawMaterialType } from './../interfaces/geks-fields';

var length = 100;
var lengthD = 86.6025403785;
var lengthY = 50;

const coordinates = [
    [lengthD * 2 + 1, 0],
    [lengthD * 4 + 1, 0],
    [lengthD * 6, 0],

    [lengthD, lengthY * 3 + 1],
    [lengthD * 3 + 1, lengthY * 3 + 1],
    [lengthD * 5 + 2, lengthY * 3 + 1],
    [lengthD * 7 + 1, lengthY * 3 + 1],

    [0, lengthY * 6 + 2],
    [lengthD * 2 + 1, lengthY * 6 + 2],
    [lengthD * 4 + 2, lengthY * 6 + 2],
    [lengthD * 6 + 2, lengthY * 6 + 2],
    [lengthD * 8 + 2, lengthY * 6 + 2],

    [lengthD, lengthY * 9 + 2],
    [lengthD * 3, lengthY * 9 + 2],
    [lengthD * 5, lengthY * 9 + 2],
    [lengthD * 7, lengthY * 9 + 2],


    [lengthD * 2 + 2, lengthY * 12 + 2],
    [lengthD * 4 + 2, lengthY * 12 + 2],
    [lengthD * 6 + 2, lengthY * 12 + 2],

]

export const drawMap = (ctx: CanvasRenderingContext2D, geksMap: GeksField[], patternsMap: Map<RawMaterialType, CanvasPattern>) => {
    if (geksMap.length !== coordinates.length) {
        throw new TypeError('Can not draw the map. Generated geks length is wrong')
    }

    for (let i = 0; i < geksMap.length; i++) {
        const [x, y] = coordinates[i];
        drawGeksField(ctx, x, y, geksMap[i], patternsMap)
    }

}


export const drawGeksField = (
    ctx: CanvasRenderingContext2D,
    currentX = 0,
    currentY = 0,
    geks: GeksField,
    patternsMap: Map<RawMaterialType, CanvasPattern>
) => {
    const pattern = patternsMap.get(geks.RawMaterial);

    ctx.fillStyle = pattern;
    ctx.beginPath();
    ctx.moveTo(currentX += lengthD, currentY);
    ctx.lineTo(currentX += lengthD, currentY += lengthY);
    ctx.lineTo(currentX, currentY += length);
    ctx.lineTo(currentX -= lengthD, currentY += lengthY);
    ctx.lineTo(currentX -= lengthD, currentY -= lengthY);
    ctx.lineTo(currentX, currentY -= length);

    ctx.fill();
    ctx.closePath()

    if (geks.cubeValue) {
        drawNumberOnGeksField(ctx, geks.cubeValue, currentX, currentY)
    }
}


const drawNumberOnGeksField = (
    ctx: CanvasRenderingContext2D,
    value: number,
    currentX = 0,
    currentY = 0,
): void => {
    ctx.beginPath()
    ctx.fillStyle = "rgba(200, 200, 200, 0.7)"
    ctx.arc(currentX + lengthD, currentY + lengthY, 30, 0, 4 * Math.PI);
    ctx.fill();
    ctx.closePath();


    ctx.beginPath()
    ctx.fillStyle = (value === 6 || value === 8) ? 'red' : 'black';
    ctx.fillText(value.toString(), currentX + lengthD - 15, currentY + lengthY + 10);
    ctx.closePath();
}