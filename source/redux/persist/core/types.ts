export type PersistedFields = {
  [keyPath: string]: ReturnType<typeof JSON.parse>;
};
