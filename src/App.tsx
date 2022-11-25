import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Layout from './components/Layout/Layout';
import Posts from './components/Posts/Posts';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path='/posts' element={<Posts />} />
            </Routes>
          </Layout>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
