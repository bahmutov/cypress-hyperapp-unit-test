import { h } from 'hyperapp'
import { TodoItem } from './todo-item'

// TodoList component from
// https://github.com/hyperapp/hyperapp/blob/master/docs/concepts/components.md
export const TodoList = ({ todos, toggle }) =>
  h('div', {}, [
    h('h1', {}, 'Todo'),
    h(
      'ul',
      { class: 'todo-list' },
      // for each todo object, call TodoItem view function,
      // combining todo with toggle action and passing as properties object
      todos.map(todo => h(TodoItem, Object.assign({}, todo, { toggle })))
    )
  ])
