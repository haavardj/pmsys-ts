import * as moment_ from 'moment';
const moment = moment_;
import { UUID } from 'angular2-uuid';

import {
    IDataPoint,
    ISchemaID,
    SchemaID,
    SchemaVersion,
    IHeader,
    PMSYS_2_0_PROVENANCE
} from '../omh/index';

const GAME_PERFORMANCE_1_0_SCHEMA: ISchemaID = new SchemaID('corporesano', 'gamePerformance', new SchemaVersion(1, 0));

class PMSYSGamePerformanceHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID = GAME_PERFORMANCE_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}
}

export interface IGamePerformance {
    game_datetime: Date;
    team_overall_performance: number;
    individual_defensive_performance: number;
    individual_offensive_performance: number;
}

export class GamePerformance implements IGamePerformance {
    static fromBasicValues (
        game_datetime: Date,
        team_overall_performance: number,
        individual_defensive_performance: number,
        individual_offensive_performance: number) {
        return new GamePerformance(
            game_datetime,
            team_overall_performance,
            individual_defensive_performance,
            individual_offensive_performance);
    }

    constructor(
        public game_datetime: Date,
        public team_overall_performance: number,
        public individual_defensive_performance: number,
        public individual_offensive_performance: number
    ) {}
}

export function isGamePerformance(t: any): t is IGamePerformance {
    const i = t as IGamePerformance;
    if (i.game_datetime === undefined) { return false; }
    if (i.team_overall_performance === undefined) { return false; }
    if (i.individual_defensive_performance === undefined) { return false; }
    if (i.individual_offensive_performance === undefined) { return false; }
    return true;
}

class GamePerformanceHeader implements IHeader {
    id = UUID.UUID();
    creation_date_time = moment.tz(moment.tz.guess()).toDate();
    schema_id: ISchemaID =  GAME_PERFORMANCE_1_0_SCHEMA;
    acuisition_provenance = PMSYS_2_0_PROVENANCE;

    constructor(public user_id: string) {}
}

export class GamePerformanceDataPoint implements IDataPoint<IGamePerformance> {
    header: IHeader;
    body: IGamePerformance;

    constructor(user_id: string, body: IGamePerformance) {
        this.header = new GamePerformanceHeader(user_id);
        this.body = body;
    }
}
