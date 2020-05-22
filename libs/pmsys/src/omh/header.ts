import { ISchemaID } from './schemas';
import * as moment from 'moment';
import 'moment-timezone';

export type Modality = 'sensed' | 'self-reported';

export interface IAcquisitionProvenance {
    source_name: string;
    source_creation_date_time: Date;
    modality: Modality;
}

export class AcquisitionProvenance implements IAcquisitionProvenance {
    constructor(public source_name: string, public source_creation_date_time: Date, public modality: Modality) {}
}

export const PMSYS_2_0_PROVENANCE = new AcquisitionProvenance(
    'PMSYS-2-0',
    moment.tz(moment.tz.guess()).toDate(),
    'self-reported');


export interface IHeader {
    id: string;
    creation_date_time: Date;
    schema_id: ISchemaID;
    acquisition_provenance?: IAcquisitionProvenance;
    user_id: string;
}
