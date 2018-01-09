
export interface ISchemaID {
    namespace: string;
    name: string;
    version: string;
}

export class SchemaID implements ISchemaID {
    constructor(public namespace: string, public name: string, public version: string){};
}


