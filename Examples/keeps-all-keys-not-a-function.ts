

type NotFunctionKeys<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T]; // last part here is some union type loop magic - and doesn't include the ones having type 'never'
type ExcludeFunctionTypes<T> = Pick<T, NotFunctionKeys<T>>;

export interface IStore {
  isLoadingListview: boolean;
  setIsLoadingListView: (value: boolean) => void;
  
  dialogMinWidth: number;
  setDialogMinWidth: (value: number) => void;

  filterTagName: string;
  setFilterTagName: (value: string) => void;

  filterEntityName: string;
  setFilterEntityName: (value: string) => void;

  filterToggle: boolean;
  setFilterToggle: (value: boolean) => void;
}

export type InitTestState = Partial<ExcludeFunctionTypes<IStore>>;

