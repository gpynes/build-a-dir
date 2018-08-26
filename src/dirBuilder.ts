import { promisify } from 'util'
import { extname, dirname, resolve } from 'path'
import * as fs from 'fs'

const { writeFile: wf, mkdir: m, exists: e } = fs
const writeFile = promisify(wf)
const mkdir = promisify(m)
const exists = promisify(e)

interface VscodeFile {
    $mid: number
    fsPath: string
    external: string
    path: string
    scheme: string
}

/**
 * @description Helper for build directory structures like so:
 * ${path}/${filename}
 *     ${filename}.${ext} - filename
 *     index.${ext} - exports the file so can require dir
 * @class DirBuilder
 */
class DirBuilder {
    
    /**
     * Creates a new directory at a given path with the given name and extension
     * 
     * @param {VscodeFile} file 
     * @param {string} filename - name
     * @param {string} ext 
     * @returns 
     * 
     * @memberOf DirBuilder
     */
    async buildDir(file: VscodeFile, filename: string, ext: string) {
        const resolved = this.getUseableDirPath(file.path, filename)
        
        if (await exists(resolved)) {
          throw 'Already Exists: ' + resolved  
        }
        
        const [ indexFile, namedFile ] = this.makePathNames(resolved, [`index${ext}`, `${filename}${ext}`])
        
        await mkdir(resolved)
        await this.writeFile(namedFile, `export const ${filename} = '${filename}'`)
        await this.writeFile(indexFile, `export * from './${filename}'`)
    
        return 'Success'
    }
    
    // Will return an array of paths, concatenating base with the each filename
    makePathNames(baseDir: string, filenames: string[]) {
        return filenames.map(filename => resolve(baseDir, filename))
    }
    
    // Wrapper for writing files
    writeFile(filename: string, content: string) {
        return writeFile(filename, content, { encoding: 'utf8' })
    }
    
    isFileOrFolder(path: string) {
        return extname(path)
            ? NAMES.file
            : NAMES.folder
    }
    
    getUseableDirPath(path: string, input: string) {
        const isType = this.isFileOrFolder(path)
        const basepath = isType === NAMES.file
            ? dirname(path)
            : path
        const resolved = resolve(basepath, input)
        return resolved
    }
}

/**
 * @summary
 * Builds a directory structure like so:
 * - ${path}/${filename}/
 * - - /${filename}.${ext} - filename
 * - - /index.${ext} - exports the file so can require dir
 */
export const dirBuilder = new DirBuilder()

enum NAMES {
    folder = 'folder',
    file = 'file'
}
