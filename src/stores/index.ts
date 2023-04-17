import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistedstate)

export default pinia

export * from './modules/home'
export * from './modules/consult'
export * from './modules/login'
export * from './modules/user'
// export * from './modules/order'
