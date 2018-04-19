import { IDataPoint, IEndDateTimeInterval, durationUnitValueToSeconds } from '../omh'; 
import { IWellness, isWellness } from './wellness';
import { ISessionRPE, isSessionRPE } from './session-rpe';

import { computeSessionRPE } from './session-rpe';

import moment from 'moment';
import * as _ from 'lodash';
import {IParticipation, isParticipation} from './participation';
import {IInjury, isInjury} from './injury';

declare let jStat: any;

export function dateCmp(a: Date, b:Date): number {       
    return (a > b ? 1 : a < b ? -1 : 0);
}


/*
 * Class for computing individual statistics from datapoints.
 */
export class UserStatistics  {

    private currentScoreValidityDays: number = 1;

    public srpeXData: Date[] = [];
    public srpeYData: number[] = [];
    public exertion: number[] = [];
    
    public mood: number[] = [];
    public moodX: Date[] = [];

    public readiness: number[] = [];
    public readinessX: Date[] = [];

    public stress: number[] = [];
    public stressX: Date[] = [];
    
    public soreness: number[] = [];
    public sorenessX: Date[] = [];

    public fatigue: number[] = [];
    public fatigueX: Date[] = [];

    public sleepDuration: number[] = [];
    public sleepQuality: number[] = [];
    public sleepX: Date[] = [];   

    public generalReadiness: number = -1;
    public localReadiness: number = -1;
    public injuryReadiness: number = -1;

    public currentFatigueScore: number = -1;
    public currentMoodScore: number = -1;
    public currentSleepQualityScore: number = -1;
    public currentSleepAmountScore: number = -1;
    public currentSorenessScore: number = -1;
    public currentStressScore: number = -1;

    public currentInjuryScore: number = -1;
    public currentLoadScore: number = -1;
    public currentStrainScore: number = -1;

    public currentTrendScore: number = null;

    public participateX: Date[] = [];
    public participateGoing: string[] = [];
    public participateComment: string[] = [];

    public lastInjury: IInjury;

    /* Latest seen datapoints for different datatypes */
    public latestReport: { [key:string]: Date} = {};

    /* Earliest seen datapoints for different datatypes */
    public earliestReport: { [key:string]: Date} = {};

    /* storeas raw datapoints */
    public srpeData: IDataPoint<ISessionRPE>[] = [];
    public wellnessData: IDataPoint<IWellness>[] = [];
    public participationData: IDataPoint<IParticipation>[] = [];
    public injuryData: IDataPoint<IInjury>[] = [];

    /* Indicates that a recompute is needed */
    private _dirty: boolean = false;
       
    public getLatest(name: string): Date {

        return this.latestReport[name];
    }

    /*
     * Adds raw OMH datapoints to this user. 
     * 
     * recompute() must be called after new datapoints are inserted.
     */
    public addDataPoint(value: IDataPoint<any>) {

        if (value == null) return;

        if (isSessionRPE(value.body)) {
            this._dirty = true;
            this.srpeData.push(value);
        } else if (isWellness(value.body)) {  
            this._dirty = true;
            this.wellnessData.push(value);
        } else if (isParticipation(value.body)) {
            this._dirty = true;
            this.participationData.push(value);
        } else if (isInjury(value.body)) {
            this._dirty = true;
            this.injuryData.push(value);
        } else {
            throw'Unknown user datatype';
        } 
    }
    
    public addDataPoints(value: IDataPoint<any>[]) {
        
        value.forEach( data => this.addDataPoint(data));             
    }

    /*
     * Compute all derived data from inserted datapoints. 
     */
    public recompute() {
        
        if (!this._dirty) { return; }

        this.computeWellnessData();
        this.computeSessionRPEData();
        this.computeScores();
        this.computeParticipationData();
        this.computeInjuryData();

        this._dirty = false;
    }
    
    public setCurrentScoreDays(days: number): void {
        
        if (days !== this.currentScoreValidityDays) {
            this.currentScoreValidityDays = days;
            this.computeScores();        
        }
    }
    
    private computeScores(offset=1): void {

        let yesterday = moment().subtract(offset, 'day');        
        let m = moment( _.last(this.fatigueX));
        
        if (m.isSameOrAfter(yesterday)) {            
            this.currentFatigueScore = _.last(this.fatigue); 
            this.currentMoodScore = _.last(this.mood); 
            this.currentSleepAmountScore = _.last(this.sleepDuration); 
            this.currentSleepQualityScore = _.last(this.sleepQuality);             
            this.currentSorenessScore = _.last(this.soreness);
            this.currentStressScore = _.last(this.stress);
            this.currentInjuryScore = -1;
            
            /* General Readiness */
            if (this.currentFatigueScore >= 3 && this.currentStressScore >= 3 && 
                this.currentMoodScore >= 3 && this.currentSleepQualityScore >= 3 &&
                this.currentSleepAmountScore >= 6) {
                
                this.generalReadiness = 1;                
            } else {
                this.generalReadiness = 0;
            }
            
            /* Local Readiness */
            if (this.currentFatigueScore >= 3 && this.currentSorenessScore >= 3) {
                this.localReadiness = 1;
            } else {
                this.localReadiness = 0;                                
            }
            
            /* Injury Readiness */
            this.injuryReadiness = -1;
            
            this.currentTrendScore = null            

            /* Load Score */
            this.currentLoadScore = _.last(this.srpeYData);
            
            this.currentStrainScore = -1; 

            
        } else {
            this.currentFatigueScore = -1;
            this.currentMoodScore = -1; 
            this.currentSleepAmountScore = -1; 
            this.currentSleepQualityScore = -1;             
            this.currentSorenessScore = -1;
            this.currentStressScore = -1;            
            this.currentTrendScore = null;            
            this.currentInjuryScore = -1;
            this.currentLoadScore = -1;
            this.currentStrainScore = -1;                         
        }        
    }
    
