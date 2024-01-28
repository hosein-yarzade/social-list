import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './../app/App.tsx'
import {ThemeContextProvider} from '../theme/ThemeContextProviderApp'
import './index.css'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeContextProvider>
            <CacheProvider value={cacheRtl}>
            <App/>
            </CacheProvider>
        </ThemeContextProvider>
    </React.StrictMode>,
)
