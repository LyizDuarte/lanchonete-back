import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'), //as imagens serao salvas na pasta uploads
    filename: (req, file, callback) => {
      return callback(null, v4() + extname(file.originalname)); //passa para o path um id aleatorio e a extensao do arquivo;
    },
  }),
};
