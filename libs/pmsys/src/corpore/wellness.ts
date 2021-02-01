import {
  IDurationUnitValue,
  DurationUnitValue,
  ITimeFrame,
  SchemaID,
  SchemaVersion, IDataPoint
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

export interface IWellness_1_1 extends IWellness_1_0{
    soreness_area: number[];
}

export interface IWellness extends IWellness_1_1 {}


export function isWellness(t: any): t is IWellness {
    if (!('effective_time_frame' in t)) { return false; }
    if (typeof t.readiness !== 'number') { return false; }
    if (typeof t.fatigue !== 'number') { return false; }
    if (!('sleep' in t)) { return false; }
    if (typeof t.soreness === 'number') { return false; }
    if (!('sorness_area' in t)) { return false; }
    if (typeof t.stress !== 'number') { return false; }
    if (typeof t.mood !== 'number') { return false; }
    return true;
}

export function isWellnessDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IWellness> {
  if (val.header.schema_id.namespace !== WELLNESS_1_1_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== WELLNESS_1_1_SCHEMA.name) {return false;}
  if (! isWellness(val.body)) {return false;}
  return true
}



