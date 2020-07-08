
import {
    ITimeFrame,
    ISchemaID,
    SchemaID,
    SchemaVersion
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

export const INJURY_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'injury', new SchemaVersion(1, 0));

export interface IInjury {
    effective_time_frame: ITimeFrame;

    injuries: { [body_part: string]: string };
    comment: string;
}

export function isInjury(t: any): t is IInjury {
    const i = t as IInjury;
    if (i.effective_time_frame === undefined) { return false; }
    if (i.injuries === undefined) { return false; }
    if (i.comment === undefined) { return false; }
    return true;
}

