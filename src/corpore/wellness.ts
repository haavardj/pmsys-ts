import { 
    IDurationUnitValue, 
    DurationUnitValue, 
    ITimeFrame, 
    EmptyTimeFrame, 
    CurrentDateTimeFrame, 
    DateTimeFrame, 
    ISchemaID, 
    SchemaID, 
    SchemaVersion,
    IHeader, 
    PMSYS_2_0_PROVENANCE, 
    IDataPoint } from '../omh/index';

import { UUID } from 'angular2-uuid';

import * as moment from 'moment';

export interface ISleep{
   duration: IDurationUnitValue;
   quality: number;
}

export class EmptySleep implements ISleep {
    duration = new DurationUnitValue(0, 'min');
    quality = 0;
}

export class Sleep implements ISleep {
    constructor(public duration: DurationUnitValue, public quality: number) {}

    static fromBasicValues( durationInMinutes: number, quality: number ) {
        return new Sleep( new DurationUnitValue(durationInMinutes, 'min'), quality);
    }
}

export const WELLNESS_1_0_SCHEMA = new SchemaID('corporesano', 'wellness', new SchemaVersion(1,0));


export interface IWellness{
    effective_time_frame: ITimeFrame;
    readiness: number;
    fatigue: number;
    sleep: ISleep;
    soreness: number;
    stress: number;
    mood: number;    
}

export class Wellness implements IWellness{
    constructor(
        public effective_time_frame: ITimeFrame, 
        public readiness: number, 
        public fatigue:number, 
        public sleep: ISleep,
        public soreness: number,
        public stress: number,
        public mood: number) {};


        static fromBasicValues ( 
            date:Date, 
            readiness:number, 
            fatigue: number, 
            sleepQuality: number, 
            sleepMinutes:number, 
            soreness: number,
            stress: number,
            mood: number): Wellness {

                return new Wellness( 
                    new CurrentDateTimeFrame(), 
                    readiness, 
                    fatigue, 
                    Sleep.fromBasicValues(sleepMinutes, sleepQuality),
                    soreness, stress, mood );
            }
}




export function isWellness(t:any): t is IWellness{
    let i = t as IWellness;
    if (i.effective_time_frame === undefined) return false;
    if (i.readiness === undefined) return false;
    if (i.fatigue === undefined) return false;
    if (i.sleep === undefined) return false;
    if (i.soreness === undefined) return false;
    if (i.stress === undefined) return false;
    if (i.mood === undefined) return false;    
    return true;    
}

class WellnessHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID =  WELLNESS_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {};
}


export class WellnessDataPoint implements IDataPoint<IWellness> {
   
    public header: IHeader;
    public body: IWellness;
        
    constructor(user_id:string, body: IWellness) {
        this.header = new WellnessHeader(user_id);
        this.body = body;
    }
}
