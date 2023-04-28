// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;
