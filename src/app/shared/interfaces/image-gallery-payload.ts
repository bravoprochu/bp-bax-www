import { IImageGalleryPayload } from './i-image-gallery-payload';
import { IImageGalleryItem } from './i-image-gallery-item';

export class ImageGalleryPayload implements IImageGalleryPayload {
    /**
     *
     */
    constructor(
        public imageGalleryItemList: IImageGalleryItem[] = [], 
        public currentIndex: number=0
        ) {
    }

    private get _current():IImageGalleryItem {
        return this.imageGalleryItemList[this.currentIndex];
    }

    get description():string {
        return this._current.description;
    }

    get imgUrl():string {
        return this._current.imgUrl;
    }

    get infoBgColor():string {
        return this._current.infoBgColor;
    }

    get isNext():boolean {
        return this.currentIndex < (this.imageGalleryItemList.length-1);
    }

    get isPrev():boolean {
        return this.currentIndex > 0;
    }

    get title():string {
        return this._current.title;
    }
    
    get subtitle():string {
        return this._current.subtitle;
    }

    next() {
        if(this.isNext) {
            this.currentIndex++;
        }
    }
    prev(){
        if(this.isPrev) {
            this.currentIndex--;
        }
    }

    

    


}