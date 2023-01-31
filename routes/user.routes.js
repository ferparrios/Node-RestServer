const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete, usersPatch } = require('../controllers/users.controller');
const { validateRole, validateEmail, validateUserId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router()


router.get('/', usersGet)

router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(validateUserId),
  check('role').custom(validateRole),
  validarCampos
] , usersPut)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser mayor a 6 letras').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(validateEmail),
  // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(validateRole),
  validarCampos
], usersPost)

router.delete('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(validateUserId),
  validarCampos
], usersDelete)

router.patch('/', usersPatch)



module.exports = router;