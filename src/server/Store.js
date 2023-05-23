const fs = require('fs');
const path = require('path');

// Almacena el archivo en el sistema de archivos y devuelve la ruta del archivo
const storeFS = ({ stream, filename }) => {
    const path = `uploads/${filename}`;
    console.log('Storing file:', filename, 'at', path);
  
    return new Promise((resolve, reject) =>
      stream
        .on('error', error => {
          console.error('Error writing file:', filename, error);
          reject(error);
        })
        .pipe(fs.createWriteStream(path))
        .on('finish', () => {
          console.log('Finished writing file:', filename);
          resolve(path);
        })
        .on('error', error => {
          console.error('Error writing file:', filename, error);
          reject(error);
        })
    );
  };
  
// Guarda la URL del archivo en tu base de datos y devuelve el registro de la imagen
const saveImageToDB = ({ url, mimetype, encoding, filename }) => {
  // Aquí deberías implementar el código para guardar la url en tu base de datos
  // Esta es solo una simulación de la función que devuelve un objeto con la información de la imagen
  return { url, mimetype, encoding, filename };
};

module.exports = { storeFS, saveImageToDB };

