import { render } from 'preact'
import { App } from './app'
import './assets/water-light.css'
import './index.css'

render(<App />, document.getElementById('app') as HTMLElement)
