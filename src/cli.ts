import cac from 'cac'
import {start} from './start'
import { setEnv } from './utils/env'
import { getPackageJson } from './utils/env'
import { answerType } from './interface'

const cli = cac('formate-cli')

export default async (answers:answerType) =>{
const packagejson = await getPackageJson()
const {version} = packagejson
cli.command('[root]').alias('alias').action(async (_root, options) =>{
    let base:string = options.base
    if(!base) {
        // 项目的基础路径
        base = process.cwd()
    }
    setEnv('base', base)
    await start(base, answers)
})

cli.help()
cli.version(version)
cli.parse()
}