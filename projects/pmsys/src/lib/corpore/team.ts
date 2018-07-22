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
    description: string
    players: Array<string>;
    coaches: Array<string>;
}

export function isTeamShort(t: any): t is ITeamShort {
    let i = t as ITeam;
    if (i.name === undefined) {return false};
    if (i.id === undefined) {return false};
    return true
}

export function isTeam(t: any): t is ITeam {
    let i = t as ITeam;
   
    if (isTeamShort(t) === false) {return false;}
    if (i.players === undefined) {return false;}
    if (i.coaches === undefined) {return false;}    
    return true
}


export interface ITeamDataQuery extends IDataPointQuery{
    teamId: string;
}
