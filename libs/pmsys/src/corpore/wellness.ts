import {
    IDurationUnitValue,
    DurationUnitValue,
    ITimeFrame,
    SchemaID,
    SchemaVersion
    } from '../omh';



export interface ISleep {
   duration: IDurationUnitValue;
   quality: number;
}

export class EmptySleep implements ISleep {
    duration = new DurationUnitValue(0, 'min');
    quality = 0;
}

export const WELLNESS_1_0_SCHEMA = new SchemaID('corporesano', 'wellness', new SchemaVersion(1, 0));
export const WELLNESS_1_1_SCHEMA = new SchemaID('corporesano', 'wellness', new SchemaVersion(1, 1));


export interface IWellness_1_0 {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    stress: number;
    mood: number;
}

export interface IWellness_1_1 {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    soreness_area: number[];
    stress: number;
    mood: number;
}

export interface IWellness {
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    soreness_area: number[];
    stress: number;
    mood: number;
}


export function isWellness(t: any): t is IWellness {
    const i = t as IWellness;
    if (i.effective_time_frame === undefined) { return false; }
    if (i.readiness === undefined) { return false; }
    if (i.fatigue === undefined) { return false; }
    if (i.sleep === undefined) { return false; }
    if (i.soreness === undefined) { return false; }
    if (i.stress === undefined) { return false; }
    if (i.mood === undefined) { return false; }
    return true;
}


