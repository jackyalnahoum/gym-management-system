/**
 * Member entity - represents the member row from the database.
 * Uses DB column names (snake_case).
 */
class MemberEntity {
  constructor(member_id, full_name, email, password, phone, created_at
  ) {
    this.member_id = member_id;
    this.full_name = full_name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.created_at = created_at;
  }

  
  static fromRow(row) {
    if (!row) return null;
    return new MemberEntity(row);
  }

  static fromRows(rows) {
    return (rows || []).map(row => new MemberEntity(row));
  }

}

module.exports = MemberEntity;