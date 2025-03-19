import { mergeConfig, defineConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    test: {
      // Vitest 独有配置
      environment: 'jsdom', // 浏览器环境模拟
      threads: true,
      isolate: false
    }
  },
  baseConfig
)
