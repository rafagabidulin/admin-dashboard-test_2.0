import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { selectPhotoByAlbumId } from '../../store/photo/selectors';
import { fetchPhotos } from '../../store/photo';

function Album() {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const photos = useAppSelector((state) => selectPhotoByAlbumId(state, { albumId }));

  useEffect(() => {
    dispatch(fetchPhotos(albumId));
  }, [albumId]);

  return (
    <Carousel variant='dark'>
      {photos?.map(({ id, title, url, thumbnailUrl }) => (
        <Carousel.Item key={id}>
          <img src={url} alt={thumbnailUrl} />
          <Carousel.Caption>
            <h5>{title}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Album;
