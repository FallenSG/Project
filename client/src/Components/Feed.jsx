import { useState, useEffect } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const arrayBufferToBase64 = buffer => {
  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

function ChangeFeed(bookData){
  let elem;
  if (Object.keys(bookData).length === 0) elem = <p>Loading...</p>
  else{
    elem = <ImageList cols={5} spacing={2}>
      {bookData.map((book) => (
        <ImageListItem key={book._id}>
          <img 
            // height="200"
            // width="200"
            src={`data:image/jpg;base64,${arrayBufferToBase64(book.img.data)}`}
            alt='Not Found'
            loading="lazy"
          />
          <ImageListItemBar
            title={book.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  } 
  return elem;
}

export default function Feed() {
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    fetch('/book')
      .then(res => res.json())
      .then(json => {
        for(let book of json.data){
          if(Object.keys(book.img.data).length === 0){
            book.img = json.defCover;
          }
        }
        setBookData(json.data)
      })
      .catch(err => console.error("Custom err: ",err))
  }, [bookData]);

  return (
    <div>
      {ChangeFeed(bookData)}
    </div>
  )
}
