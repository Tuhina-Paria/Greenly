import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies; // seller token

  // If token not found
  if (!sellerToken) {
    return res.status(401).json({
      success: false,
      message: "Seller Not Authorized",
    });
  }

  try {
    // Verify token
    const tokendecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Check if this token belongs to the seller
    if (tokendecode.email === process.env.SELLER_EMAIL) {
      return next(); // seller is authenticated
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authSeller;
