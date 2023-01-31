const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
// const { validateEmail } = require('../helpers/db-validators');

const usersGet = async  (req = request, res = response) => {

  // const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = {state: true}
  // const users = await User.find(query)
  //   .skip(Number(from))
  //   .limit(Number(limit));

  // const total = await User.countDocuments(query)

  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(Number(from))
    .limit(Number(limit))
  ]);

  res.json({
    total, 
    users
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

  res.json(userDB)
}

const usersDelete = async (req, res) => {

  const {id} = req.params;

  // Borrar fisicamente
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, {state: false})

  res.json(user);
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