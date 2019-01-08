import { IBrickColors } from "./i-brick-colors";

export interface IBrickInfo {
    imageUrl: string,
    title: string,
    colors: IBrickColors,
    url?: string
}