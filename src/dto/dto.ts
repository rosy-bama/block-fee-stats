export class Block{
    id: number;
    level : number;
    hash: string;
    min: number;
    max: number;
    average: number;
    median: number;
}
export class Operation{
    contents: Contents;
}
export class Contents{
    kind: string;
    fee: string;
}