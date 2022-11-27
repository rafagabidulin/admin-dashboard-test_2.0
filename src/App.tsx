import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Layout from './components/Layout/Layout';
import PostsPage from './pages/PostsPage/PostsPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import TodosPage from './pages/TodosPage/TodosPage';
import HomePage from './pages/HomePage/HomePage';
import Album from './components/Album/Album';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import EditCreatePostForm from './components/EditCreatePostForm/EditCreatePostForm';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/posts' element={<PostsPage />} />
              <Route path='/posts/create' element={<EditCreatePostForm />} />
              <Route path='/posts/edit/:postId' element={<EditCreatePostForm />} />
              <Route path='/albums' element={<AlbumsPage />} />
              <Route path='/albums/:albumId' element={<Album />} />
              <Route path='/todos' element={<TodosPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
