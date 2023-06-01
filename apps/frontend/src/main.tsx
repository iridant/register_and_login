import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// This <StrictMode> tag makes multiple react functions be called twice for quality checks during development mode,
// thus causing double calls to API for authorization checks.
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);