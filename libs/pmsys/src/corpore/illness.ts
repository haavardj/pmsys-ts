import * as moment_ from 'moment';

import {
  IDataPoint,
  ISchemaID,
  SchemaID,
  SchemaVersion,
  IHeader,
  PMSYS_2_0_PROVENANCE, ITimeFrame
} from '../omh/index';

const ILLNESS_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'illness', new SchemaVersion(1, 0));

export interface IIllness {
    date_time: string;
    problems: string[];
}

export function isIllness(t: any): t is IIllness {
    const i = t as IIllness;
    if (i.date_time === undefined) { return false; }
    if (i.problems === undefined) { return false; }
    return true;
}
