import { mergeConfig } from 'vite'
import baseConfig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      host: '0.0.0.0',
      cors: true, // 开启跨域
      proxy: {
        '/api': {
          // target: 'http://127.0.0.1:5009',
          target: 'http://47.239.49.84',
          changeOrigin: true, // 是否跨域
          rewrite: (path: string) => path.replace(/^\/api/, '') // 将 /api 前缀移除
        }
      }
    }
  },
  baseConfig
)
