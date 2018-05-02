import moment from 'moment';

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

export const ValidBodyParts = [
    'head_neck',
    'chest',
    'stomach_back',
    'groin_hip',

    'left_shoulder',
    'left_upper_arm',
    'left_elbow',
    'left_forearm',
    'left_hand',
    'left_thigh',
    'left_knee',
    'left_leg',
    'left_foot',

    'right_shoulder',
    'right_upper_arm',
    'right_elbow',
    'right_forearm',
    'right_hand',
    'right_thigh',
    'right_knee',
    'right_leg',
    'right_foot',
    ];

export const ValidSeverities = [
    'normal',
    'minor',
    'major',
];

const INJURY_1_0_SCHEMA:ISchemaID = new SchemaID("corporesano", "injury", new SchemaVersion(1,0));

class PMSYSInjuryHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = INJURY_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {};
}

export interface IInjury {
    effective_time_frame: ITimeFrame;

    injuries: { [body_part: string]: string }
    comment: string;
}

export class Injury implements IInjury {
    static fromBasicValues (
        injuries: {},
        comment: string) {
        return new Injury(new CurrentDateTimeFrame(), injuries, comment);
    }

    constructor(
        public effective_time_frame: ITimeFrame,
        public injuries: {},
        public comment: string
    ) {};
}

export function isInjury(t:any): t is IInjury {
    let i = t as IInjury;
    if (i.effective_time_frame === undefined) { return false; }
    if (i.injuries === undefined) { return false; }
    if (i.comment === undefined) { return false; }
    return true;    
}

class InjuryHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID =  INJURY_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {};
}

export class InjuryDataPoint implements IDataPoint<IInjury> {
    
    header: IHeader;
    body: IInjury;
        
    constructor(user_id: string, body: IInjury) {
        this.header = new InjuryHeader(user_id);
        this.body = body;
    };
}
