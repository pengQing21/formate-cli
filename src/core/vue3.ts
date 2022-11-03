// vue3 的一些特殊处理
import fs from 'fs-extra'
import { getPackageJson, env } from '../utils/env'
import { getPath } from '../utils/path'

export const vue3SpecialFn = async () => {
    const { isVue3 } = env
    if (!isVue3) return
    let packagejson = await getPackageJson()
    if (packagejson.type) {
        delete packagejson.type
    }

    fs.writeJsonSync(getPath('package.json'), packagejson, { spaces: 2 });
    // 如果是vue3 的话 需要把package中的 type="module"去掉
}