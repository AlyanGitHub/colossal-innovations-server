const express = require('express');
const router = express.Router();

const checkAdminRole = require('../middlewares/checkAdminRole');

const register = require('../controllers/users/register');
const login = require('../controllers/users/login');
const getAllUsers = require('../controllers/users/getAllUsers');
const updateUser = require('../controllers/users/updateUser');
const deleteUser = require('../controllers/users/deleteUser');

router.get('/', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.put('/:userID', checkAdminRole, updateUser);
router.delete('/:userID', checkAdminRole, deleteUser);

module.exports = router;
