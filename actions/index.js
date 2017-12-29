// common pure actions for different components AND tests

export const toggle = ({ id, done }) => state => {
  // poor man's find and toggle todo, can be really shortened
  // with Ramda or other functional libraries.

  // Luckily such pure functions are
  // SUPER SIMPLE to test and refactor
  // as much as you want
  return {
    todos: state.todos.map(
      t => (t.id === id ? Object.assign({}, t, { done }) : t)
    )
  }
}
