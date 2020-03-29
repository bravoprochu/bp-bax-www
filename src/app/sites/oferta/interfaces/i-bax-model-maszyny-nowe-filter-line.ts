import { IBaxModelMaszynyNoweFilterTypeEnum } from '../enums/i-bax-model-maszyny-nowe-filter-type-enum';

export interface IBaxModelMaszynyNoweFilterLine {
    checkboxValue: boolean;
    checkboxFieldName: string;
    filterType: IBaxModelMaszynyNoweFilterTypeEnum;
    groupName: string;
    label: string;
    min?: number;
    max?: number;
    minFilter?: number;
    maxFilter?: number;
    name: string;
    searchPhrase: string;


}