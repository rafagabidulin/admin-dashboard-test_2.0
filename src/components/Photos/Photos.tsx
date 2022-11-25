import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { selectAlbumPhotosById } from '../../store/album/selectors';

function Photos({ id }) {
  const { albumId } = useParams();
  const photos = useAppSelector((state) => selectAlbumPhotosById(state, { albumId }));
  return (
    <div>
      {photos?.map(({ title, url }) => (
        <div id={id}>
          <span>{title}</span>
          <img src={url} alt='albumPhoto' />
        </div>
      ))}
    </div>
  );
}

export default Photos;
