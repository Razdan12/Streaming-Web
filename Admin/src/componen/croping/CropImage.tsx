// import React, { useState, useRef } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';

// function App() {
//   const [src, setSrc] = useState(null);
//   const [crop, setCrop] = useState({ aspect: 16 / 9 });
//   const [completedCrop, setCompletedCrop] = useState(null);
//   const imageRef = useRef(null);

//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target && e.target.result) {
//           setSrc(e.target.result);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const onImageLoaded = (image) => {
//     imageRef.current = image;
//   };

//   const onCropComplete = (crop) => {
//     setCompletedCrop(crop);
//   };

//   const onCropChange = (newCrop) => {
//     setCrop(newCrop);
//   };

//   const getCroppedImg = () => {
//     if (imageRef.current && completedCrop) {
//       const canvas = document.createElement('canvas');
//       const image = imageRef.current;
//       const scaleX = image.naturalWidth / image.width;
//       const scaleY = image.naturalHeight / image.height;
//       canvas.width = completedCrop.width;
//       canvas.height = completedCrop.height;
//       const ctx = canvas.getContext('2d');

//       if (ctx) {
//         ctx.drawImage(
//           image,
//           completedCrop.x * scaleX,
//           completedCrop.y * scaleY,
//           completedCrop.width * scaleX,
//           completedCrop.height * scaleY,
//           0,
//           0,
//           completedCrop.width,
//           completedCrop.height
//         );

//         const base64Image = canvas.toDataURL('image/jpeg');
//         // Lakukan sesuatu dengan base64Image, seperti menampilkan atau mengirimkan ke server
//         console.log(base64Image);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={onSelectFile} />
//       {src && (
//         <div>
//           <ReactCrop
//             src={src}
//             crop={crop}
//             onImageLoaded={onImageLoaded}
//             onComplete={onCropComplete}
//             onChange={onCropChange}
//           />
//           <button onClick={getCroppedImg}>Crop & Save</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
