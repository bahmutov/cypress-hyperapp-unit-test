import { stripIndent } from 'common-tags'

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
    <div id="app"></div>
    <script defer src="https://unpkg.com/hyperapp"></script>
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
}
