export type ExtractPair<
  T,
  PF extends string = '',
  _ks extends keyof T & string = keyof T & string
> = _ks extends unknown
  ? T[_ks] extends (...args: any[]) => any
    ? {
        [key in `${PF}${_ks}`]: T[_ks]
      }
    : ExtractPair<T[_ks], `${PF}${_ks}.`>
  : never

export type ExtractKeys<
  T,
  PF extends string = '',
  _ks extends keyof T & string = keyof T & string
> = _ks extends unknown
  ? T[_ks] extends (...args: any[]) => any
    ? `${PF}${_ks}`
    : ExtractKeys<T[_ks], `${PF}${_ks}.`>
  : never

type WithPromise<T> = [T] extends [Promise<infer X>] ? T : Promise<T>

type PromiseReturn<Func extends (...args: any[]) => any> = Func extends (...args: [...infer Args]) => infer Ret
  ? (...args: Args) => WithPromise<Ret>
  : never

export type ApplyPromiseReturn<T> = {
  [key in keyof T & string]: T[key] extends (...args: any[]) => any ? PromiseReturn<T[key]> : ApplyPromiseReturn<T[key]>
}

export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never
