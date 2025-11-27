import Order from "../models/Order.js";
import Product from "../models/Product.js";

// Calculate delivery time (add 4 hours)
const calculateDeliveryTime = () => {
  return new Date(Date.now() + 4 * 60 * 60 * 1000);
};




// Place Order (COD) : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate amount (Correct way)
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add tax 2%
    amount += Math.floor(amount * 0.02);

    // DELIVERY TIME
    const deliveryBy = calculateDeliveryTime();

    // Create order
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
      deliveryBy,
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get orders of logged in user : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const  userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (Admin / Seller)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
