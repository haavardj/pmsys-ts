import * as moment from 'moment';

import {
    IDataPoint,
    EndDateTimeInterval,
    TimeInterval,
    DurationUnitValue,
    isStartAndEndDateTimeInterval,
    isEndDateTimeInterval,
    isStartDateTimeInterval,
    isPartOfDayTimeInterval,
    durationUnitValueToSeconds,
    ISchemaID,
    SchemaID,
    SchemaVersion,
} from '../omh';

export const SESSION_RPE_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'srpe', new SchemaVersion(1, 0));

export interface ISessionRPE {
  activity_names: string[];
  time_interval: TimeInterval;
  perceived_exertion: number;
}

export function isSessionRPE(t: any): t is ISessionRPE {
  if ( !('activity_names' in t)) { return false; }
  if ( !('time_interval' in t)) { return false; }
  if ( typeof t.perceived_exertion !== 'number') { return false; }
  return true;
}

export class EmptyEndDateTimeSessionRPE implements ISessionRPE {
    activity_names: string[] = [];
    time_interval: TimeInterval = new EndDateTimeInterval(new Date().toISOString(), new DurationUnitValue(0, 'min'));
    perceived_exertion = 0;
 }



/*
 * Compute session RPE value from datapoint.
 *
 * If recorded time interval is part of day, an error will be returned.
 */
export function computeSessionRPE(val: IDataPoint<ISessionRPE>): number {

    const ti  = val.body.time_interval;

    if (isStartDateTimeInterval(ti)) {
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;
    } else if (isEndDateTimeInterval(ti)) {
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;
    } else if (isStartAndEndDateTimeInterval(ti)) {
        const m = moment(ti.end_date_time);
        return val.body.perceived_exertion * m.diff(moment(ti.start_date_time), 'seconds', true) / 60; // true = floating point
    } else if (isPartOfDayTimeInterval(ti)) {
        throw new Error('Part-of-Day time intervals are not supported for session RPE computations');
    } else {
        throw new Error('Not supported time interval type');
    }
}


export function isSessionRPEDatapoint(val: IDataPoint<unknown>): val is IDataPoint<ISessionRPE> {

  if (val.header.schema_id.namespace !== SESSION_RPE_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== SESSION_RPE_1_0_SCHEMA.name) {return false;}
  if (! isSessionRPE(val.body)) {return false;}
  return true
}

