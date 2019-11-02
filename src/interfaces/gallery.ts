export interface IGallerySection {
  year?: number;
  label?: string;
  albums?: IGalleryAlbum[];
}

export interface IGalleryAlbum {
  _id?: number;
  title?: string;
  images?: string[];
  createdAt?: Date;
  image?: string;
  _authorId?: number;
}
