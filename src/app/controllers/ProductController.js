import * as Yup from 'yup';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('É necessario inserir o nome do produto!'),
      price: Yup.number().required('É necessario inserir o preco do produto!'),
      category: Yup.string().required(
        'É necessario inserir a categoria do produto!'
      ),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { filename: path } = req.file;
    const { name, price, category } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      path,
    });
    return res.json(product);
  }
  async index(req, res) {
    const products = await Product.findAll();

    return res.json(products);
  }
}

export default new ProductController();
