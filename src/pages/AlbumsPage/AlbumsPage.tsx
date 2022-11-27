import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchAlbums } from '../../store/album';
import { selectAlbumEntities } from '../../store/album/selectors';
import { fetchPhotos } from '../../store/photo';

function AlbumsPage() {
  const albums = useAppSelector((state) => selectAlbumEntities(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <Row xs={1} md={4} className='g-4'>
      {Object.values(albums).map(({ id, title }) => (
        <Col className='mt-5' key={id}>
          <Link to={id.toString()}>
            <Card>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default AlbumsPage;
