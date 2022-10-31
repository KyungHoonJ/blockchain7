const Sequelize = require("sequelize");

module.exports = class Table1 extends Sequelize.Model {
  // class *** : 클래스 선언
  // extends : 상속, 오른쪽에 있는 걸 기본으로 왼쪽, 즉 지금 선언한 클래스를 생성한다.
  // 오른쪽에 있는 내용은 전부 왼쪽에도 있다.
  static init(sequelize) {
    // 테이블 생성
    return super.init(
      {
        // 컬럼들을 작성한다.
        column1: {
          type: Sequelize.STRING(10),
          // type을 적을 때 왜 Sequelize에서 가져올까?
          // number, string << 자바스크립트에 있는데 왜 가져올까?
          // Javascript에 숫자가 들어왔을 때 정수인지 실수인지 알 수 있을까? >> 없다. >> DB에서는 알아야한다.
          // DB에서 사용하는 자료형에 맞게 Javascript의 자료형을 넣어주기 위해서 Sequelize 라이브러리에서 제공하는 자료형을 사용한다.
        },
        column2: {
          // type:Sequelize.NUMBER // << 얘는 index로 사용하지 못한다.
          // INT가 아니라 숫자다, FLOAT / DOUBLE 둘 중 하나일거다.
          type: Sequelize.INTEGER.UNSIGNED,
          // UNSIGNED 는 뭐냐? '0 < number' << 음수가 없이 0과 양수로만 이루어져 있다. -20억 ~ 20억 / 0 ~ 40억 << 용량은 그대로이기 때문에 숫자를 원하는 만큼 더 사용할 수 있다.
          primaryKey: true, // 테이블당 하나만 가능하다, 검색에 용이하다.
          unique: true, // 데이터가 중복될 수 없다.
          autoIncrement: true, // 자동 증가
        },
      },
      {
        // 테이블에 대한 기본 설정
        sequelize,
        timestamps: true, // created_at, updated_at을 자동으로 추가한다.
        underscored: true, // 카멜을 스네이크로 바꾼다. << createdAt -> created_at
        paranoid: false, // deleted_at을 추가한다.
        // 데이터를 삭제했을 때 DB에서 아예 없앨건지, 아니면 남길건지 결정해라 << true면 남긴다. -> deleted_at이 추가된다.
        modelName: "Table1", // Javascript에서 사용하는 이름
        tableName: "table1", // DB에 생성되는 테이블 이름
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 관계를 위한 메서드
  }
};
