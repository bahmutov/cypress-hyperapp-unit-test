import { stripIndent } from 'common-tags'

export const mount = (state, actions, view) => {
  const html = stripIndent`
    <body>
      <div id="app"></div>
      <script src="https://unpkg.com/hyperapp"></script>
    </body>
  `
  const document = cy.state('document')
  document.write(html)
  document.close()

  // add a utility action to get the current state
  if (!actions._getState) {
    actions = Object.assign({}, actions, { _getState: () => state => state })
  }

  cy
    .window({ log: false })
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
