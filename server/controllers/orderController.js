import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";



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

    

    // Create order
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
      isPaid: false,
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// Place Order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const {origin}=req.headers;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData=[];
    // Calculate amount (Correct way)
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
productData.push({
  name:product.name,
  price:product.offerPrice,
  quantity:item.quantity,
});

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add tax 2%
    amount += Math.floor(amount * 0.02);

    

    // Create order
    const order=await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    //Stripe Gateway Initialize
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);


    //Create line items for stripe
    const line_items=productData.map((item)=>{
      return {
        price_data:{
          currency:'usd',
          product_data:{
            name:item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100

        },
        quantity:item.quantity,
      }
    })

// create session
const session=await stripeInstance.checkout.sessions.create({
  line_items,
  mode:"payment",
  success_url:`${origin}/loader?next=order-complete`,
  cancel_url:`${origin}/cart`,
  metadata:{
    orderId:order._id.toString(),
    userId,
  }
})

    return res.json({ success: true,url:session.url});
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


// Get Single Order : /api/order/:orderId
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("items.product")
      .populate("address");

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
