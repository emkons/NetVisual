interface Map<K, V> {
  clear(): void;
  delete(key: K): boolean;
  entries(): Array<[K, V]>;
  forEach(
    callbackfn: (value: V, index: K, map: Map<K, V>) => void,
    thisArg?: any
  ): void;
  get(key: K): V;
  has(key: K): boolean;
  set(key: K, value?: V): Map<K, V>;
  keys(): Array<K>;
  size: number;
  values(): Iterable<V>;
}

interface MapConstructor {
  new <K, V>(): Map<K, V>;
  prototype: Map<any, any>;
}
declare var Map: MapConstructor;
