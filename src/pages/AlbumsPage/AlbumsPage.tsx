import React, { useEffect } from 'react';
import Album from '../../components/Album/Album';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchAlbums } from '../../store/album';
import { selectAlbumIds } from '../../store/album/selectors';

function AlbumsPage() {
  const albums = useAppSelector((state) => selectAlbumIds(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div>
      {albums.map((id) => (
        <Album id={id} key={id} />
      ))}
    </div>
  );
}

export default AlbumsPage;
