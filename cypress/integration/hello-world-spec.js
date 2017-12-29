import { h } from 'hyperapp'
import { mount } from '../..'

// view function we are testing
const view = (state, actions) => h('div', { class: 'greeting' }, 'Hello, World')

/* eslint-env mocha */
describe('Hello World', () => {
  beforeEach(() => {
    const state = {}
    const actions = {}
    mount(state, actions, view)
  })

  it('shows greeting', () => {
    cy.contains('.greeting', 'Hello, World')
  })
})
