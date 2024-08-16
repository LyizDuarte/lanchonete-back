import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const upload = multer(multerConfig);

const routes = new Router();

routes.post('/users', UserController.store); //chama o método post e o controller de User com cadastro de user
routes.post('/sessions', SessionController.store);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index)

export default routes;
