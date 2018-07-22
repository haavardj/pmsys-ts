export interface IUnitValue {
    value: number;
    unit: string;
}

export class UnitValue implements IUnitValue {

    constructor(public value:number, public unit:string) {};
}

