import { h } from 'hyperapp'

// hard-coded greeting message
export const HelloWorld = (state, actions) =>
  h('div', { class: 'greeting' }, 'Hello, World')

// dynamic greeting message
export const HelloYou = (state, actions) =>
  h('div', { class: 'greeting' }, `Hello, ${state.name}`)
