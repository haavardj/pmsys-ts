import * as moment_ from 'moment';
const moment = moment_;
import { UUID } from 'angular2-uuid';

import {
  IDataPoint,
  ISchemaID,
  SchemaID,
  SchemaVersion,
  IHeader,
  PMSYS_2_0_PROVENANCE, ITimeFrame
} from '../omh/index';

const ILLNESS_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'illness', new SchemaVersion(1, 0));

class PMSYSIllnessHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = ILLNESS_1_0_SCHEMA;
    acquisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}
}

export interface IIllness {
    date_time: Date;
    problems: string[];
}

export class Illness implements IIllness {

    static fromBasicValues (
        date_time: Date,
        problems: string[]) {
        return new Illness(
            date_time,
            problems);
    }

    constructor(
        public date_time: Date,
        public problems: string[]
    ) {}
}

export function isIllness(t: any): t is IIllness {
    const i = t as IIllness;
    if (i.date_time === undefined) { return false; }
    if (i.problems === undefined) { return false; }
    return true;
}

class IllnessHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID =  ILLNESS_1_0_SCHEMA;
    acquisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}
}

export class IllnessDataPoint implements IDataPoint<IIllness> {
    header: IHeader;
    body: IIllness;

    constructor(user_id: string, body: IIllness) {
        this.header = new IllnessHeader(user_id);
        this.body = body;
    }
}
