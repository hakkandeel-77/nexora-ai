const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    let token;

    // 1) التحقق من وجود التوكن
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    // 2) فك التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) جلب المستخدم الحقيقي من الداتابيز
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4) تمرير المستخدم للـ request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired",
    });
  }
};

module.exports = auth;