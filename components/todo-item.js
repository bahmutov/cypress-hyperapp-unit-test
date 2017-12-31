import { h } from 'hyperapp'

// TodoItem component from
// https://github.com/hyperapp/hyperapp/blob/master/docs/concepts/components.md
export const TodoItem = ({ id, title, completed, toggle }) => {
  completed = Boolean(completed)

  const onclick = e =>
    toggle({
      completed: !completed,
      id
    })

  const className = `todo ${completed ? 'done' : ''}`

  return h(
    'li',
    { class: className, onclick },
    h('div', { class: 'view' }, [
      h('input', {
        class: 'toggle',
        type: 'checkbox',
        checked: completed
      }),
      h('label', null, title)
    ])
  )
}
