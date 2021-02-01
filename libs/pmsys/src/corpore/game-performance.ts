import {
  IDataPoint,
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
    if (typeof t.date_time !== 'string') { return false; }
    if (typeof t.ref !== 'string') { return false; }
    if (typeof t.team_overall_performance !== 'number') { return false; }
    if (typeof t.individual_defensive_performance !== 'number') { return false; }
    if (typeof t.individual_offensive_performance !== 'number') { return false; }
    return true;
}

export function isGamePerformanceDatapoint(val: IDataPoint<unknown>): val is IDataPoint<IGamePerformance> {
  if (val.header.schema_id.namespace !== GAME_PERFORMANCE_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== GAME_PERFORMANCE_1_0_SCHEMA.name) {return false;}
  if (! isGamePerformance(val.body)) {return false;}
  return true
}
