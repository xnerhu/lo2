export interface IColumn<T> {
  _id: number;
  list: T[];
}

export const getColumns = <T>(data: T[], count: number): IColumn<T>[] => {
  const columns: Array<IColumn<any>> = new Array();

  data.forEach((r, index) => {
    const chunkIndex = index % count;

    if (!columns[chunkIndex]) {
      columns[chunkIndex] = { _id: (r as any)._id, list: [] };
    }

    columns[chunkIndex].list.push(r);
  });

  return columns;
}
