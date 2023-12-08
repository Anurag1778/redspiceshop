import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        if (!name || !email || !password || !phone || !address || !answer) {
            return res.status(400).send({
                success: false,
                message: 'All fields are required.',
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered. Please log in.',
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await userModel.create({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        })

        res.status(201).send({
            success: true,
            message: 'Registration Successful.',
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration.',
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password.',
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered.',
            });
        }

        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password.',
            });
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.status(200).send({
            success: true,
            message: 'Login successful.',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in login.',
            error,
        });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
  
      if (!email) {
        res.status(400).send({ message: 'Email is required' });
      }
      if (!answer) {
        res.status(400).send({ message: 'Answer is required' });
      }
      if (!newPassword) {
        res.status(400).send({ message: 'New password is required' });
      }
  
      // Check user existence and answer validation
      const user = await userModel.findOne({ email, answer });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Wrong Email or answer',
        });
      }
  
      // Hash the new password and update it
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
  
      res.status(200).send({
        success: true,
        message: 'Password Reset Successfully',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
  };
  

export const testController=(req,res)=>{
    try{
    res.send("Protected Routes");
    }catch(error){
console.log(error);
res.send({error})
    }
}



//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  

  // orders 
  export const getOrdersController=async(req,res)=>{
    try {
      const orders=await orderModel.find({buyer:req.user._id})
      .populate("products","-photo")
      .populate("buyer","name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:'false while getting Orders',
        error
      });
    };
  };


 // all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};




//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};