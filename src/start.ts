import { getPackageJson, initProjectInfo } from './utils/env'
import { eslintInit } from './core/eslint'
import { vscodeInit } from './core/vscode'
import { hasElementInArrary } from './utils/tools'
import { answerType } from './interface'
import { vue3SpecialFn } from './core/vue3'
export const start = async (base: string, answers: answerType) => {
    const packagejson = await getPackageJson(base)

    const { vue3 = false, plugins = [] } = answers

    await initProjectInfo(packagejson)

    try {
        // 针对vue3 模板特殊处理
        vue3 && vue3SpecialFn()

        // 安装eslint 和prettier 并自动生成配置文件
        hasElementInArrary(plugins, 'eslint') && (await eslintInit())

        // 格式化VSCode格式
        hasElementInArrary(plugins, 'vscode') && (await vscodeInit())
    } catch (err) {
        console.error(JSON.stringify(err))
    }
}