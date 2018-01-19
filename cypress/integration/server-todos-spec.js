import { h } from 'hyperapp'
import { ServerTodos } from '../../components/server-todos'
import { mount } from '../../src'
import { toggle } from '../../actions'

/* eslint-env mocha */
describe('Server Todos', () => {
  const mockTodos = [
    {
      id: 1,
      title: 'Stub server',
      completed: false
    },
    {
      id: 2,
      title: 'Test app',
      completed: false
    },
    {
      id: 3,
      title: 'Profit!',
      completed: true
    }
  ]
  beforeEach(() => {
    // expect XHR from the component
    // and respond with mock list
    cy.server()
    cy.route('/todos?_limit=3', mockTodos).as('todos')
  })

  context('Stubbed server', () => {
    beforeEach(() => {
      const state = {
        todos: []
      }
      const actions = {
        setTodos: todos => state => ({ todos }),
        toggle
      }
      const view = (state, actions) =>
        h(ServerTodos, {
          n: 3,
          todosLoaded: actions.setTodos,
          todos: state.todos,
          toggle: actions.toggle
        })
      mount(state, actions, view)
    })

    it('shows todos', () => {
      cy.contains('Todo')
      cy.get('.todo').should('have.length', 3)
      cy.get('.todo').first().contains('Stub server')
    })

    it('stubs XHR response', () => {
      cy.wait('@todos').its('response.body').should('deep.equal', mockTodos)
    })

    it('can toggle item', () => {
      cy.get('.todo').first().click()
      cy.get('.todo').first().find('.toggle').should('be.checked')
    })
  })
})
