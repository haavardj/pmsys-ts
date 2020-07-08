import {
  ISchemaID,
  SchemaID,
  SchemaVersion,
} from '../omh';

export const GAME_PERFORMANCE_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'gamePerformance', new SchemaVersion(1, 0));

export interface IGamePerformance {
    date_time: string;
    ref: string;
    team_overall_performance: number;
    individual_defensive_performance: number;
    individual_offensive_performance: number;
}


export function isGamePerformance(t: any): t is IGamePerformance {
    const i = t as IGamePerformance;
    if (i.date_time === undefined) { return false; }
    if (i.ref === undefined) { return false; }
    if (i.team_overall_performance === undefined) { return false; }
    if (i.individual_defensive_performance === undefined) { return false; }
    if (i.individual_offensive_performance === undefined) { return false; }
    return true;
}
