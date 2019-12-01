export interface IGallerySection {
  year?: number;
  label?: string;
  albums?: IGalleryAlbum[];
}

export interface IGalleryAlbum {
  _id?: number;
  title?: string;
  createdAt?: Date | string;
  image?: string;
  _authorId?: number;
  pictures?: IGalleryPicture[];
}

export interface IGalleryPicture {
  _id?: number;
  _albumId?: number;
  name?: string;
  createdAt?: Date;
}
