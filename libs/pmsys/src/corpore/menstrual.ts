import {
  IDataPoint,
  ISchemaID,
  SchemaVersion,
  IHeader,
  ITimeFrame,
  SchemaID,
  PMSYS_2_0_PROVENANCE, EmptyTimeFrame
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

export class MenstrualHeader implements IHeader {
    schema_id: ISchemaID = MENSTUAL_1_0_SCHEMA;
    acquisition_provenance = PMSYS_2_0_PROVENANCE;
    constructor(public id: string,  public user_id: string, public creation_date_time: Date, public modified_date_time: Date, public effective_date_time: Date) {}
}

export class EmptyMenstrual implements IMenstrual {
  flow = MenstrualFlow.Unspecified;
  time_frame = new EmptyTimeFrame();
  cycle_start = true;
}

export class MenstrualDataPoint implements IDataPoint<IMenstrual> {
    header: IHeader;
    body: IMenstrual;

    constructor(id: string, user_id: string, created: Date, modified: Date, effective: Date, body: IMenstrual ) {
      this.header = new MenstrualHeader(id, user_id, created, modified, effective);
      this.body = body;
    }
}

export function isMenstrual(t: any): t is IMenstrual{
  const i = t as IMenstrual;
  if (i.flow === undefined) { return false; }
  if (i.time_frame === undefined) { return false; }
  if (i.cycle_start === undefined) { return false; }
  return true;
}
