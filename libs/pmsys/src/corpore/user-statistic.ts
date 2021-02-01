import { IDataPoint, durationUnitValueToSeconds } from '../omh';
import { IWellness, isWellness } from './wellness';
import { ISessionRPE, isSessionRPE } from './session-rpe';

import { computeSessionRPE } from './session-rpe';

import * as moment_ from 'moment';
const moment = moment_;

import * as _ from 'lodash';
import {IParticipation, isParticipation} from './participation';
import {IInjury, isInjury} from './injury';
import {IGamePerformance, isGamePerformance} from "./game-performance";
import {IIllness, isIllness} from './illness';
import {IMenstrual, isMenstrual} from './menstrual';
import {ICoronaCheck, isCoronaCheck} from './corona-check';

export function dateCmp(a: string, b: string): number {
    return (new Date(a) > new Date(b) ? 1 : a < b ? -1 : 0);
}

export function datapointDateCmp(a: IDataPoint<unknown>, b: IDataPoint<unknown>): number {

  if (!a.header.effective_date_time) {
    return -1;
  }
  if (!b.header.effective_date_time) {
    return 1;
  }

  return (new Date(a.header.effective_date_time) > new Date(b.header.effective_date_time) ? 1 : a < b ? -1 : 0);
}


/*
 * Class for computing individual statistics from datapoints.
 */
export class UserStatistics  {

    private currentScoreValidityDays = 1;

    public srpeXData: string[] = [];
    public srpeYData: number[] = [];
    public exertion: number[] = [];

    public mood: number[] = [];
    public moodX: string[] = [];

    public readiness: number[] = [];
    public readinessX: string[] = [];

    public stress: number[] = [];
    public stressX: string[] = [];

    public soreness: number[] = [];
    public sorenessX: string[] = [];

    public fatigue: number[] = [];
    public fatigueX: string[] = [];

    public sleepDuration: number[] = [];
    public sleepQuality: number[] = [];
    public sleepX: string[] = [];

    public generalReadiness = -1;
    public localReadiness = -1;
    public injuryReadiness = -1;

    public currentFatigueScore = -1;
    public currentMoodScore = -1;
    public currentSleepQualityScore = -1;
    public currentSleepAmountScore = -1;
    public currentSorenessScore = -1;
    public currentStressScore = -1;

    public currentInjuryScore = -1;
    public currentLoadScore = -1;
    public currentStrainScore = -1;

    public currentTrendScore: number | null = null;

    public participateX: string[] = [];
    public participateGoing: string[] = [];
    public participateComment: string[] = [];

    public lastInjury: IInjury;

    /* Latest seen datapoints for different datatypes */
    public latestReport: { [key: string]: string} = {};

    /* Earliest seen datapoints for different datatypes */
    public earliestReport: { [key: string]: string} = {};

    /* storeas raw datapoints */
    public srpeData: IDataPoint<ISessionRPE>[] = [];
    public wellnessData: IDataPoint<IWellness>[] = [];
    public participationData: IDataPoint<IParticipation>[] = [];
    public injuryData: IDataPoint<IInjury>[] = [];
    public gamePerformanceData: IDataPoint<IGamePerformance>[] = [];
    public illnessData: IDataPoint<IIllness>[] = [];
    public menstrualData: IDataPoint<IMenstrual>[] = [];
    public coronaCheckData: IDataPoint<ICoronaCheck>[] = [];

    /* Indicates that a recompute is needed */
    private _dirty = false;

    public getLatest(name: string): string {

        return this.latestReport[name];
    }

    /*
     * Adds raw OMH datapoints to this user.
     *
     * recompute() must be called after new datapoints are inserted.
     */
    public addDataPoint(value: IDataPoint<any>) {

        if (value == null) { return; }

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
        } else if (isGamePerformance(value.body)) {
            this._dirty = true;
            this.gamePerformanceData.push(value);
        } else if (isIllness(value.body)) {
            this._dirty = true;
            this.illnessData.push(value);
        } else if (isMenstrual(value.body)) {
            this._dirty = true;
            this.menstrualData.push(value);
        } else if (isCoronaCheck(value.body)) {
            this._dirty = true;
            this.coronaCheckData.push(value);
        } else {
            throw new Error('Unknown user datatype');
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
        this.computeMensturalData();
        this.computeCoronaCheckData();
        this.computeGamePerfornamceData();
        this.computeIllnessData();
        this._dirty = false;
    }

    public setCurrentScoreDays(days: number): void {

        if (days !== this.currentScoreValidityDays) {
            this.currentScoreValidityDays = days;
            this.computeScores();
        }
    }

