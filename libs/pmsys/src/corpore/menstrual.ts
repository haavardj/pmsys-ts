import {
  ISchemaID,
  SchemaVersion,
  ITimeFrame,
  SchemaID,
} from '../omh';

export const MENSTUAL_1_0_SCHEMA: ISchemaID = new SchemaID(
  'corporesano',
  'menstrual',
  new SchemaVersion(1, 0)
);

export enum MenstrualFlow {
  Unspecified= "unspecified",
  None = "none",
  Light= "light",
  Medium = "medium",
  Heavy = "heavy"
}


export interface IMenstrual {
  flow: MenstrualFlow;
  time_frame: ITimeFrame;
  cycle_start: boolean;
}



export function isMenstrual(t: any): t is IMenstrual{
  const i = t as IMenstrual;
  if (i.flow === undefined) { return false; }
  if (i.time_frame === undefined) { return false; }
  if (i.cycle_start === undefined) { return false; }
  return true;
}
