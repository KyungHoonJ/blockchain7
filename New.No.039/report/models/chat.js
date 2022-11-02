const Sequelize = require("sequelize");

module.exports = class Chat extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.STRING(20),
        },
        text: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        modelName: "Chat",
        tableName: "chat",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
