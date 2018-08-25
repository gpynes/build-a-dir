import { promisify } from 'util'
import { extname, dirname, resolve } from 'path'
import * as fs from 'fs'
// const { writeFile, mkdir, exists } = promisify(fs)
const { writeFile: wf, mkdir: m, exists: e } = fs
const writeFile = promisify(wf)
const mkdir = promisify(m)
const exists = promisify(e)

class DirBuilder {
    
    async buildDir(file, input, ext) {
        const isType = this.isFileOrFolder(file.path)
        const basepath = isType === NAMES.file
            ? dirname(file.path)
            : file.path
        const resolved = resolve(basepath, input)
            
        console.log('Building?', resolved)
        const checkForOverwrite = await exists(resolved)
        if (checkForOverwrite) {
            console.log('Already Exists', resolved)
            throw 'Already Exists: ' + resolved
        }
        
        const namedFile = `${resolved}/${input}${ext}`
        const indexFile = `${resolved}/index${ext}`
        console.log('PATHS:', resolved, namedFile, indexFile, '========================')
        try {   
            await mkdir(resolved)
            await writeFile(namedFile, `export const ${input} = '${input}'`, { encoding: 'utf8' })
            await writeFile(indexFile, `export * from './${input}'`, { encoding: 'utf8' })
        } catch(e) {
            console.log('FAILED: ', e)
            return 'Failed'
        }
           
        return 'Success!'
    }
    
    isFileOrFolder(path: string) {
        return extname(path)
            ? NAMES.file
            : NAMES.folder
    }
}

export const dirBuilder = new DirBuilder()

enum NAMES {
    folder = 'folder',
    file = 'file'
}
