
export interface ISchemaID {
    namespace: string;
    name: string;
    version: ISchemaVersion;
}

export interface ISchemaVersion {
    major: number;
    minor: number;
}

export class SchemaVersion implements ISchemaVersion {
    constructor(public major: number, public minor: number) {}
}

export class SchemaID implements ISchemaID {
    constructor(public namespace: string, public name: string, public version: ISchemaVersion) {}
}


