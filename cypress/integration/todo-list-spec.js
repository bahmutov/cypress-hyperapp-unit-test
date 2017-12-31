import { h } from 'hyperapp'
import { TodoList } from '../../components/todo-list'
import { toggle } from '../../actions'
import { mount } from '../../src'

/* eslint-env mocha */
describe('TodoList', () => {
  // let's test TodoList component by giving it simple
  // state and a toggle action

  // initial state
  const state = {
    todos: [
      {
        id: 1,
        title: 'Try HyperApp',
        completed: true
      },
      {
        id: 2,
        title: 'Test using Cypress',
        completed: true
      },
      {
        id: 3,
        title: 'Profit!!!',
        completed: false
      }
    ]
  }
  // reuse toggle action in the test - why not?
  const actions = {
    toggle
  }
  const view = (state, actions) =>
    // renders TodoList component, passing
    // current state and actions
    h(TodoList, {
      todos: state.todos,
      toggle: actions.toggle
    })

  beforeEach(() => {
    mount(state, actions, view)
  })

  it('shows todo', () => {
    cy.contains('Todo')
  })

  it('has expected number of todos', () => {
    cy.get('.todo-list .todo').should('have.length', 3)
  })

  it('has 2 completed todos', () => {
    cy.get('.todo-list .todo.done').should('have.length', 2)
  })

  it('is done with testing', () => {
    cy
      .contains('.todo-list .todo', 'Test using Cypress')
      .find('.toggle')
      .should('be.checked')
  })

  it('does not have profit yet', () => {
    cy
      .contains('.todo-list .todo', 'Profit')
      .find('.toggle')
      .should('not.be.checked')
  })

  it('completes todo by clicking', () => {
    cy.contains('.todo-list .todo', 'Profit').click()
    cy
      .contains('.todo-list .todo', 'Profit')
      .find('.toggle')
      .should('be.checked')
  })
})
