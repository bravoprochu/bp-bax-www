import { IImageGalleryItem } from './i-image-gallery-item';

export interface IImageGalleryPayload {
    currentIndex: number;
    imageGalleryItemList: IImageGalleryItem[];
}