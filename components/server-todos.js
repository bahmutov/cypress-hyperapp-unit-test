import { h } from 'hyperapp'
import { TodoList } from './todo-list'
import { getTodos } from '../actions'

// Todo list that fetches itself from the remote server
// https://github.com/hyperapp/hyperapp/blob/master/docs/concepts/lifecycle-events.md
// http://jsonplaceholder.typicode.com/

// n - how many todos to fetch from the server
export const ServerTodos = ({ n, todosLoaded, todos, toggle }) => {
  const loadTodos = () => getTodos(n, todosLoaded)

  return h(
    'div',
    {
      oncreate: loadTodos
    },
    [
      h(TodoList, {
        todos,
        toggle
      })
    ]
  )
}
