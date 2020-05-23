import {
  IDataPoint,
  ISchemaID,
  SchemaVersion,
  IHeader,
  SchemaID,
  PMSYS_2_0_PROVENANCE
} from '../omh';


const CORONA_CHECK_1_0_SCHEMA: ISchemaID = new SchemaID(
  'corporesano',
  'corona-check',
  new SchemaVersion(1, 0)
);

export interface ICoronaCheck {
  date_time: Date;
  symptoms: boolean;
}

export class CoronaCheckHeader implements IHeader {
    schema_id: ISchemaID = CORONA_CHECK_1_0_SCHEMA;
    acquisition_provenance = PMSYS_2_0_PROVENANCE;
    constructor(public id: string, public creation_date_time: Date, public user_id: string) {}
}

export class CoronaCheck implements ICoronaCheck {
    constructor(public date_time: Date, public symptoms: boolean) {}
}

export class CoronaCheckDataPoint implements IDataPoint<ICoronaCheck> {
    header: IHeader;
    body: ICoronaCheck;

    constructor(id: string, creation_date_time: Date, user_id: string, body: ICoronaCheck ) {
      this.header = new CoronaCheckHeader(id, creation_date_time, user_id);
      this.body = body;
    }
}

export function isCoronaCheck(t: any): t is ICoronaCheck{
  const i = t as ICoronaCheck;
  if (i.date_time === undefined) { return false; }
  if (i.symptoms === undefined) { return false; }
  return true;
}
