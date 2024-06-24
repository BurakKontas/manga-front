import React from 'react'
import ReactDOM from 'react-dom/client'

import Providers from './providers.tsx';
import Router from './router.tsx';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Providers>
      <Router />
    </Providers>,
)
