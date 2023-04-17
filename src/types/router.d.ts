/**
 * @description vue-router 类型
 */

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
