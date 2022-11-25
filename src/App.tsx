import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Layout from './components/Layout/Layout';
import PostsPage from './pages/PostsPage/PostsPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import TodosPage from './pages/TodosPage/TodosPage';
import HomePage from './pages/HomePage/HomePage';
import Album from './components/Album/Album';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/posts' element={<PostsPage />} />
              <Route path='/albums' element={<AlbumsPage />}>
                <Route path=':albumId' element={<Album />} />
              </Route>
              <Route path='/todos' element={<TodosPage />} />
            </Routes>
          </Layout>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
