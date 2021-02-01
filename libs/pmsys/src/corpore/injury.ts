import {
  ITimeFrame,
  ISchemaID,
  SchemaID,
  SchemaVersion, IDataPoint
} from '../omh';

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

export const INJURY_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'injury', new SchemaVersion(1, 0));

export interface IInjury {
    effective_time_frame: ITimeFrame;

    injuries: { [body_part: string]: string };
    comment: string;
}

export function isInjury(t: any): t is IInjury {
    if (!('effective_time_frame' in t)) { return false; }
    if (!('injuries' in t)) { return false; }
    if ( typeof t.comment !== 'string') { return false; }
    return true;
}

export function isInjuryDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IInjury> {
  if (val.header.schema_id.namespace !== INJURY_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== INJURY_1_0_SCHEMA.name) {return false;}
  if (! isInjury(val.body)) {return false;}
  return true
}
