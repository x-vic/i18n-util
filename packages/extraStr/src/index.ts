// const fs = require('fs')
import fs from 'fs'
// const path = require('path')
import path from 'path'
// import {} from '@types/node'

// 替换 $t 内容
export function replace$t(source: string, handleMatch: (origin: string, target: string) => string = id => id): string {
  return source.replace(/\$t\((['|"])([\u4e00-\u9fa5].*)\1\)/g, (match: string, $1: string, $2: string) => {
    // 处理字符串
    return handleMatch(match, $2)
  })
}

// 处理 $t 内容
export function handle$t(source: string, pathName: string) {
  fs.writeFileSync(
    pathName,
    replace$t(source),
    'utf8'
  )
}

// console.log(matches)

const noop = () => {}

type HandleFile = (source: fs.PathLike, pathName: string) => void

export function mapDir(dir: string, callback: HandleFile = noop, finish = noop) {
  fs.readdir(dir, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename: string, index: number) => {
      // 排除相关目录
      let pathname = path.join(dir, filename)
      if (/(node_modules\/*|\.git\/*)/.test(pathname)) return
      // console.log(pathname)
      fs.stat(pathname, (err, stats) => { // 读取文件信息
        if (err) {
          console.log('获取文件stats失败')
          return
        }
        if (stats.isDirectory()) {
          mapDir(pathname, callback, finish)
        } else if (stats.isFile()) {
          // if (['.json', '.less'].includes(path.extname(pathname))) {  // 排除 目录下的 json less 文件
          //   return
          // }
          // 排除不匹配的文件后缀
          if (!/\.vue$/.test(filename)) return
          fs.readFile(pathname, (err, data) => {
            // console.log('pathName', data.toString())
            if (err) {
              console.error(err)
              return
            }
            // 对文件内容进行重写
            // fs.writeFileSync(
            //   pathname,
            //   data.toString().replace('name: \'App\'', 'name: \'我的天啊\''),
            //   'utf8'
            // )
            // 这里对内容进行提取或是覆盖操作
            callback && callback(data.toString(), pathname)
          })
        }
      })
      if (index === files.length - 1) {
        finish && finish()
      }
    })
  })
}

// mapDir(path.resolve(__dirname, '../../'))

// 读取语言包，将汉字以及对应的 key 找出来
export function extractLang(obj: Object, path = '', value2key = new Map()): Map<string, string> {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object') {
      extractLang(value, path === '' ? key : `${path}.${key}`, value2key)
      return
    }
    if (value2key.has(value)) return
    value2key.set(value, path === '' ? key : `${path}.${key}`)
  })
  return value2key
}

// console.log(
//   extractLang({
//     name: 'Vic',
//     obj: {
//       hobby: 'read',
//       secondName: 'Xuan'
//     }
//   })
// )