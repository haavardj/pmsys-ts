import {
  ISchemaID,
  SchemaVersion,
  ITimeFrame,
  SchemaID, IDataPoint,
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
  if (!('flow' in t)) { return false; }
  if (!('time_frame' in t)) { return false; }
  if (typeof t.cycle_start !== 'boolean') { return false; }
  return true;
}

export function isMenstrualDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IMenstrual> {
  if (val.header.schema_id.namespace !== MENSTUAL_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== MENSTUAL_1_0_SCHEMA.name) {return false;}
  if (! isMenstrual(val.body)) {return false;}
  return true;
}
