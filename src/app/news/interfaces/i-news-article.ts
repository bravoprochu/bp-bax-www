import { INewsArticleTitle } from './i-news-article-title';
import { INewsArticleMini } from './i-news-article-mini';

export interface INewsArticle {
    creationDate: string;
    title: INewsArticleTitle;
    id: string;
    isActive?: boolean;
    isIntersected?: boolean;
    imgUrl: string,
    text: any;
    youtubeUrl?: any;
    youtubeEmbedUrl?: any;
    miniInfo?: INewsArticleMini;
}
