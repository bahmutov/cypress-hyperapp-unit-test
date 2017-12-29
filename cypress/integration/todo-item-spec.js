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
    cy
      .get('.toggle')
      .should('have.length', 1)
      .should('not.be.checked')
  })

  it('toggles item on click', () => {
    cy
      .get('.todo')
      .first()
      .click()
    cy.get('.toggle').should('be.checked')
  })

  it('changes state on click', () => {
    cy
      .get('.todo')
      .first()
      .click()
      .then(() => {
        expect(Cypress.main._getState()).to.deep.equal({
          done: true,
          value: 'Try HyperApp'
        })
      })
  })
})
