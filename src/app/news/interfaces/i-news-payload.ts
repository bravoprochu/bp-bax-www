import { INewsArticle } from './i-news-article';

export interface INewsPayload {
    news: INewsArticle,
    isNext: boolean,
    isPrev: boolean,
    nextId: string,
    prevId: string
}