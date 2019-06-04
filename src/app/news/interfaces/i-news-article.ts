import { INewsArticleTitle } from './i-news-article-title';
import { INewsArticleMini } from './i-news-article-mini';
import { IImageGallery } from 'src/app/shared/interfaces/i-image-gallery';

export interface INewsArticle {
    creationDate: string;
    title: INewsArticleTitle;
    id: string;
    imgUrl: string;
    imageGallery: IImageGallery;
    isActive?: boolean;
    isIntersected?: boolean;
    text: any;
    youtubeUrl?: any;
    youtubeEmbedUrl?: any;
    miniInfo?: INewsArticleMini;
}
