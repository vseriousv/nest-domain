export type EntityFilter<T> = {
  [P in keyof T]?: EntityFilter<T[P]>;
};