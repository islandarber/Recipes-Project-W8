import React from 'react'
import './Gallery.css'
import { useState, useEffect } from 'react';
import useContentfulGallery from './useContentfulGallery';

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const { getPhotos } = useContentfulGallery();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const allPhotos = await getPhotos();
        setPhotos(allPhotos.includes.Asset);
        console.log(allPhotos.includes.Asset);
      } catch (error) {
        console.log(`Error fetching recipes ${error}`);
      }
    }
    fetchPhotos();
  }, []);

  const clickPrev = () => {
    if (index === 0) {
      setIndex(photos.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  const clickNext = () => {
    if (index === photos.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }



  return (
    <>
    <div className='gallery-header'>
      <h1>Oh, Hello There!</h1>
    </div>
    {loading ? <h3>Loading...</h3> :
    <section>
        <div className='gallery'>
        <button onClick={clickPrev}>&lt;</button>
      {photos.length > 0 ? (
        <div key={photos[index].sys.id} className="gallery-card">
          <img src={photos[index].fields.file.url} alt="" />
          <h3>{photos[index].fields.title}</h3>
        </div>
      ) : (
        <p>No photos available.</p>
      )}
      <button onClick={clickNext}>&gt;</button>
    </div>
      </section>
            }
    </>

  )
}

export default Gallery