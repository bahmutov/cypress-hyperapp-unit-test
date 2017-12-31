import axios from 'axios'

// common pure actions for different components AND tests

export const toggle = ({ id, completed }) => state => {
  // poor man's find and toggle todo, can be really shortened
  // with Ramda or other functional libraries.

  // Luckily such pure functions are
  // SUPER SIMPLE to test and refactor
  // as much as you want
  return {
    todos: state.todos.map(
      t => (t.id === id ? Object.assign({}, t, { completed }) : t)
    )
  }
}

export const getTodos = (n = 5, loaded) => {
  const url = `http://jsonplaceholder.typicode.com/todos?_limit=${n}`
  return axios.get(url).then(res => res.data).then(list => {
    console.log('got %d todos', list.length)
    if (loaded) {
      loaded(list)
    }
  })
}
