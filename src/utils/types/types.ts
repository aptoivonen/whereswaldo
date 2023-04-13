export type AsyncReturnType<T> = T extends (
  ...args: unknown[]
) => Promise<infer R>
  ? R
  : never;
