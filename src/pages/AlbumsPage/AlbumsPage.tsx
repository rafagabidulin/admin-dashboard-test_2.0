import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchAlbums } from '../../store/album';
import { selectAlbumEntities, selectIsAlbumLoading } from '../../store/album/selectors';

function AlbumsPage() {
  const albums = useAppSelector((state) => selectAlbumEntities(state));
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => selectIsAlbumLoading(state));

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner animation='border' />;
  }

  return (
    <div className='px-5 py-2'>
      <h1 style={{ textAlign: 'center', borderBottom: 'solid 2px #4682B4' }}>Albums</h1>
      <Row xs={1} md={3} className='g-4 py-2 px-5'>
        {Object.values(albums).map(({ id, title }) => (
          <Col className='mt-5' key={id}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
              </Card.Body>
              <Card.Body>
                <Link to={String(id)}>
                  <Button variant='primary'>See pictures</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default AlbumsPage;
