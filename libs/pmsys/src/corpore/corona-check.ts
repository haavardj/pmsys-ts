import {
  ISchemaID,
  SchemaVersion,
  SchemaID,
} from '../omh';


const CORONA_CHECK_1_0_SCHEMA: ISchemaID = new SchemaID(
  'corporesano',
  'corona-check',
  new SchemaVersion(1, 0)
);

export interface ICoronaCheck {
  date_time: string;
  symptoms: boolean;
}

export function isCoronaCheck(t: any): t is ICoronaCheck{
  const i = t as ICoronaCheck;
  if (i.date_time === undefined) { return false; }
  if (i.symptoms === undefined) { return false; }
  return true;
}
