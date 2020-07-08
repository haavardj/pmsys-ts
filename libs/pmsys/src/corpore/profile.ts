// Profile holds personal user information

export interface IProfile {
    sub: string;
    given_name: string;
    family_name: string;
    nick_name: string;
    name: string;
    updated_at: string;
    picture: string;
    email: string;
}


export class EmptyProfile implements IProfile {
    given_name = '';
    family_name = '';
    nick_name = '';
    name = '';
    updated_at = '';
    picture: '';
    email: '';

    constructor(public sub: string) {}
}
