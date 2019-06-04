import { IImageGalleryItem } from './i-image-gallery-item';

export interface IImageGallery {
    galleryName: string;
    id: string;
    imageGalleryItemList: IImageGalleryItem[];
    infoBgColor: string;
    tags: string[];
}