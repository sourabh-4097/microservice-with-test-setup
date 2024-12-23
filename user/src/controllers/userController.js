import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

import { BadRequestError } from '../errors';
import { sanitizeEmail } from '../helpers/textUtils';
import { userAuthMessage, defaultMessage } from "../message/message.js";

import userService from '../services/userService';

import Users from "../models/Users.js";
import Invitation from "../models/Invitation.js";

import fs from 'fs'
import ResetToken from "../models/ResetToken.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res, next) => {
  try {
    // Fetch name , email & password from request
    const {
      name,
      email: newEmail,
      password,
      clientReferenceId,
      team_size,
      your_role,
      utm,
      isMember,
      hasAgreedToTerms,
    } = req.body;

    // Convert the email address to lowercase
    const email = newEmail?.toLowerCase();

    // Find the user based on the email provided by user
    const ifUserExists = await Users.findOne({ email: sanitizeEmail(email) });

    const invitedUser = await Invitation.findOne({
      invitation_email: sanitizeEmail(email),
    });

    if (!invitedUser && isMember) {
      throw new BadRequestError(userAuthMessage.invitationNotFound);
    }

    const adminEmail = await Users.findOne({ _id: invitedUser?.admin_id });

    if (invitedUser && ifUserExists) {
      throw new BadRequestError(userAuthMessage.invitedUser + adminEmail.email);
    }

    // if (invitedUser && !ifUserExists && isMember) {
    //   const member = await createMember(name, email, password, hasAgreedToTerms);

    //   // Send the response
    //   res.status(StatusCodes.CREATED).json({
    //     status: defaultMessage.success,
    //     message: userAuthMessage.userCreate,
    //     user: {
    //       name: member?.name,
    //       email: member?.email,
    //       roleType: member?.role_type,
    //     },
    //     token: member?.token,
    //   });
    // }

    if (ifUserExists && (!ifUserExists.temp || ifUserExists.temp == undefined)) {
      // If user have already connect with squareSpaceAuth
      // let checkSquareSpace = await SquareSpaceToken.findOne({
      //   ref_id: ifUserExists?._id,
      // });

      // if (checkSquareSpace) {
      //   throw new BadRequestError(userAuthMessage.alreadyConnectSquareSpace);
      // }
      throw new BadRequestError(userAuthMessage.alreadyRegistered);
    }

    let user;

    let isMarketPlaceUser = false;
    if (utm) {
      isMarketPlaceUser = true;
    }


    if (ifUserExists && ifUserExists.temp === true && !isMember) {
      // Update user if user exist

      user = await Users.findOne({ email });
      user.name = name
      user.email = email
      user.password = password
      user.temp = true
      user.team_size = team_size
      user.your_role = your_role
      user.is_market_place_user = isMarketPlaceUser
      user.has_agreed_to_terms = hasAgreedToTerms ? true : false
      await user.save();

      // user = await Users.findOneAndUpdate(
      //   { email },
      //   {
      //     name,
      //     email,
      //     password: updatedPassword,
      //     temp: true,
      //     team_size,
      //     your_role,
      //     is_market_place_user: isMarketPlaceUser,
      //     has_agreed_to_terms: hasAgreedToTerms ? true : false,
      //   }
      // );
    }

    if (!ifUserExists && !isMember) {
      // Create user if above user not exist
      user = await Users.create({
        name,
        email,
        password,
        temp: true,
        team_size,
        your_role,
        is_market_place_user: isMarketPlaceUser,
        has_agreed_to_terms: hasAgreedToTerms ? true : false,
      });
    }

    // Check email is exist or not in temp data
    // let checkExistData = await TempOptimize.find({ email: email });
    // if (checkExistData.length > 0) {
    //   tempOptimizedDataInsertToAllTable(email, user._id);
    // }

    // Stripe checkOut url
    let redirectUrl = "";

    // if (req.body.selectPlanId) {
    //   const session = await createStripeSession(
    //     req.body.selectPlanId,
    //     email,
    //     clientReferenceId
    //   );
    //   redirectUrl = session.url;
    // }

    // Create JWT token
    const token = user.createJWT();

    await Users.findByIdAndUpdate(user?._id, { active_session_token: token });

    // Send the response that the user is created
    res.status(StatusCodes.CREATED).json({
      status: defaultMessage.success,
      message: userAuthMessage.userCreate,
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      },
      redirectUrl,
      token,
    });
  }
  catch (err) {
    next(err)
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user in DB with this email id
    const user = await Users.findOne({ email: sanitizeEmail(email) }).select(
      "+password"
    );

    if (!user) {
      throw new BadRequestError(userAuthMessage.invalidCredentials);
    }

    const isDeactivated = user.isDeactivated;

    // Check deactivated user
    if (isDeactivated) {
      throw new BadRequestError(userAuthMessage.deactiveUser);
    }

    const { isLocked, lockEndTime } = user.isAccountLocked();
    if (isLocked) {
      throw new BadRequestError(
        `Account locked. Try again after ${Math.ceil(
          (lockEndTime - Date.now()) / 60000
        )} minutes.`
      );
    }

    // If user is found then check the password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      user.failed_login_attempts += 1;
      user.last_failed_attempt_at = Date.now();
      await user.save();

      throw new BadRequestError(userAuthMessage.invalidCredentials);
    }

    // If password is matched create token
    const token = user.createJWT();

    // Reset failed login attempts upon successful login
    await Users.findByIdAndUpdate(user.id, {
      $unset: { failed_login_attempts: "", last_failed_attempt_at: "" },
      // active_session_token: token,
    });

    // Remove the password and passwordHistory from the response
    user.password = undefined;
    user.password_history = undefined;
    user.stripe_customer_id = undefined;
    // user.active_session_token = undefined;
    user.failed_login_attempts = undefined;
    user.last_failed_attempt_at = undefined;

    const account = user.admin_id
      ? await Users.findOne({ _id: user.admin_id })
      : user;
    user.subscription = account.subscription;
    // Send the response back to caller
    res.status(StatusCodes.OK).json({
      status: defaultMessage.success,
      message: userAuthMessage.login,
      user,
      token,
      location: user.location,
    });
  } catch (err) {
    next(err)
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // Fetch token and new password from request
    const { token, password } = req.body;

    // Find the reset token in DB
    const resetToken = await ResetToken.findOne({ token: token });

    // If no reset token is found, throw error
    if (!resetToken) {
      throw new BadRequestError(userAuthMessage.invalidToken);
    }

    // Find user detail in DB with the reset token's user_id
    const user = await Users.findById(resetToken.user_id).select(
      "+password +password_history"
    );

    // NEWLY ADDED 
    if (!user) {
      throw new BadRequestError(userAuthMessage.userNotFound);
    }

    // Check if the new password has been used in the last three changes
    const isReused = await user.isPasswordReused(password);
    if (isReused) {
      throw new BadRequestError(userAuthMessage.passwordReUse);
    }

    // Update password directly on the user instance
    user.password = password;
    await user.save();

    // Delete reset token after successful password reset
    await ResetToken.deleteMany({ user_id: user._id });

    // Send the response back to caller
    res.status(StatusCodes.OK).json({
      status: defaultMessage.success,
      message: userAuthMessage.passwordReset,
    });
  } catch (err) {
    next(err)
  }

};

export const changePassword = async (req, res, next) => {
  try {
    const { user_id, password, oldPassword } = req.body;

    // Fetch user with password history
    const user = await Users.findById(user_id).select(
      "+password +password_history"
    );
    if (!user) {
      throw new BadRequestError(userAuthMessage.invalidCredentials);
    }

    // Validate old password

    const isOldPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isOldPasswordCorrect) {
      throw new BadRequestError(userAuthMessage.invalidOldPassword);
    }

    // Check if the new password has been used in the last three changes
    const isReused = await user.isPasswordReused(password);
    if (isReused) {
      throw new BadRequestError(userAuthMessage.passwordReUse);
    }

    // Update password
    user.password = password;
    await user.save();

    res.status(StatusCodes.OK).json({
      status: defaultMessage.success,
      message: userAuthMessage.passwordReset,
    });
  } catch (err) {
    next(err)
  }
};