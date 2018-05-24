require('babel-register')()

let jsdom = require('jsdom')
let { JSDOM } = jsdom
let Enzyme = require('enzyme')
let Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
var exposedProperties = ['window', 'navigator', 'document']

const { document } = (new JSDOM('')).window
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

let documentRef = document
