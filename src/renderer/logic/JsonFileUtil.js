'use strict'

import FsExtra from 'fs-extra'

export default class JsonFileUtil {
  static saveFile (fileName, data) {
    const filePath = `${process.cwd()}/json/${fileName}.json`
    return FsExtra.outputJSON(filePath, data, { spaces: 2 })
  }

  static loadFile (fileName) {
    const filePath = `${process.cwd()}/json/${fileName}.json`
    return FsExtra.readJSON(filePath, { throws: false })
  }
}
