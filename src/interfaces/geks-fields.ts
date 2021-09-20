export interface GeksField {
    id: number;
    RawMaterial: RawMaterialType;
    cubeValue: number;
}

export interface GeksFieldInternal {
    id: number;
    RawMaterial?: RawMaterialType;
    number?: number;
}


export enum RawMaterialType {
    Desert = -1,
    Sea = 0,

    Clay = 1,
    Corn = 2,
    Mountain = 3,
    Forest = 4,
    Sheep = 5
}