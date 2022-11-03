import spawn from 'cross-spawn'
import fs from 'fs-extra'

import { getEnv, getPackageJson } from './env'
import { checkNpmOrYarn } from './check'
import { getPath } from './path'

export const hasElementInArrary = (list: Array<String>, element: String) => {
    return list.indexOf(element) !== -1 ? element : ''
}

export const down = async (runName: string | string[], type: string) => {
    const basePath = getEnv('base') as string
    const [n, i] = await checkNpmOrYarn(basePath)
    if (typeof runName === 'string') {
        await spawnSync(n, i, runName, type, basePath)
        return false
    }

    runName.forEach(async (runItem) => {
        console.log(`down ${runItem}✅`)
        await spawnSync(n, i, runItem, type, basePath)
    })
}


export const spawnSync = (n: string, i: string, runItem: string, type: string, basePath: string) => {
    return new Promise((resolve) => {
        spawn.sync(n, [i, runItem, type], {
            stdio: 'pipe',
            cwd: basePath
        })
        console.log(`${runItem}✅`)
        resolve({ success: true })
    })
}


export const writeInPackageJson = async (dependencies: string[], key: string = 'devDependencies') => {
    let packagejson = await getPackageJson()
    dependencies.forEach((item: string) => {
        // 防止安装包里面的名字有@
        const index = item.lastIndexOf('@')
        const k = index === -1 ? item : item.slice(0, index)
        const v = index === -1 ? '' : item.slice(index + 1) || ''
        packagejson[key][k] = v
        console.log(`${item}✅`)
    })
    fs.writeJsonSync(getPath('package.json'), packagejson, { spaces: 2 })

}


export const run = async (str: string) => {
    const basePath = getEnv('base') as string
    const runArr = str.split(' ')
    if (runArr.length < 2) {
        console.log(`运行参数错误${str}`)
        return false
    }
    const [npm, ...args] = runArr
    console.log(`${runArr.join(' ')}✅`)
    spawn.sync(npm, args, {
        stdio: 'pipe',
        cwd: basePath
    })
}

export const downNodeModules = async () => {
    const basePath = getEnv('base') as string
    const [n] = await checkNpmOrYarn(basePath)
    await run(`${n} install`)
}