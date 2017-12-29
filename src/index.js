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
      Cypress.main = app(state, actions, view, el)
      return Cypress.main
    })

  cy.get('#app', { log: false }).should('be.visible')
}
