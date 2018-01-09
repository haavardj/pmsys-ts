import * as moment from 'moment';

export type TimeUnit = 'ps' | 'ns' | 'us' | 'ms' | 'sec' | 'min' | 'h' | 'd' | 'wk' | 'Mo' | 'yr';
export type PartOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface ITimeFrame {
    date_time?: Date;
    time_interval?: TimeInterval;    
}

export class EmptyTimeFrame implements ITimeFrame {
    date_time = new Date();
}

export class CurrentDateTimeFrame implements ITimeFrame {
    date_time = new Date();
}


export class DateTimeFrame implements ITimeFrame {
    date_time: Date;

    constructor(date_time:Date) {
        this.date_time = date_time;
    }
}

export interface IDurationUnitValue {
    value: number;
    unit: TimeUnit;
}

export class DurationUnitValue implements IDurationUnitValue {
    public value: number;
    public unit:TimeUnit;   

    constructor( value: number, unit: TimeUnit) {
        this.value = value;
        this.unit = unit;        
    }
}

export interface IEndDateTimeInterval{
    end_date_time: Date;
    duration: IDurationUnitValue;
}

export class EndDateTimeInterval implements IEndDateTimeInterval {
    public end_date_time: Date; 
    public duration: IDurationUnitValue; 

    constructor(date: Date, duration: IDurationUnitValue) {
        this.end_date_time = date;
        this.duration = duration;         
    }    
}

export interface IStartDateTimeInterval{
    start_date_time: Date;
    duration: IDurationUnitValue;
}

export interface IStartAndEndDateTimeInterval{
    start_date_time: Date;
    end_date_time: Date;
}

export interface IPartOfDayTimeInterval{
    date: Date;
    part_of_day: PartOfDay;
}

export type TimeInterval = IEndDateTimeInterval | IStartDateTimeInterval | IStartAndEndDateTimeInterval | IPartOfDayTimeInterval;

export function isEndDateTimeInterval(t: TimeInterval): t is IEndDateTimeInterval {
    return (<IEndDateTimeInterval>t).end_date_time !== undefined && (<IEndDateTimeInterval>t).duration !== undefined; 
}

export function isStartDateTimeInterval(t: TimeInterval): t is IStartDateTimeInterval {
    return (<IStartDateTimeInterval>t).start_date_time !== undefined && (<IStartDateTimeInterval>t).duration !== undefined; 
}

export function isStartAndEndDateTimeInterval(t: TimeInterval): t is IStartAndEndDateTimeInterval {
    return (<IStartAndEndDateTimeInterval>t).start_date_time !== undefined && (<IStartAndEndDateTimeInterval>t).end_date_time !== undefined; 
}

export function isPartOfDayTimeInterval(t: TimeInterval): t is IPartOfDayTimeInterval {
    return (<IPartOfDayTimeInterval>t).part_of_day !== undefined; 
}    

   
export function durationUnitValueToSeconds(a:IDurationUnitValue): number {  
    
    switch (a.unit){
        case "ps":
            return a.value * 10**(-12);
        case "ns":
            return a.value * 10**(-9);
        case "us":
            return a.value * 10**(-6);
        case "ms":
            return a.value * 10**(-3);
        case "sec":
            return a.value * 1.0;
        case "min":
            return a.value * 60.0;
        case "h": 
            return a.value * 60.0 * 60;
        case "d":
            return a.value * 24 * 60.0 * 60.0; 
        case "wk":
            return a.value * 7* 24 * 60.0 * 60.0; 
        default:
            throw "Unknown time unit " + a.unit;    
    }        
}


export function toDurationInputArg2(unit:TimeUnit): moment.DurationInputArg2 {
    
    switch (unit) {
        case 'ps':
        case 'ns':
        case 'us':
            throw "Time granularity ps/ns/us not supported.";
        case 'ms':
            return 'milliseconds';
        case 'sec':
            return 'seconds'
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
            throw "unknown timeunit " + unit;
    }   
}

/*
 * Return the end date from a time interval object. 
 * 
 * Throws an error for part-of-day interval objects.
 */
export function endDateTimeFromTimeInterval(t:TimeInterval): Date{

    if (isEndDateTimeInterval(t)){
        return t.end_date_time;      
        
    } else if (isStartDateTimeInterval(t)){
        let num:number = durationUnitValueToSeconds(t.duration);
        let t2 = t.start_date_time;
        t2.setSeconds(t2.getSeconds() + num);
        return t2;               
        
    } else if (isStartAndEndDateTimeInterval(t)){
        return t.end_date_time;
        
    } else if (isPartOfDayTimeInterval(t)){
        throw "Part-of-Day TimeIntervals are not supported";                
    } else
        throw "Unsupported time interval type " + t;
}