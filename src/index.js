import { stripIndent } from 'common-tags'

// having weak reference to styles prevents garbage collection
// and "losing" styles when the next test starts
const stylesCache = new Map()

const copyStyles = component => {
  // need to find same component when component is recompiled
  // by the JSX preprocessor. Thus have to use something else,
  // like component name
  // const hash = component.type.name
  const hash = component

  let styles = document.querySelectorAll('head style')
  if (styles.length) {
    console.log('injected %d styles', styles.length)
    stylesCache.set(hash, styles)
  } else {
    console.log('No styles injected for this component, checking cache')
    if (stylesCache.has(hash)) {
      styles = stylesCache.get(hash)
    } else {
      styles = null
    }
  }

  if (!styles) {
    return
  }

  const parentDocument = window.parent.document
  const projectName = Cypress.config('projectName')
  const appIframeId = `Your App: '${projectName}'`
  const appIframe = parentDocument.getElementById(appIframeId)
  const head = appIframe.contentDocument.querySelector('head')
  styles.forEach(style => {
    head.appendChild(style)
  })
}

function setXMLHttpRequest (w) {
  // by grabbing the XMLHttpRequest from app's iframe
  // and putting it here - in the test iframe
  // we suddenly get spying and stubbing 😁
  window.XMLHttpRequest = w.XMLHttpRequest
  return w
}

function setAlert (w) {
  window.alert = w.alert
  return w
}

export const mount = (state, actions, view) => {
  if (!actions) {
    // we always want to have an actions object so we
    // can attach _getState utility function
    actions = {}
  }

  const html = stripIndent`
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app"></div>
      <script defer src="https://unpkg.com/hyperapp"></script>
    </body>
  `
  const document = cy.state('document')
  document.write(html)
  document.close()

  // add a utility action to get the current state
  if (!actions._getState) {
    const _getState = () => state => state
    actions = Object.assign({}, actions, { _getState })
  }

  cy
    .window({ log: false })
    .then(setXMLHttpRequest)
    .then(setAlert)
    .its('hyperapp.app')
    .then(app => {
      const el = document.getElementById('app')
      const main = app(state, actions, view, el)

      // wrap every hyper action with `cy.then` to
      // make sure it goes through the Cypress command queue
      // allows things like the example below to just work
      //   Cypress.main.setText('foo')
      //   cy.contains('foo')
      //   Cypress.main.setText('bar')
      //   cy.contains('bar')
      Cypress.main = {}
      Object.keys(main).forEach(name => {
        const action = main[name]
        Cypress.main[name] = function queueAction () {
          // should we log arguments?
          cy.log(`action: ${name}`)
          return cy.then(() => action.apply(null, arguments))
        }
      })

      return Cypress.main
    })

  cy.get('#app', { log: false }).should('be.visible')

  // picostyle dom is more complex
  // picostyle inserts a style into the document's head
  // but then it actually inserts new CSS rules when the view instantiates
  // so we need to _observe_ test document style and on added
  // CSS rules copy them
  copyStyles(view)
}
