const Role = require('../models/role')
const User = require('../models/user')

const validateRole = async (role = '') => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no está registrado en la BBDD`)
  }
}

const validateEmail = async (correo = '') => {
  const emailExists = await User.findOne({ correo });
  if (emailExists) {
    throw new Error(`El correo ${correo} ya está registrado`)
  }
}


const validateUserId = async (id) => {
  const userIdExists = await User.findById(id);
  if (!userIdExists) {
    throw new Error(`El ID ${id} no existe `)
  }
}



module.exports = {
  validateRole,
  validateEmail,
  validateUserId
}