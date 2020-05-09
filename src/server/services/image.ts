class ImageService {
  public format(url: string, full?: boolean) {
    return full ? url : `${url}.thumbnail`;
  }
}

export default new ImageService();
