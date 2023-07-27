export function Singleton<T extends new (...args: any) => any>(
  cls: T,
  _context: ClassDecoratorContext<T>
) {
  let cache: T
  return class {
    constructor(...args: any[]) {
      if (cache) {
        return cache
      }
      cache = new cls(...args)
      return cache
    }
  } as T
}
