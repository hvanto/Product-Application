module.exports = (sequelize, DataTypes) =>
    sequelize.define("userFollows", {
        followId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        followUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    }, {
        timestamps: true
    });