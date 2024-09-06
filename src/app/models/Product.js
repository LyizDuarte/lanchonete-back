import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL, //tipo virtual pois o campo não vai para o banco de dados
          get() {
            return `http://localhost:3000/product-file/${this.path}`;
          }, //retorna como URL  o baseurl e o path(imagem);
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category', //criando a fk
    });
  }
}

export default Product;
