const pool = require('../db/pool');
const MemberEntity = require("../entities/member.entity");

class MemberRepository {
  static async findAll() {
    const result = await pool.query('SELECT * FROM member');
    return result.rows;
  }

  static async findById(member_id) {
  const result = await pool.query(
    'SELECT * FROM member WHERE member_id = $1',
    [member_id]
  );
  return result.rows[0];
  }

  static async create(member) {
  const { full_name, email, phone, age } = member;

  const result = await pool.query(
    `INSERT INTO member (full_name, email, phone, age)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, email, phone, age]
  );

  return result.rows[0];
 }


 static async update(member) {
  const { member_id, full_name, email, phone, age } = member;

  const result = await pool.query(
    `UPDATE member
     SET full_name = $1, email = $2, phone = $3, age = $4
     WHERE member_id = $5
     RETURNING *`,
    [full_name, email, phone, age, member_id]
  );

  return result.rows[0];
}

static async delete(member_id) {
  await pool.query(
    'DELETE FROM member WHERE member_id = $1',
    [member_id]
  );
    return { message: "Trainer deleted" };
}

static async authenticate(email, password) {
  const result = await pool.query(
    `SELECT * FROM member WHERE email = $1 AND password = $2`,
    [email, password]
  );

  return MemberEntity.fromRow(result.rows[0]);
}

}

module.exports = MemberRepository;