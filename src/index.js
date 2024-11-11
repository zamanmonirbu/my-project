import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';
import { bannerReducer } from './reducers/bannerReducer';
import  categoryReducer  from './reducers/categoryReducer';
import { galleryReducer } from './reducers/galleryReducer';
import productReducer from './reducers/productReducer';
import sellerReducer from './reducers/sellerReducer';
import { offerBannerReducer } from './reducers/offerBannerReducer';
import { commentCreateReducer, commentDeleteReducer, commentListReducer, commentUpdateReducer } from './reducers/commentReducers';
import {cartReducer} from './reducers/cartReducer';
import locationReducer from './reducers/locationReducer';
import { codReducer, paymentReducer } from './reducers/paymentReducer';
import { adminReducer } from './reducers/adminReducer';
import { orderReducer } from './reducers/orderReducer';
import searchReducer from './reducers/searchReducer';
import chatReducer from './reducers/chatReducer';
import taskReducer from './reducers/taskReducer';
import { videoUploadReducer } from './reducers/videoUploadReducer';



const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  categories:categoryReducer,
  banner:bannerReducer,
  galleryItems:galleryReducer,
  product: productReducer,
  seller: sellerReducer,
  adminReducer,
  offerBanner: offerBannerReducer,
  commentCreate: commentCreateReducer,
  commentList: commentListReducer,
  commentUpdate: commentUpdateReducer,
  commentDelete: commentDeleteReducer,
  cart: cartReducer,
  location: locationReducer,
  payment: paymentReducer,
  cod:codReducer,
  orders: orderReducer,
  search:searchReducer,
  chat:chatReducer,
  tasks:taskReducer,
  videoUpload:videoUploadReducer
  
});

export default rootReducer;
