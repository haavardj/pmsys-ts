import {
  ISchemaID,
  SchemaVersion,
  SchemaID, IDataPoint,
} from '../omh';

export const CORONA_CHECK_1_0_SCHEMA: ISchemaID = new SchemaID(
  'corporesano',
  'corona-check',
  new SchemaVersion(1, 0)
);

export interface ICoronaCheck {
  date_time: string;
  symptoms: boolean;
}

export function isCoronaCheck(t: any): t is ICoronaCheck{
  if ( typeof t.date_time !== 'string') { return false; }
  if ( typeof t.symptoms !== 'boolean') { return false; }
  return true;
}

export function isCoronaCheckDatapoint(val: IDataPoint<unknown>): val is IDataPoint<ICoronaCheck> {
  if (val.header.schema_id.namespace !== CORONA_CHECK_1_0_SCHEMA.namespace) {return false;}
  if (val.header.schema_id.name !== CORONA_CHECK_1_0_SCHEMA.name) {return false;}
  if (! isCoronaCheck(val.body)) {return false;}
  return true;
}
