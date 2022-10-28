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
    // 관계 맺기
    db.Board.belongsTo(db.User, {
      // 어디에 속해있는지
      foreignKey: "user_id", // 상대와 같은 값으로(컬럼이 여기에 추가됨)
      targetKey: "id", // 어떠한 컬럼 값을 가져올지
    });
    db.Board.hasMany(db.Comment, {
      // 무엇을 갖고있는지
      foreignKey: "board_id", // 상대와 같은 값으로(여기에 추가되지 않음)
      sourceKey: "id", // 어떠한 컬럼 값을 보낼지
    });
  }
};
