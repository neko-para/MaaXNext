import type { ApplyPromiseReturn, ExtractKeys, ExtractPair, UnionToIntersection } from './utils'

type MainEvent = {
  MaaFrameworkLoader: {
    load: () => boolean
    dispose: () => void
    version: () => string | null
  }
}

type RealMainEvent = ApplyPromiseReturn<MainEvent>

type t = UnionToIntersection<ExtractPair<RealMainEvent>>