    private computeScores(offset= 1): void {

        const yesterday = moment().subtract(offset, 'day');
        const m = moment( _.last(this.fatigueX));

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

            this.currentTrendScore = null;

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
        if (this.wellnessData.length === 0) {
            return;
        }

        /* Make sure input array is sorted */
        this.wellnessData = this.wellnessData.sort((a: IDataPoint<IWellness>, b: IDataPoint<IWellness>) => {
          return datapointDateCmp(a, b);
        });

        if (this.wellnessData.length === 0) {
          return;
        }

        const latest: string | undefined = this.wellnessData[this.wellnessData.length - 1].header.effective_date_time;
        if (latest) {
          this.latestReport['wellness'] = latest;
        }

        const earliest: string | undefined = this.wellnessData[0].header.effective_date_time;
        if (earliest) {
        this.earliestReport['wellness'] = earliest;
        }

        for (const val of this.wellnessData) {

            const onDay = val.body.effective_time_frame.date_time;
            if (!onDay) {
              continue;
            }

            if (val.body.mood >= 1 && val.body.mood <= 5) {
                this.moodX.push(onDay);
                this.mood.push(val.body.mood);
            }

            if (val.body.fatigue >= 1 && val.body.fatigue <= 5) {
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
        this.participationData = this.participationData.sort((a: IDataPoint<IParticipation>, b: IDataPoint<IParticipation>) =>
            datapointDateCmp(a, b));

        if (this.participationData.length === 0) {
          return;
        }

        const latest: string | undefined = this.participationData[this.participationData.length - 1].header.effective_date_time;
        if (latest) {
          this.latestReport['participation'] = latest;
        }

        const earliest: string | undefined = this.participationData[0].header.effective_date_time;
        if (earliest) {
          this.earliestReport['participation'] = earliest;
        }

        for (const val of this.participationData) {

            const onDay = val.header.effective_date_time;
            if (!onDay) {
              continue;
            }
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
        this.injuryData = this.injuryData.sort((a: IDataPoint<IInjury>, b: IDataPoint<IInjury>) =>
            datapointDateCmp(a, b));

        if (this.injuryData.length === 0) {
          return;
        }

        const last: string | undefined = this.injuryData[this.injuryData.length - 1].header.effective_date_time;
        if (last) {
          this.latestReport['injury'] = last;
        }

        const earliest: string | undefined = this.injuryData[0].header.effective_date_time;
        if (earliest) {
          this.earliestReport['injury'] = earliest;
        }
        this.lastInjury = this.injuryData[this.injuryData.length -1 ].body;
    }

    /*
     * Update Session RPE data from set datapoints.
     */
    private computeSessionRPEData(): void {

        /* Skip if no data */
        if (this.srpeData.length === 0) {
                return;
        }


        /* Make sure input array is sorted */
        this.srpeData = this.srpeData.sort((a: IDataPoint<ISessionRPE>, b: IDataPoint<ISessionRPE>) =>
          datapointDateCmp(a, b))

        const latest: string | undefined = this.srpeData[this.srpeData.length - 1].header.effective_date_time;

        if (latest){
          this.latestReport['srpe'] = latest;
        }

        const earliest: string | undefined = this.srpeData[0].header.effective_date_time;

        if (earliest) {
          this.earliestReport['srpe'] = earliest;

        }



        for (const val of  this.srpeData) {

            const onDay = val.header.effective_date_time;
            if (!onDay) {
              continue;
            }

            this.srpeXData.push(onDay);
            this.srpeYData.push( computeSessionRPE(val) );
            this.exertion.push( val.body.perceived_exertion );
        }
    }


    private computeMensturalData(): void {

      /* Skip if no data */
      if (this.menstrualData.length === 0) {
        return;
      }

      /* Make sure input array is sorted */
      this.menstrualData = this.menstrualData.sort((a: IDataPoint<IMenstrual>, b: IDataPoint<IMenstrual>) =>
        datapointDateCmp(a, b));

      const last: string | undefined = this.menstrualData[this.menstrualData.length - 1].header.effective_date_time;

      if (last) {
        this.latestReport['menstrual'] = last;
      }

      const earliest: string | undefined = this.menstrualData[0].header.effective_date_time;
      if (earliest) {
        this.earliestReport['menstrual'] = earliest;
      }
    }


  private computeCoronaCheckData(): void {

    /* Skip if no data */
    if (this.coronaCheckData.length === 0) {
      return;
    }

    /* Make sure input array is sorted */
    this.coronaCheckData = this.coronaCheckData.sort((a: IDataPoint<ICoronaCheck>, b: IDataPoint<ICoronaCheck>) =>
      datapointDateCmp(a, b));

    const last: string | undefined = this.coronaCheckData[this.coronaCheckData.length - 1].header.effective_date_time;

    if (last) {
      this.latestReport['corona-check'] = last;
    }

    const earliest: string | undefined = this.coronaCheckData[this.coronaCheckData.length -1].header.effective_date_time;
    if (earliest){
      this.earliestReport['corona-check'] = earliest;
    }

  }

  private computeIllnessData(): void {

    /* Skip if no data */
    if (this.illnessData.length === 0) {
      return;
    }

    /* Make sure input array is sorted */
    this.illnessData = this.illnessData.sort((a: IDataPoint<IIllness>, b: IDataPoint<IIllness>) =>
      datapointDateCmp(a, b));

    const last: string | undefined = this.illnessData[this.illnessData.length -1].header.effective_date_time
    if (last) {
      this.latestReport['illness'] = last;
    }

    const earliest: string | undefined = this.illnessData[0].header.effective_date_time;
    if (earliest) {
      this.earliestReport['illness'] = earliest;
    }
  }

  private computeGamePerfornamceData(): void {

    /* Skip if no data */
    if (this.gamePerformanceData.length === 0) {
      return;
    }

    /* Make sure input array is sorted */
    this.gamePerformanceData = this.gamePerformanceData.sort((a: IDataPoint<IGamePerformance>, b: IDataPoint<IGamePerformance>) =>
      datapointDateCmp(a, b));


    const last: string | undefined = this.gamePerformanceData[this.gamePerformanceData.length - 1].header.effective_date_time;
    if (last) {
      this.latestReport['gamePerformance'] = last;
      return;
    }

    const earliest: string | undefined = this.gamePerformanceData[0].header.effective_date_time;
    if (earliest) {
      this.earliestReport['gamePerformance'] = earliest;
    }
  }
}


