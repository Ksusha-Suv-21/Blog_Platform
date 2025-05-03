
import { createRoot } from 'react-dom/client'
import './index.module.scss'
import App from './components/App/App.tsx'
import { BrowserRouter } from 'react-router'

import { Provider } from 'react-redux'

import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

)
