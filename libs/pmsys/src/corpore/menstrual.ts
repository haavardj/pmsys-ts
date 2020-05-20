import moment from 'moment-timezone';

import { UUID } from 'angular2-uuid';

import {
  IDataPoint,
  ISchemaID,
  SchemaVersion,
  IHeader,
  ITimeFrame,
  SchemaID,
  PMSYS_2_0_PROVENANCE, EmptyTimeFrame
} from '../omh';

const MENSTUAL_1_0_SCHEMA: ISchemaID = new SchemaID(
  'corporesano',
  'menstrual',
  new SchemaVersion(1, 0)
);

enum MenstrualFlow {
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

class PMSYSMenstrualHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = MENSTUAL_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}

}

export class EmptyMenstrual implements IMenstrual {
  flow = MenstrualFlow.Unspecified;
  time_frame = new EmptyTimeFrame();
  cycle_start = true;
}

export class MenstrualDataPoint implements IDataPoint<IMenstrual> {
    header: IHeader;
    body: IMenstrual;
}
