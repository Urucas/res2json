import fs from 'fs'
import path from 'path' 
import xml2json from 'xml2json'

const parser = {
  resolver: (project, module, locale = "en") => {
    if(locale == undefined) locale = "en"
    const values = locale == "en" ? "values" : `values-${locale}`
    return path.resolve(project, module, 'src', 'main', 'res', values, 'strings.xml')
  },
  exists: (path) => {
    try {
        const stats = fs.statSync(path)
        return stats.isFile()
    }catch(e) {
      return false
    }
  },
  read : (path)  => {
    try {
      const file = fs.readFileSync(path, 'utf-8')
      return file
    }catch(e){
      return null
    }
  },
  toJson: (xml) => {
    try {
      const json = JSON.parse(xml2json.toJson(xml))
      const res = json.resources
      let obj = {}
      for(let key in res) {
        const typo = res[key]
        if(typo.length) {
          for(let i=0; i<typo.length; i++) {
            const value = typo[i] 
            obj[value.name] = key == "string" ? value["$t"] : value.item
          }
        }else{
          obj[typo.name] = key == "string" ? typo["$t"] : typo.item
        }
      }
      return obj
    }catch(e){
      return [e, {}]
    }
  },
  parse: (project, module, locale = "en") => {
    const path = parser.resolver(project, module, locale)
    return parser.parseFile(path)
  },
  parseFile: (path) => {
    if(!parser.exists(path)) return [new Error("Resource file not found, "+path), {}]
    const xml = parser.read(path)
    if(xml == null) return [new Error("Error reading xml resource file, "+path), {}]
    try {
      var json = parser.toJson(xml)
      return [null, json]
    } catch(e){
      return [e, {}]
    }
  }
}

export { parser }
