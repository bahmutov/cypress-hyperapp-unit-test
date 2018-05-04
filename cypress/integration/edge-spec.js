/// <reference types="cypress" />

import { h } from 'hyperapp'
import { mount } from '../../src'

const view = (/* state, actions */) =>
  h('div', { class: 'greeting' }, 'edge cases')

/* eslint-env mocha */
describe('Edge cases', () => {
  it('works without state', () => {
    mount(null, {}, view)
    cy.contains('.greeting', 'edge cases').then(() => {
      Cypress.main._getState().should('be', null)
    })
  })

  it('works without actions', () => {
    mount(null, null, view)
    cy.contains('.greeting', 'edge cases').then(() => {
      Cypress.main._getState().should('be', null)
    })
  })
})
