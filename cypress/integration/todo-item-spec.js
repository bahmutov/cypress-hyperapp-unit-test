import { h } from 'hyperapp'
import { TodoItem } from '../../components/todo-item'
import { mount } from '../..'

/* eslint-env mocha */
describe('TodoItem', () => {
  beforeEach(() => {
    const state = {
      value: 'Try HyperApp',
      done: false
    }
    const actions = {
      toggle: () => state => ({ done: !state.done })
    }
    const view = (state, actions) =>
      h(TodoItem, {
        id: 1,
        value: state.value,
        done: state.done,
        toggle: actions.toggle
      })
    mount(state, actions, view)
  })

  it('shows todo', () => {
    cy.contains('Try HyperApp')
  })

  it('is unchecked for unfinished item', () => {
    cy.get('.toggle').should('have.length', 1).should('not.be.checked')
  })

  it('toggles item on click', () => {
    cy.get('.todo').click()
    cy.get('.toggle').should('be.checked')
  })

  it('changes state on click', () => {
    cy.get('.todo').click()
    Cypress.main._getState().should('deep.equal', {
      done: true,
      value: 'Try HyperApp'
    })

    // click again
    cy.get('.todo').click()
    Cypress.main._getState().should('deep.equal', {
      done: false,
      value: 'Try HyperApp'
    })
  })

  it('changes state by invoking action', () => {
    // the component's actions are referenced in Cypress.main
    Cypress.main.toggle()
    cy.get('.toggle').should('be.checked')
    // because actions inside Cypress.main are queued into the
    // Cypress command queue first we can just call them
    // the toggle below will happen AFTER the toggle check above
    // has already passed
    Cypress.main.toggle()
    cy.get('.toggle').should('not.be.checked')
  })
})
