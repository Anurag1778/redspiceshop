import express from 'express'
import {registerController,loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { updateProductController } from '../controllers/productController.js';
const router =express.Router()


// REGISTER || METHOD POST
router.post('/register', registerController)

// LoGIN || POST
router.post('/login',loginController)

// Forgot Password || POST
router.post('/forgot-password',forgotPasswordController)



// test route
router.get("/test", requireSignIn,isAdmin,testController);

// protected  user route auth
router.get("/user-auth", requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});


// protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});


// update profile
router.put('/profile',requireSignIn,updateProfileController)


//orders 
router.get('/orders',requireSignIn,getOrdersController);

// all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)





// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );
  

export default router;