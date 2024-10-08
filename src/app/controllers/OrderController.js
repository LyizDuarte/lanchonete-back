import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });
    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const productsId = req.body.products.map((product) => product.id);

    const updatedProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    const editedProduct = updatedProducts.map((product) => {
      const productIndex = req.body.products.findIndex(
        (reqProduct) => reqProduct.id === product.id
      );
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category.name,
        url: product.url,
        quantity: req.body.products[productIndex].quantity,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: editedProduct,
    };

    return res.status(201).json(order); //retorna status 201 e id, name, email e admin inseridos
  }
}
export default new OrderController();
