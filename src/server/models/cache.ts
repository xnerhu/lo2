import {
  ICacheData,
  ICacheRefetchFunction,
  ICacheCanRefetchFunction,
} from '../interfaces';

export class CacheBox<T> {
  protected cachedData: ICacheData<T>;

  constructor(
    protected fetch: ICacheRefetchFunction<T>,
    protected canRefetch?: ICacheCanRefetchFunction<T>,
  ) {}

  public async data(force?: boolean) {
    if (
      force ||
      this.cachedData == null ||
      (this.canRefetch && this.canRefetch(this.cachedData))
    ) {
      await this.refetch();
    }

    return this.cachedData.data;
  }

  protected async refetch() {
    const data = await this.fetch();

    this.cachedData = {
      time: new Date(),
      data,
    };
  }
}
