// import { h, app } from 'hyperapp'
import { TodoList } from '../components/todo-list'
import { toggle } from '../actions'

const { h, app } = window.hyperapp

// notice how much this application looks like TodoList "unit" test
// in cypress/integration/todo-list-spec.js

console.log('starting todo app')
const state = {
  todos: [
    {
      id: 1,
      value: 'Write HyperApp',
      done: false
    },
    {
      id: 2,
      value: 'Test it using Cypress',
      done: false
    }
  ]
}
const actions = { toggle }
const view = (state, actions) =>
  // renders TodoList component, passing
  // current state and actions
  h(TodoList, {
    todos: state.todos,
    toggle: actions.toggle
  })

app(state, actions, view, document.getElementById('app'))
