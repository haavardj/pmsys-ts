
import * as moment from 'moment';

import { UUID } from 'angular2-uuid';

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
    IHeader, 
    PMSYS_2_0_PROVENANCE
} from '../omh';

const SESSION_RPE_1_0_SCHEMA:ISchemaID = new SchemaID("corporesano", "srpe", new SchemaVersion(1,0));

class PMSYSRPEHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = SESSION_RPE_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {};

}

export class EmptyEndDateTimeSessionRPE implements ISessionRPE {
    activity_names: string[] = [];
    time_interval: TimeInterval = new EndDateTimeInterval(new Date(), new DurationUnitValue(0, 'min'));
    perceived_exertion: number = 0;
 }



/*
 * Compute session RPE value from datapoint. 
 * 
 * If recorded time interval is part of day, an error will be returned.
 */
export function computeSessionRPE(val: IDataPoint<ISessionRPE>): number{    
    
    let ti  = val.body.time_interval;

    if (isStartDateTimeInterval(ti)){
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;
    } else if (isEndDateTimeInterval(ti)){
        return val.body.perceived_exertion * durationUnitValueToSeconds(ti.duration) / 60;  
    } else if (isStartAndEndDateTimeInterval(ti)){
        let m = moment(ti.end_date_time);
        return val.body.perceived_exertion * m.diff(moment(ti.start_date_time), 'seconds', true) / 60; // true = floating point                
    } else if (isPartOfDayTimeInterval(ti)){
        throw "Part-of-Day time intervals are not supported for session RPE computations";         
    } else{
        throw "Not supported time interval type";                
    }    
}


export interface ISessionRPE{    
    activity_names: string[];
    time_interval: TimeInterval;
    perceived_exertion: number;
}


export class SessionRPE implements ISessionRPE{
    constructor(public activity_names:string[], public time_interval:TimeInterval, public perceived_exertion: number) {};

    static fromBasicValues( activity_names:string[], end_date_time:Date, durationInMinutes: number, perceived_exertion:number  ) : SessionRPE {
        return new SessionRPE(
            activity_names,
            new EndDateTimeInterval(end_date_time, new DurationUnitValue(durationInMinutes, 'min')),
            perceived_exertion)
    }
}

export function isSessionRPE(t:any): t is ISessionRPE{
    let i = t as ISessionRPE;
    if (i.activity_names === undefined) return false;
    if (i.time_interval === undefined) return false;
    if (i.perceived_exertion === undefined) return false;
    return true;    
}


export class SessionRPEDataPoint implements IDataPoint<ISessionRPE> {    
    
    header:IHeader;
    body: ISessionRPE;
        
    constructor(user_id: string, body: ISessionRPE) {
        this.header = new PMSYSRPEHeader(user_id);
        this.body = body;
    };
}
