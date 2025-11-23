import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  // If no token present
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    // Verify token
    const tokendecode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to req object
    if(tokendecode.id){
        req.body.userId=tokendecode.id;
    }else{
        return res,json({success:false,message:"Not Authorizes"});
    }


    next(); // continue to next controller

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
