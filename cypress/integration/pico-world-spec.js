/// <reference types="cypress" />

import { h } from 'hyperapp'
import { mount } from '../../src'
import { Wrapper, Text } from '../../components/pico-world'

/* eslint-env mocha */
describe('Picostyle Text', () => {
  beforeEach(() => {
    cy.window().its('document').then(doc => {
      console.log('doc', doc)
    })
    const view = state => h(Wrapper, {}, [h(Text, {}, [`Hello ${state.text}`])])

    mount(
      {
        text: 'Picostyle'
      },
      {},
      view
    )
  })

  it.skip('shows greeting', () => {
    cy.contains('Hello Picostyle')
  })
})
