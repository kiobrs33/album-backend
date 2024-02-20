const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  lastname: {
    type: String,
    required: [true, "The lastname is required"],
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password is required"],
  },
  urlImage: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "CLIENT_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  isLoggedGoogle: {
    type: Boolean,
    default: false,
  },
});

// Customizando un metodo de la INSTANCIA para alterar los datos que retorna despues de GUARDAR
// UserSchema.methods.toJSON = function () {
//   const { password, ...rest } = this.toObject();
//   return rest;
// };

module.exports = model("User", UserSchema);
