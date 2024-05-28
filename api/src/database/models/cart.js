module.exports = (sequelize, DataTypes) => 
    sequelize.define("cart", {
        cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users', 
              key: 'userId'
            }
          }
        }, {
        timestamps: true,

    });