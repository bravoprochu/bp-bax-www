import { IModelSpecSilnik } from './i-model-spec-silnik';
import { IModelSpecWymiar } from './i-model-spec-wymiar';
import { baxBaseModelType } from '../enums/bax-base-model-type-enum';
import { BaxMarka } from '../enums/bax-marka-enum';
import { IModelSpecMedia } from './i-model-spec-media';

export interface IModelSpec {
    isRevers?: boolean,
    isAwersDone?: boolean,
    marka: BaxMarka;
    media: IModelSpecMedia,
    model: string;
    typ: baxBaseModelType;
    waga_Kg?: number;
    waga_canopy_kg?: number;
    wymiary?: IModelSpecWymiar;
    wysokoscKopania?: number;
    silnik?: IModelSpecSilnik;
}