const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
        },
        text: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Board",
        tableName: "board",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
};
