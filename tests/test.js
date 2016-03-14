import { parser } from "../lib/"
import chai from 'chai'
import path from 'path'
import isPlain from 'is-plain-object'

const demo_project = path.resolve(__dirname, "..", "demo-project")
chai.should()
const expect = chai.expect

describe("res2json tests", () => {
  it("Test resolver", (done) => {
    let path = parser.resolver(demo_project, "app")
    path.should.not.equal(undefined)
    new RegExp(/values\/strings\.xml$/).test(path).should.equal(true)
    path = parser.resolver(demo_project, "app", undefined)
    path.should.not.equal(undefined)
    new RegExp(/values\/strings\.xml$/).test(path).should.equal(true)
    path = parser.resolver(demo_project, "app", "es")
    path.should.not.equal(undefined)
    new RegExp(/values-es\/strings\.xml$/).test(path).should.equal(true)
    done()
  })
  it("Test exists", (done) => {
    let path = parser.resolver(demo_project, "app")
    parser.exists(path).should.equal(true)
    path = parser.resolver(demo_project, "app", "es")
    parser.exists(path).should.equal(true)
    path = parser.resolver(demo_project, "app", "br")
    parser.exists(path).should.equal(false)
    done()
  })
  it("Test readFile", (done) => {
    let path = parser.resolver(demo_project, "app")
    parser.exists(path).should.equal(true)
    let file = parser.read(path)
    file.should.not.equal(null)
    path = parser.resolver(demo_project, "app", "br")
    parser.exists(path).should.equal(false)
    file = parser.read(path)
    expect(file).to.equal(null)
    done()
  })
  
  it("Test parser", (done) => {
    const [err, json] = parser.parse(demo_project, "app")
    expect(err).to.equal(null)
    json.should.not.equal(undefined)
    isPlain(json).should.equal(true)
    
    const [err1, json_es] = parser.parse(demo_project, "app", "es")
    expect(err1).to.equal(null)
    json_es.should.not.equal(undefined)
    isPlain(json_es).should.equal(true)
    done()
  })
})
