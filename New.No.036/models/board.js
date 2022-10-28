const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Board",
        tableName: "board",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Board.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
    });
    db.Board.hasMany(db.Comment, {
      foreignKey: "board_id",
      sourceKey: "id",
    });
  }
};
