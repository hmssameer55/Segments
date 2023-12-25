class Schema {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}

export const schemaOptions = [
  new Schema("First Name", "first_name"),
  new Schema("Last Name", "last_name"),
  new Schema("Gender", "gender"),
  new Schema("Age", "age"),
  new Schema("Account Name", "account_name"),
  new Schema("City", "city"),
  new Schema("State", "state"),
];
