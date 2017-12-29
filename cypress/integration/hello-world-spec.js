import { h } from 'hyperapp'
import { mount } from '../..'

// view function we are testing - generates "static" content
const view = () =>
  /* state, actions */ h('div', { class: 'greeting' }, 'Hello, World')

/* eslint-env mocha */
describe('Hello World', () => {
  // simplest case - no state, no actions
  // just a view function
  beforeEach(() => {
    const state = {}
    const actions = {}
    mount(state, actions, view)
  })

  it('shows greeting', () => {
    cy.contains('.greeting', 'Hello, World')
  })
})
