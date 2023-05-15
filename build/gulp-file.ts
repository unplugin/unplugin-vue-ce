import * as path from 'path'
import { series } from 'gulp'
import fs from 'fs-extra'
import { entryPkg } from './dir'

const distRoot = path.resolve(process.cwd(), '../dist')

const copyPackageJsonFiles = async(
  srcDir: string,
  destDir: string,
) => {
  const destPaths = {} as Record<string, any> // 存储输出目录和源文件目录的对应关系
  fs.readdirSync(srcDir).forEach((file) => {
    const filePath = path.join(srcDir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory() && file !== 'node_modules') { // 排除 node_modules 目录
      Object.assign(destPaths, copyPackageJsonFiles(filePath, destDir)) // 递归调用
    } else if (file === 'package.json') {
      let packageJson = fs.readJsonSync(filePath) // 读取原始 package.json 文件
      // transform
      packageJson.main = './index.js'
      packageJson.module = './index.js'
      packageJson.exports = {
        '.': {
          types: './index.d.ts',
          require: './index.cjs',
          import: './index.js',
        },
      }
      const packageDir = path.dirname(filePath)
      const relativePath = path.relative(srcDir, packageDir)
      const destPath = path.join(destDir, relativePath, 'package.json')
      const version = packageJson.version
      const packageJsonContentStr = JSON.stringify(packageJson).replaceAll('workspace:*', `^${version}`)
      packageJson = JSON.parse(packageJsonContentStr)
      fs.outputJsonSync(destPath, packageJson, { spaces: 2 }) // 写入修改后的 package.json 文件到指定目录
      destPaths[destPath] = packageDir // 存储输出目录和源文件目录的对应关系
    }
  })
  return destPaths
}

const movePkgToRootDist = async(entryPkg: Record<string, string>) => {
  let packageJson = fs.readJsonSync(`${path.resolve('../package.json')}`) // 读取原始 package.json 文件
  // transform
  packageJson.main = './index.js'
  packageJson.module = './index.js'
  packageJson.exports = {
    '.': {
      types: './index.d.ts',
      require: './index.cjs',
      import: './index.js',
    },
  }
  const version = packageJson.version
  const packageJsonContentStr = JSON.stringify(packageJson).replaceAll('workspace:*', `^${version}`)
  packageJson = JSON.parse(packageJsonContentStr)
  fs.outputJsonSync(`${distRoot}/package.json`, packageJson, { spaces: 2 })
  for (const srcKey in entryPkg) {
    await copyPackageJsonFiles(
      entryPkg[srcKey],
        `${distRoot}/${srcKey}`)
  }
}

const moveREADMEToRootDist = async(entryPkg: Record<string, string>) => {
  await fs.copy(`${path.resolve('../README.md')}`, `${distRoot}/README.md`)
  for (const srcKey in entryPkg) {
    await fs.copy(
        `${entryPkg[srcKey]}/README.md`,
        `${distRoot}/${srcKey}/README.md`)
  }
}

export default series(
  // 移动 package.json 到 dist
  async() => {
    const res = await movePkgToRootDist(entryPkg)
    return res
  },
  // 移动 README 到 dist
  async() => {
    const res = await moveREADMEToRootDist(entryPkg)
    return res
  },
)
