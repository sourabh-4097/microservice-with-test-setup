import express from 'express';
import * as userController from '../controllers/userController';
import { validate } from "../middleware/validationMiddleware";
import { validateLoginUser, validateRegisterUser, validateResetPassword, validateChangePassword } from '../validation/user';
import authenticateUser from '../middleware/authenticateUser';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// router.post("/auth/create", userController.registerUser);
router.route("/auth/create").post(validate(validateRegisterUser), userController.registerUser);
router.route("/auth/login").post(validate(validateLoginUser), userController.loginUser);
router
    .route("/auth/reset-password")
    .post(validate(validateResetPassword), userController.resetPassword);
router
    .route("/auth/change-password")
    .post(authenticateUser, validate(validateChangePassword), userController.changePassword);

module.exports = router;
