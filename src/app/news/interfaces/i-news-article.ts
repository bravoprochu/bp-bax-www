import { INewsArticleTitle } from './i-news-article-title';

export interface INewsArticle {
    creationDate: string;
    title: INewsArticleTitle;
    id: string;
    imgUrl: string,
    text: any;
    youtubeEmbedUrl: any;
}
