import { shuffle } from './shuffle';
import { RawMaterialType, GeksField, GeksFieldInternal } from './../interfaces/geks-fields';

const MAX_DROPS_SUM = 11;
const MIN_DROPS_SUM = 8;

const crossesRelation: number[][] = [
    [1, 2], [1, 2, 5], [2, 3], [2, 3, 6], [3, 7], [1, 4, 5], [4, 8, 9], [1, 4], [4, 8], [8, 13], [8, 9, 13],
    [5, 9, 10], [5, 6, 10], [6, 7, 11], [7, 11, 12], [9, 10, 14], [7, 12], [3, 6, 7], [12, 16],
    [2, 5, 6], [4, 5, 9], [9, 13, 14], [10, 14, 15], [10, 11, 15], [6, 10, 11], [11, 12, 16], [11, 15, 16],
    [13, 14, 17], [13, 17], [14, 17, 18], [14, 15, 18], [15, 16, 19], [16, 19], [18, 19], [15, 18, 19], [17, 18]
]



export const generateMap = (geksInternal: GeksFieldInternal[], numbers: number[], materials: RawMaterialType[]): GeksField[] => {
    shuffle(numbers);
    shuffle(materials);

    const geksMap: GeksField[] = []
    for (let geks of geksInternal) {
        if (geks.RawMaterial === RawMaterialType.Desert) {
            geksMap.push({ id: geks.id, RawMaterial: RawMaterialType.Desert, cubeValue: 0 })
            continue;
        }

        const geksCrosses = crossesRelation.filter(cr => cr.find(c => c === geks.id));

        const material = pickMaterial(geksMap, geksCrosses, materials, []);
        const number = pickNumber(geksMap, geksCrosses, numbers, []);

        geksMap.push({ id: geks.id, cubeValue: number, RawMaterial: material })
    }

    return geksMap;
}

export const tryToGenerateMap = (geksInternal: GeksFieldInternal[], numbers: number[], materials: RawMaterialType[], times = 100): GeksField[] => {
    if (times === 0) {
        alert('Unable to draw the map. Please try again');
        return;
    }
    try {
        const result = generateMap(geksInternal, [...numbers], [...materials]);
        console.log('Map successfully created, attempt times: ' + (100 - times + 1))
        return result;
    }
    catch {
        return tryToGenerateMap(geksInternal, numbers, materials, --times);
    }
}


export const generateMapInternal = () => {
    const geksMap: GeksFieldInternal[] = [];

    let index = 1;
    for (; index < 10; index++) {
        let geks: GeksFieldInternal = {
            id: index,
        }
        geksMap.push(geks);
    }
    geksMap.push({ id: index++, RawMaterial: RawMaterialType.Desert })

    for (; index <= 19; index++) {
        let geks: GeksFieldInternal = {
            id: index,
        }
        geksMap.push(geks);
    }

    return geksMap;
}

function getDrops() {
    const dropsMap = new Map<number, number>();

    return (value: number) => {
        if (dropsMap.get(value)) {
            return dropsMap.get(value)
        }
        const drops = getDropsQuantity(value);
        dropsMap.set(value, drops);
        return drops;
    }
}

const getDropsNumber = getDrops();


const getDropsQuantity = (value: number, dimension = 6) => {
    let count = 0;
    for (let cube1 = 1; cube1 <= dimension; cube1++) {
        for (let cube2 = 1; cube2 <= dimension; cube2++) {
            if (cube1 + cube2 === value) {
                count++;
            }
        }
    }

    return count;
}



const validateNumber = (geksInternal: GeksField[], cross: number[], number: number): boolean => {
    const crossGeksNumbers = cross
        .map(item => geksInternal.find(g => g.id === item))
        .filter(item => item)
        .map(item => item.cubeValue);
    ;

    if (crossGeksNumbers.some(n => n === number)) {
        return false;
    }

    const dropsQuantitySum = [...crossGeksNumbers, number].map(item => getDropsNumber(item)).reduce((a, b) => a + b, 0);
    if ((crossGeksNumbers.length === 2 && dropsQuantitySum > MAX_DROPS_SUM)
        || (crossGeksNumbers.length === 2 && dropsQuantitySum < MIN_DROPS_SUM)) {
        return false;
    }

    return true;
}


const pickNumber = (geksInternal: GeksField[], crosses: number[][], numbers: number[], usedNumbers: number[]): number => {
    if (numbers.length === 0) {
        console.log(geksInternal, usedNumbers)
        throw new TypeError('No numbers in numbers');
    }

    const currentNumber = numbers.pop();

    if (crosses.every(c => validateNumber(geksInternal, c, currentNumber))) {
        numbers.push(...usedNumbers);
        return currentNumber;
    }

    return pickNumber(geksInternal, crosses, numbers, [...usedNumbers, currentNumber])
}

const pickMaterial = (geksInternal: GeksField[], crosses: number[][], materials: RawMaterialType[], usedMaterials: RawMaterialType[]): RawMaterialType => {

    if (materials.length === 0) {
        throw new TypeError('No materials in materialsInternal');
    }

    const currentMaterial = materials.pop();

    if (crosses.every(c => validateMaterial(geksInternal, c, currentMaterial))) {
        materials.push(...usedMaterials);
        return currentMaterial;
    }

    return pickMaterial(geksInternal, crosses, materials, [...usedMaterials, currentMaterial])

}

const validateMaterial = (geksInternal: GeksField[], cross: number[], material: RawMaterialType): boolean => {
    const crossGeks = cross.map(item => geksInternal.find(g => g.id === item)).filter(item => item);

    if (crossGeks.filter(item => item.RawMaterial === material).length === 2) {
        return false;
    }

    return true;
}