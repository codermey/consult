enum cacheType {
  LOCAL,
  SESSION
}

class Cache {
  storage: Storage
  constructor(type: cacheType) {
    this.storage = type === cacheType.LOCAL ? localStorage : sessionStorage
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(cacheType.LOCAL)
const sessionCache = new Cache(cacheType.SESSION)

export { localCache, sessionCache }
