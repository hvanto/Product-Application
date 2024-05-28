module.exports = (sequelize, DataTypes) => 
    sequelize.define("product", {
        productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        productName: {
        type: DataTypes.STRING(100),
        allowNull: false
        },
        productDescription: {
        type: DataTypes.STRING(100),
        allowNull: false
        },
        price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
        },
        imgUrl: {
        type: DataTypes.STRING(100),
        allowNull: false
        },
        special: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        specialPrice: {
          type: DataTypes.DECIMAL(10,2),
          allowNull: true,
        }
    }, {
        timestamps: true
    });