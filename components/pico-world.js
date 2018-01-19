import { h } from 'hyperapp'
import picostyle from 'picostyle'

const style = picostyle(h)
const theme = 'hotpink' // Try change the theme to white

const keyColor = '#f07'

export const Wrapper = style('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  backgroundColor: keyColor
})

export const Text = style('h1')({
  fontSize: 'calc(10px + 5vmin)',
  color: theme === 'white' ? 'black' : 'white',
  margin: 'auto',
  transition: 'transform .2s ease-out',
  ':hover': {
    transform: 'scale(1.2)'
  },
  '@media (orientation: landscape)': {
    fontWeight: 'bold'
  }
})
