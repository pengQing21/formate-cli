import path from 'path'
import fs from 'fs-extra'
import { checkVueVersion } from './check'

export const env = {
    base: '',
    isVue: false,
    isVue3: false,
    isVue2: false,
    isReact: false,
    isVueCli: false,
    isWebpack: false,
    isEslint: false
}
type envKeys = keyof typeof env

/**
 * @desc设置变量
 */

export const setEnv = (key: envKeys, val: any) => {

    env[key] = val as never
}
/**
 * @desc 获取变量
 */

export const getEnv = (key: envKeys) => {
    return env[key]
}

/**
 * @desc 把package.json转换成json
 */
export const getPackageJson = async (base: string = getEnv('base') as string) => {
    const file = path.resolve(base, 'package.json')
    const json = fs.readJSON(file)
    return json
}

export const initProjectInfo = async (packjson: any) => {
    const deps = {
        ...packjson.devDependencies, ...packjson.dependencies
    }
    if (deps['vue']) {
        setEnv('isVue', true)
        if (checkVueVersion(deps['vue']) === 2) {
            setEnv('isVue2', true)
        }
        if (checkVueVersion(deps['vue']) === 3) {
            setEnv('isVue3', true);
        }
    }

    if (deps['react']) {
        setEnv('isReact', true);
    }

    if (deps['eslint']) {
        setEnv('isEslint', true);
    }
    return true;
}