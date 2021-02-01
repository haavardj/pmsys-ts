import { IDataPointQuery } from '../omh';

export interface ITeamQueryInput {
    id: string;
}

export interface ITeamShort {
    name: string;
    id: string;
}

export interface ITeam extends ITeamShort {

    email: string;
    description: string;
    players: Array<string>;
    coaches: Array<string>;
}

export function isTeamShort(t: any): t is ITeamShort {

    if (typeof t.name !== 'string') {return false; }
    if (typeof t.id !== 'string') {return false; }
    return true;
}

export function isTeam(t: any): t is ITeam {

    if (isTeamShort(t) === false) {return false; }
    if (!('players' in t)) {return false; }
    if (!('coaches' in t)) {return false; }
    return true;
}


export interface ITeamDataQuery extends IDataPointQuery {
    teamId: string;
}
