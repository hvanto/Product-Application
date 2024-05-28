module.exports = (sequelize, DataTypes) => 
    sequelize.define("cartLine", {
      cartLineId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'productId'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carts', 
          key: 'cartId'
        }
      }
    }, {
      timestamps: true
    });
  