import React from 'react'
import ReactDOM from 'react-dom'
import { init } from '@rematch/core'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import * as models from './models'
import App from './App'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const store = init({ models })

ReactDOM.render(
  <Provider store={store}>
    <>
      <App />
      <GlobalStyle />
    </>
  </Provider>,
  document.getElementById('root')
)
