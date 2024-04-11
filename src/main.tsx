import React from 'react'
import ReactDOM from 'react-dom/client'
import * as B from '@heisey/componentlib'

import * as App from './App'
import * as Core from './core'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <B.Lib.Providers.Theme.Component theme={Core.config.theme}>
      <B.Lib.Providers.Router.Component>
        <B.Lib.Providers.CssReset.Component />
        <App.Component />
      </B.Lib.Providers.Router.Component>
    </B.Lib.Providers.Theme.Component>
  </React.StrictMode>,
)
