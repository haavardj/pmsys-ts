import {
  ITimeFrame,
  ISchemaID,
  SchemaID,
  SchemaVersion, IDataPoint,
} from '../omh';


export const PARTICIPATION_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'participation', new SchemaVersion(1, 0));

export interface IParticipation {
    effective_time_frame: ITimeFrame;
    going: string;
    comment: string;
}


export function isParticipation(t: any): t is IParticipation {

    if (!('effective_time_frame' in t)) { return false; }
    if ( typeof t.going !== 'string') { return false; }
    if ( typeof t.comment !== 'string') { return false; }
    return true;
}

export function isCoroneCheckDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IParticipation> {
  if (val.header.schema_id.namespace !== PARTICIPATION_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== PARTICIPATION_1_0_SCHEMA.name) {return false;}
  if (! isParticipation(val.body)) {return false;}
  return true
}
