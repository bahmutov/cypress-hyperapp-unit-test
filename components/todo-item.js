import { h } from 'hyperapp'

export const TodoItem = ({ id, value, done, toggle }) => {
  const onclick = e =>
    toggle({
      value: done,
      id,
    })

  const className = `todo ${done ? 'done' : ''}`

  return h(
    'li',
    { class: className, onclick },
    h('div', { class: 'view' }, [
      h('input', {
        class: 'toggle',
        type: 'checkbox',
        checked: done,
      }),
      h('label', null, value),
    ])
  )
}