    private computeWellnessData(): void {        

        /* Skip if no data */
        if (this.wellnessData.length == 0) {
            return;
        }

        /* Make sure input array is sorted */
        this.wellnessData = this.wellnessData.sort((a:IDataPoint<IWellness>, b:IDataPoint<IWellness>) => 
            dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time ));

        this.latestReport['wellness'] =  this.wellnessData[this.wellnessData.length - 1].body.effective_time_frame.date_time;
        this.earliestReport['wellness'] = this.wellnessData[0].body.effective_time_frame.date_time;
        for (let val of this.wellnessData){
            
            let onDay = val.body.effective_time_frame.date_time;
            
            /* mood */
            let lastItem = this.moodX.length-1;
    
            if (val.body.mood >= 1 && val.body.mood <= 5) {
                this.moodX.push(onDay);
                this.mood.push(val.body.mood);
            }

            if (val.body.fatigue >=1 && val.body.fatigue <= 5) {
                this.fatigueX.push(onDay);
                this.fatigue.push(val.body.fatigue);
            }

            if (val.body.readiness >= 0 && val.body.readiness <= 10) {
                this.readinessX.push(onDay);
                this.readiness.push(val.body.readiness);
            }
            
            if (durationUnitValueToSeconds(val.body.sleep.duration) >= 0) {
                this.sleepX.push(onDay);
                this.sleepDuration.push(durationUnitValueToSeconds(val.body.sleep.duration));

                if (val.body.sleep.quality >= 1 && val.body.sleep.quality <= 5) {
                    this.sleepQuality.push(val.body.sleep.quality);
                }
            }
            
            if (val.body.soreness >= 1 && val.body.soreness <= 5) {
                this.sorenessX.push(onDay);
                this.soreness.push(val.body.soreness);
            }
            
            if (val.body.stress >= 1 && val.body.stress <= 5) {
                this.stressX.push(onDay);
                this.stress.push(val.body.stress);
            }
        }                       
    }

    private computeParticipationData(): void {

        /* Skip if no data */
        if (this.participationData.length === 0) {
            return;
        }

        /* Make sure input array is sorted */
        this.participationData = this.participationData.sort((a:IDataPoint<IParticipation>, b:IDataPoint<IParticipation>) =>
            dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time ));

        this.latestReport['participation'] =  this.participationData[this.participationData.length - 1].body.effective_time_frame.date_time;
        this.earliestReport['participation'] = this.participationData[0].body.effective_time_frame.date_time;
        for (let val of this.participationData){

            let onDay = val.body.effective_time_frame.date_time;

            this.participateX.push(onDay);
            this.participateGoing.push(val.body.going);
            this.participateComment.push(val.body.comment);
        }
    }

    private computeInjuryData(): void {

        /* Skip if no data */
        if (this.injuryData.length === 0) {
            return;
        }

        /* Make sure input array is sorted */
        this.injuryData = this.injuryData.sort((a:IDataPoint<IInjury>, b:IDataPoint<IInjury>) =>
            dateCmp(a.body.effective_time_frame.date_time, b.body.effective_time_frame.date_time ));

        let last = this.injuryData.length - 1;

        if (last < 0) {
            return;
        }

        this.latestReport['injury'] = this.injuryData[last].body.effective_time_frame.date_time;
        this.earliestReport['injury'] = this.injuryData[0].body.effective_time_frame.date_time;

        this.lastInjury = this.injuryData[last].body;
    }

    /*
     * Update Session RPE data from set datapoints.
     */
    private computeSessionRPEData(): void {

        /* Skip if no data */
        if (this.srpeData.length == 0) {
                return;
        }

        let idata:number[] = [];
        
        /* Make sure input array is sorted */
        this.srpeData = this.srpeData.sort(
                (a:IDataPoint<ISessionRPE>, b:IDataPoint<ISessionRPE>) => dateCmp((a.body.time_interval as IEndDateTimeInterval).end_date_time, 
                (b.body.time_interval as IEndDateTimeInterval).end_date_time));

        this.latestReport['srpe'] =  (this.srpeData[this.srpeData.length -1].body.time_interval as IEndDateTimeInterval).end_date_time;
        // this.latestReport['srpe'] = this.latestReport['srpe'] > onDay ? this.latestReport['srpe']: onDay;
        // this.earliestReport['srpe'] = this.earliestReport['srpe'] < onDay ? this.earliestReport['srpe']: onDay;
        this.earliestReport['srpe'] = (this.srpeData[0].body.time_interval as IEndDateTimeInterval).end_date_time;

        for (let val of  this.srpeData) {

            let onDay = new Date((val.body.time_interval as IEndDateTimeInterval).end_date_time);

            let lastItem = this.srpeXData.length-1;

            this.srpeXData.push(onDay);
            this.srpeYData.push( computeSessionRPE(val) );
            this.exertion.push( val.body.perceived_exertion );
            idata.push(1);
        }        
    }            
}


