import * as moment from 'moment';

export type TimeUnit = 'ps' | 'ns' | 'us' | 'ms' | 'sec' | 'min' | 'h' | 'd' | 'wk' | 'Mo' | 'yr';
export type PartOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface ITimeFrame {
    date_time?: string;
    time_interval?: TimeInterval;
}

export class EmptyTimeFrame implements ITimeFrame {
    date_time = '';
}

export class CurrentDateTimeFrame implements ITimeFrame {
    date_time = '';
}


export class DateTimeFrame implements ITimeFrame {
    date_time: string;

    constructor(date_time: string) {
        this.date_time = date_time;
    }
}

export interface IDurationUnitValue {
    value: number;
    unit: TimeUnit;
}

export class DurationUnitValue implements IDurationUnitValue {
    public value: number;
    public unit: TimeUnit;

    constructor( value: number, unit: TimeUnit) {
        this.value = value;
        this.unit = unit;
    }
}

export interface IEndDateTimeInterval {
    end_date_time: string;
    duration: IDurationUnitValue;
}

export class EndDateTimeInterval implements IEndDateTimeInterval {
    public end_date_time: string;
    public duration: IDurationUnitValue;

    constructor(date: string, duration: IDurationUnitValue) {
        this.end_date_time = date;
        this.duration = duration;
    }
}

export interface IStartDateTimeInterval {
    start_date_time: string;
    duration: IDurationUnitValue;
}

export interface IStartAndEndDateTimeInterval {
    start_date_time: string;
    end_date_time: string;
}

export interface IPartOfDayTimeInterval {
    date: string;
    part_of_day: PartOfDay;
}

export type TimeInterval = IEndDateTimeInterval | IStartDateTimeInterval | IStartAndEndDateTimeInterval | IPartOfDayTimeInterval;

export function isDurationUnitValue(t: any): t is IDurationUnitValue {

  if (!t) {return false;}
  if (typeof t.value !== 'number') { return false;}
  if (typeof t.unit !== 'string') { return false;}
  return true;
}


export function isEndDateTimeInterval(t: TimeInterval): t is IEndDateTimeInterval {
    if (!t) { return false; }
    if (!('end_date_time' in t)) { return false;}
    if (!('duration' in t)) { return false;}
    return true;
}

export function isStartDateTimeInterval(t: TimeInterval): t is IStartDateTimeInterval {

  if (!t) {return false;}
  if ( !('start_date_time' in t)) {return false;}
  if ( !('duration' in t)) {return false;}
  return true;
}

export function isStartAndEndDateTimeInterval(t: TimeInterval): t is IStartAndEndDateTimeInterval {

  if (!t) {return false;}
  if ( !('start_date_time' in t)) {return false;}
  if ( !('end_date_time' in t)) {return false;}
  return true;
}

export function isPartOfDayTimeInterval(t: TimeInterval): t is IPartOfDayTimeInterval {
    if (!t) {return false;}
    if ( !('date' in t)) {return false;}
    if ( !('part_of_day' in t)) {return false;}
}

export function durationUnitValueToSeconds(a: IDurationUnitValue): number {

    switch (a.unit) {
        case 'ps':
            return a.value * 10 ** (-12);
        case 'ns':
            return a.value * 10 ** (-9);
        case 'us':
            return a.value * 10 ** (-6);
        case 'ms':
            return a.value * 10 ** (-3);
        case 'sec':
            return a.value * 1.0;
        case 'min':
            return a.value * 60.0;
        case 'h':
            return a.value * 60.0 * 60;
        case 'd':
            return a.value * 24 * 60.0 * 60.0;
        case 'wk':
            return a.value * 7 * 24 * 60.0 * 60.0;
        default:
            throw new Error('Unknown time unit ' + a.unit);
    }
}


export function toDurationInputArg2(unit: TimeUnit): moment.DurationInputArg2 {

    switch (unit) {
        case 'ps':
        case 'ns':
        case 'us':
            throw new Error('Time granularity ps/ns/us not supported.');
        case 'ms':
            return 'milliseconds';
        case 'sec':
            return 'seconds';
        case 'min':
            return 'minutes';
        case 'h':
            return 'hours';
        case 'd':
            return 'day';
        case 'wk':
            return 'weeks';
        case 'Mo':
            return 'months';
        case 'yr':
            return 'years';
        default:
            throw new Error('unknown timeunit ' + unit);
    }
}

/*
 * Return the end date from a time interval object.
 *
 * Throws an error for part-of-day interval objects.
 */
export function endDateTimeFromTimeInterval(t: TimeInterval): string {

  if (isEndDateTimeInterval(t)) {
    return t.end_date_time;
  }

  if (isStartDateTimeInterval(t)) {
    const num: number = durationUnitValueToSeconds(t.duration);
    const t2 = new Date(t.start_date_time);
    t2.setSeconds(t2.getSeconds() + num);
    return t2.toISOString();
  }

  if (isStartAndEndDateTimeInterval(t)) {
    return t.end_date_time;
  }

  if (isPartOfDayTimeInterval(t)) {
    throw new Error('Part-of-Day TimeIntervals are not supported');
  } else {
    throw new Error('Unsupported time interval type ' + t);
  }
}

export function durationFromTimeInterval(t: TimeInterval): IDurationUnitValue {

  if (isEndDateTimeInterval(t)){
    return t.duration;
  }

  if (isStartDateTimeInterval(t)){
    return t.duration;
  }

  if (isStartAndEndDateTimeInterval(t)){
    const val = moment(t.end_date_time).subtract(t.start_date_time).seconds();
    return  new DurationUnitValue(val, 'sec');
  }

  if (isPartOfDayTimeInterval(t)) {
    throw new Error('Part-of-Day TimeIntervals are not supported');
  } else {
    throw new Error('Unsupported time interval type ' + t);
  }

}
