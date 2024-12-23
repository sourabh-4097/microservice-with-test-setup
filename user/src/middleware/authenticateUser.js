import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { userAuthMessage } from "../message/message.js";
// import { lastActiveLog } from "../controllers/activeLogController.js";
import Users from "../models/Users.js";

const authenticateUser = async (req, res, next) => {
  let token;
  try{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith(userAuthMessage.tokenType)) {
      throw new UnAuthenticatedError(userAuthMessage.invalidToken);
    }

    token = authHeader.split(" ")[1];
  } catch (err) {
    next(err)
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id: payload.userId });

    /*if (!user || user.active_session_token !== token) {
      throw new UnAuthenticatedError(userAuthMessage.invalidToken);
    }*/

    req.user = { userId: payload.userId };
    req.userData = { userData: user };
    req.account = user?.admin_id
      ? { adminData: await Users.findOne({ _id: user?.admin_id }) }
      : { adminData: req?.userData?.userData };

    // const requestedEndpoint = req.originalUrl;
    // if (endPoints.includes(requestedEndpoint) && !payload?.mirror) {
    //   lastActiveLog(payload.userId);
    // }

    next();
  } catch (error) {
    // throw new UnAuthenticatedError(userAuthMessage.invalidToken);
    next(error)
  }
};

export default authenticateUser;
