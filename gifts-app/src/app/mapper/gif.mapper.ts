// recibir el objeto de la api de GIF

import { Gif } from "../gifts/interfaces/gif.interface";
import { GiphyImageData, GiphyResponse } from "../gifts/interfaces/giphy.interfaces";

export class GifMapper {
    static mapGiphyItemToGif(item: GiphyImageData ): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.original.url
        }
    }

    // recibir el objeto de la api de GIF
    static mapGiphyItemsToGiveArray(items: GiphyImageData[]): Gif[] {
        return items.map(item => this.mapGiphyItemToGif(item));
    }
}