import { IBaxModelSpecLine } from './i-bax-model-spec-line';

export interface IBaxModelSpecGroup {
    groupName: string;
    specLines: IBaxModelSpecLine[]
}