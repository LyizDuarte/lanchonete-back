import * as Yup from 'yup';
import Category from '../models/Category';

class CategoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('É necessario inserir o nome do produto!'),
    });
    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name } = req.body;

    const categoryExists = await Category.findOne({
      where: { name },
    });

    if (categoryExists) {
      return res.status(400).json({ Error: 'Categoria já existe!' });
    }

    const { id } = await Category.create({
      name,
    });
    return res.json({ id, name });
  }
  async index(req, res) {
    const categories = await Category.findAll();
    return res.json(categories);
  }
}

export default new CategoryController();
