#!/usr/bin/env node
import inquirer from 'inquirer'
import { answerType } from './src/interface'
import initCli from './src/cli'

const promptList = [{
    type: 'confrim',
    message: '是否是Vue3项目?',
    name: 'vue3'
}, {
    type: 'checkbox',
    message: '选择要安装的插件(默认全选)',
    name: 'plugins',
    choices: [{
        name: 'eslint注册',
        value: 'eslint',
        checked: true
    }, {
        name: 'vscode格式化注册',
        value: 'vscode',
        checked: true,
    }]
}]
console.log('.....', inquirer)

const question = async () => {
    const answers: answerType = await inquirer.prompt(promptList)
    initCli(answers)
}

question()