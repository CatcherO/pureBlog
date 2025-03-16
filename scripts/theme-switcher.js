import fs from 'fs'
import path from 'path'
import blogConfig from '../blogConfig.json'

// Use environment variable if provided, otherwise fall back to the config
const themeName = process.env.THEME || blogConfig.theme || 'default'
const src = path.join('themes', themeName)
const dest = path.join('./docs/.vitepress/theme')

// Ensure target directory exists
fs.mkdirSync(dest, { recursive: true })

// 清空目标目录
fs.rmSync(dest, { recursive: true, force: true })
// 复制主题文件
fs.cpSync(src, dest, { recursive: true })

console.log(`Theme [${themeName}] successfully copied to docs/.vitepress/theme`)