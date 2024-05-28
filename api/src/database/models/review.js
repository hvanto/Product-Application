module.exports = (sequelize, DataTypes) => 
    sequelize.define("review", {
      reviewId: {
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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'userId'
        }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      timestamps: true
    });