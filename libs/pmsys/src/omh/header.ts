import { ISchemaID } from './schemas';
import * as moment from 'moment';
import 'moment-timezone';

export type Modality = 'sensed' | 'self-reported';

export interface IAcquisitionProvenance {
    source_name: string;
    source_creation_date_time: string;
    modality: Modality;
}

export class AcquisitionProvenance implements IAcquisitionProvenance {
    constructor(public source_name: string, public source_creation_date_time: string, public modality: Modality) {}
}

export const PMSYS_2_0_PROVENANCE = new AcquisitionProvenance(
    'PMSYS-2-0',
    moment.tz(moment.tz.guess()).toISOString(),
    'self-reported');


export interface IHeaderV1 {
    id: string;
    creation_date_time: string;
    schema_id: ISchemaID;
    acquisition_provenance?: IAcquisitionProvenance;
    user_id: string;
}

export interface IHeader extends IHeaderV1{

  modified_date_time?: string;
  effective_date_time?: string;
}
