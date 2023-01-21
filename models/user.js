// Modelo o documeto para crear el usuario
// {
//   nombre: '',
//   correo: '',
//   password: '',
//   img: '',
//   role: '',
//   estado: false,
//   google: true
// }

const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'The name is mandatory']
  },
  correo:{
    type: String,
    required: [true, 'The email is mandatory'],
    unique: true
  },
  password:{
    type: String,
    required: [true, "Password is mandatory"]
  },
  img:{
    type: String
  },
  role:{
    type: String,
    required: true,
    // enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  state:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
  }
});

UserSchema.methods.toJSON = function(){
  const { __v, password, ...user } = this.toObject();
  return user;
}


module.exports = model('User', UserSchema);