import { h, app } from 'hyperapp'
import { mount } from '../..'

const state = {}

const actions = {}

const view = (state, actions) => h('div', { class: 'greeting' }, 'Hello, World')

describe('Todo', () => {
  beforeEach(() => {
    mount(state, actions, view)
  })

  it('shows greeting', () => {
    cy.contains('.greeting', 'Hello, World')
  })
})
