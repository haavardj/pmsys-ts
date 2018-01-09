// Profile holds personal user information

export interface IProfile {
    id:string;
    given_name: string;
    family_name: string;
    nick_name: string;
    name: string;
    updated_at: Date;
    picture: string;
    email: string
}


export class EmptyProfile implements IProfile {

    given_name: string = "";
    family_name: string = "";
    nick_name: string = "";
    name: string = "";
    updated_at: Date = new Date();
    picture: "";
    email: "";

    constructor(public id: string) {}
}