import DefaultTheme from 'vitepress/theme'

import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
// 点击图片放大插件
import mediumZoom from 'medium-zoom'

import './global.scss'

export default {
  ...DefaultTheme,
  setup() {
    const route = useRoute()
    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
