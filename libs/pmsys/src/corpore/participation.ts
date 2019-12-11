import * as moment_ from 'moment';
const moment = moment_;
import { UUID } from 'angular2-uuid';

import {
    IDataPoint,
    ITimeFrame,
    CurrentDateTimeFrame,
    ISchemaID,
    SchemaID,
    SchemaVersion,
    IHeader,
    PMSYS_2_0_PROVENANCE
} from '../omh/index';

const PARTICIPATION_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'participation', new SchemaVersion(1, 0));

class PMSYSParticipationHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = PARTICIPATION_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}

}

export interface IParticipation {
    effective_time_frame: ITimeFrame;
    going: string;
    comment: string;
}

export class Participation implements IParticipation {
    static fromBasicValues (
        going: string,
        comment: string) {
        return new Participation(new CurrentDateTimeFrame(), going, comment);
    }

    constructor(
        public effective_time_frame: ITimeFrame,
        public going: string,
        public comment: string
    ) {}
}

export function isParticipation(t: any): t is IParticipation {
    const i = t as IParticipation;
    if (i.effective_time_frame === undefined) { return false; }
    if (i.going === undefined) { return false; }
    if (i.comment === undefined) { return false; }
    return true;
}

class ParticipationHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID =  PARTICIPATION_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}
}

export class ParticipationDataPoint implements IDataPoint<IParticipation> {

    header: IHeader;
    body: IParticipation;

    constructor(user_id: string, body: IParticipation) {
        this.header = new ParticipationHeader(user_id);
        this.body = body;
    }
}
