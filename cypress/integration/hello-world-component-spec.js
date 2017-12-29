import { HelloWorld, HelloYou } from '../../components/hello-world'
import { mount } from '../..'

/* eslint-env mocha */
describe('HelloWorld', () => {
  // component without any actions or internal state
  beforeEach(() => {
    const state = {}
    const actions = {}
    mount(state, actions, HelloWorld)
  })

  it('shows greeting', () => {
    cy.contains('.greeting', 'Hello, World')
  })
})

describe('HelloYou', () => {
  // component with state and an action
  const state = {
    name: 'person'
  }

  beforeEach(() => {
    const actions = {
      setName: name => state => ({ name })
    }
    mount(state, actions, HelloYou)
  })

  it('shows greeting', () => {
    cy.contains('.greeting', 'Hello, person')
  })

  it('changes greeting using action', () => {
    // Cypress.main is the mounted value which is
    // the app's actions object
    cy.log('changing name')
    Cypress.main.setName('Great Person!')
    cy.contains('.greeting', 'Hello, Great Person!')
  })

  it('mutates name in the state', () => {
    Cypress.main.setName('Great Person!')
    // mount function adds utility method to get the
    // current state object
    expect(Cypress.main._getState().name).to.equal('Great Person!')
  })

  it('mutates state', () => {
    Cypress.main.setName('Great Person!')
    expect(state).to.not.equal(Cypress.main._getState())
  })
})
