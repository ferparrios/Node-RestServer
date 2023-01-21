const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
// const { validateEmail } = require('../helpers/db-validators');

const usersGet = (req = request, res = response) => {

  const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    nombre,
    apiKey,
    page,
    limit
  })
}

const usersPost = async (req, res = response) => {

  const { nombre, correo, password, role } = req.body;
  const user = new User({ nombre, correo, password, role });

  // Verificar si el correo existe
  // const emailExists = validateEmail

  // Encriptar la contraseña, hacer el hash
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt)

  // Guardar en BBDD
  await user.save();

  res.json({
    // msg: 'post API - Controller',
    user
  })
}

const usersPut = async (req = require, res = response) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if(password){
    // Encriptar la contraseña, hacer el hash
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const userDB = await User.findByIdAndUpdate(id, resto);

  res.json({
    msg: 'put API - Controller',
    userDB
  })
}

const usersDelete = (req, res) => {
  res.json({
    msg: 'delete API - Controller'
  })
}

const usersPatch = (req, res) => {
  res.json({
    msg: 'patch API - Controller'
  })
}

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch
}