import { IBaxModelMaszynyNoweFilterLine } from './i-bax-model-maszyny-nowe-filter-line';
import { IBaxModelMaszynyNoweFilterGroup } from './i-bax-model-maszyny-nowe-filter-group';

export interface IBaxModelFilter {
    searchArr: IBaxModelMaszynyNoweFilterLine[],
    numberArr: IBaxModelMaszynyNoweFilterLine[],
    checkboxGroups: {
        branza: IBaxModelMaszynyNoweFilterLine[],
        marka: IBaxModelMaszynyNoweFilterLine[],
        zasilanie: IBaxModelMaszynyNoweFilterLine[]
    }
}