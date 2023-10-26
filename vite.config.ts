import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import CdnImport, { autoComplete } from 'vite-plugin-cdn-import';
import ExternalGlobals from 'rollup-plugin-external-globals';

import VueDevTools from 'vite-plugin-vue-devtools';
import CompressionPlugin from 'vite-plugin-compression';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Imagemin from 'vite-plugin-imagemin';
import SvgLoader from 'vite-svg-loader';
import mkcert from 'vite-plugin-mkcert';

import { visualizer } from 'rollup-plugin-visualizer';

import autoprefixer from 'autoprefixer';

import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

import Icons from 'unplugin-icons/vite';

import Components from 'unplugin-vue-components/vite';

interface IMap {
  [key: string]: string;
}

const ENV_MAP: IMap = {
  dev: 'env/.env.dev',
  test: 'env/.env.test',
  prod: 'env/.env.prod'
};

// https://vitejs.dev/config/
export default ({ mode, command }: { mode: string; command: string }) => {
  console.log('url', import.meta.url);
  console.log('mode: ', mode);
  console.log('command: ', command);

  const dotEnv = dotenvExpand.expand(dotenv.config({ path: ENV_MAP[mode] }));

  const env = dotEnv.parsed;

  console.log('env: ', env);

  return defineConfig({
    define: {
      'process.env': env
    },

    base: env?.VITE_BASE_ROUTE,

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@element-plus/icons': 'element-plus/lib/icons'
      },
      extensions: ['.js', '.ts', '.json', '.vue', '.tsx']
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
        localsConvention: 'camelCase',
        hashPrefix: 'stable',
        generateScopedName: '[name]:[hash:base64:5]'
      },
      preprocessorOptions: {
        modules: {
          scopeBehaviour: 'local',
          localsConvention: 'camelCase',
          hashPrefix: 'stable'
        },
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('src/styles/global.less')}";`
          },
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
            grid: true
          })
        ]
      }
    },

    publicDir: 'static',

    plugins: [
      AutoImport({
        // Auto import functions from vue, e.g. ref, reactive, toRef...
        // 自动导入 vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          // ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],

        dts: path.resolve(__dirname, './typings/auto-imports.d.ts')
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],

        dts: path.resolve(__dirname, './typings/components.d.ts')
      }),

      vue(), //

      vueJsx(),

      SvgLoader(),

      mkcert(),

      Imagemin({
        // 无损压缩配置，无损压缩下图片质量不会变差
        optipng: {
          optimizationLevel: 7
        },
        // 有损压缩配置，有损压缩下图片质量可能会变差
        pngquant: {
          quality: [0.8, 0.9]
        },
        // svg 优化
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),

      Icons({
        autoInstall: true
      }),

      CompressionPlugin({
        ext: '.gz',
        algorithm: 'gzip',
        threshold: 10240,
        deleteOriginFile: false
      }),

      VueDevTools(),

      visualizer({
        open: true,
        filename: './dist/stats.html'
      }),

      {
        ...ExternalGlobals({
          vue: 'Vue',
          'vue-router': 'VueRouter'
        }),
        enforce: 'post',
        apply: 'build'
      },

      CdnImport({
        modules: [
          autoComplete('vue'),
          {
            name: 'vue-demi',
            var: 'VueDemi',
            path: 'https://unpkg.com/vue-demi@0.14.6/lib/index.iife.js'
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: 'https://unpkg.com/vue-router@4.2.4/dist/vue-router.global.js'
          },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: 'https://unpkg.com/element-plus@2.3.14/dist/index.full.js',
            css: 'https://unpkg.com/element-plus@2.3.14/dist/index.css'
          }
        ]
      })
    ],

    build: {
      outDir: 'dist',

      target: 'modules',

      // cssTarget: '',

      cssMinify: true,

      // js和图片资源
      assetsDir: 'assets',

      // 小于 0k 的资源，可以内联成base64
      assetsInlineLimit: 0,

      // css单独打包
      cssCodeSplit: true,

      // 默认是 esbuild
      minify: 'terser',

      emptyOutDir: true,

      modulePreload: {
        polyfill: true
      },

      terserOptions: {
        compress: {
          drop_console: mode === 'prod',
          drop_debugger: mode === 'prod'
        }
      },

      sourcemap: command === 'build',

      // chunk 大小警告
      chunkSizeWarningLimit: 800,

      rollupOptions: {
        external: ['element-plus', 'vue', 'vue-router'],

        output: {
          globals: {
            vue: 'vue',
            'vue-demi': 'VueDemi',
            'vue-router': 'VueRouter',
            'element-plus': 'ElementPlus'
          },

          chunkFileNames: 'js/[name]-[hash].js',

          entryFileNames: 'js/[name]-[hash].js',

          assetFileNames: 'assets/[name]-[hash].[ext]',

          manualChunks: {
            // vendor: ['vue', 'vue-router', 'pinia'],
            axios: ['axios'],
            utils: ['dayjs', 'js-cookie'],
            xlsx: ['xlsx']
          }
        }
      }
    },

    optimizeDeps: {
      force: true,

      // 按需加载的依赖
      include: ['axios', 'dayjs']

      // exclude: ['vue', 'element-plus']
    },

    json: {
      namedExports: true,
      stringify: false
    },

    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
      // jsxInject: "import { h } from 'vue'"
    },

    server: {
      port: 8037,

      // 监听所有可用的网络接口
      host: '0.0.0.0',

      https: false

      // proxy: {
      //   '/api': {
      //     target: 'https://trident-test.oa.wanmei.net',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: path => {
      //       const url = path.replace(/^\/api/, '/pat2_api');
      //       console.log('path url: ', url);
      //       return url;
      //     }
      //   }
      // }
    }
  });
};
