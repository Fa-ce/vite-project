import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        VueSetupExtend(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            // element-plus 组件自动按需引入
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass', // 引入样式
                    // 这里可以配置其他 Element Plus 的选项
                }),
            ],
            eslintrc: {
                enable: true, // 启用 ESLint 自动导入
            },
        }),
        Components([
            // 组件快速引入配置
            {
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass', // 引入样式
                    }),
                ],
                // dirs: ["src/components"], // 组件目录
                // directoryAsNamespace: true, // 目录作为命名空间
            },
        ]),
    ],
    resolve: {
        alias: {
            find: '/@', // 要被替换的路径
            replacement: resolve(__dirname, 'src'), // 替换成的路径
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/element/index.scss" as * `, // 引入全局样式变量
            },
        },
    },
})
