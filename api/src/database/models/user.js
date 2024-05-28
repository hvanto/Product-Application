module.exports = (sequelize, DataTypes) =>
  sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false
      },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
    
  }, {
    timestamps: true,
  });
