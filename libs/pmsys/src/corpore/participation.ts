import {
    ITimeFrame,
    ISchemaID,
    SchemaID,
    SchemaVersion,
} from '../omh/index';

export const PARTICIPATION_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'participation', new SchemaVersion(1, 0));

export interface IParticipation {
    effective_time_frame: ITimeFrame;
    going: string;
    comment: string;
}


export function isParticipation(t: any): t is IParticipation {
    const i = t as IParticipation;
    if (i.effective_time_frame === undefined) { return false; }
    if (i.going === undefined) { return false; }
    if (i.comment === undefined) { return false; }
    return true;
}


