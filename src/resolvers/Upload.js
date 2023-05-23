const { storeFS, saveImageToDB } = require('../server/Store');
const { readdirSync } = require('fs');
const { join } = require('path');

const UploadResolvers = {
  Query: {
    uploadedImages: () => {
      const directoryPath = join(__dirname, '../../uploads'); 
      const files = readdirSync(directoryPath);
      
      return files.map(filename => ({ url: `http://localhost:4000/uploads/${filename}`, filename }));
    },
  },
  Mutation: {
    singleUpload: async (parent, { file }) => {
      try {
        const { createReadStream, filename, mimetype, encoding } = await file.file;
        const stream = createReadStream();
        const path = await storeFS({ stream, filename });
        const url = `http://localhost:4000/uploads/${path}`;
        const imageRecord = await saveImageToDB({ url, mimetype, encoding });
      
        return imageRecord;
      } catch (error) {
        console.error('Error al subir el archivo', error);
        throw error;
      }
    },
    multipleUpload: async (_, { files }) => {
      try {
        const imageRecords = await Promise.all(files.map(async (file) => {
          console.log('Archivo recibido',file);
          const { createReadStream, filename, mimetype, encoding } = await file.file;
          const stream = createReadStream();
          const path = await storeFS({ stream, filename });
          const url = `http://localhost:4000/uploads/${path}`;
          const imageRecord = await saveImageToDB({ url, mimetype, encoding, filename });

          return imageRecord;
        }));

        return imageRecords;
      } catch (error) {
        console.error('Error al subir los archivos', error);
        throw error;
      }
    },
  },
};

module.exports = UploadResolvers;
