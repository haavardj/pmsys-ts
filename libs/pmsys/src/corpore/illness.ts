import {
  IDataPoint,
  ISchemaID,
  SchemaID,
  SchemaVersion,
} from '../omh';
import {isCoronaCheck} from './corona-check';

export const ILLNESS_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'illness', new SchemaVersion(1, 0));

export interface IIllness {
    date_time: string;
    problems: string[];
}

export function isIllness(t: any): t is IIllness {

    if (typeof t.date_time !== 'string') { return false; }
    if (!('problems' in t)) { return false; }
    return true;
}

export function isIllnessDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IIllness> {
  if (val.header.schema_id.namespace !== ILLNESS_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== ILLNESS_1_0_SCHEMA.name) {return false;}
  if (! isCoronaCheck(val.body)) {return false;}
  return true;
}
