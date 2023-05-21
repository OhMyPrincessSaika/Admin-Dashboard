import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import { Dashboard,Login,Enquiry,ViewOrder,
  BlogList,BlogCatList,Orders,Customers,ColorList,CategoryList,
  BrandList,ProductList,AddBlog,AddBlogCat, AddColor, AddCat, AddBrand, AddProduct} from './pages';
import MainLayout from './components/MainLayout'
import CouponList from './pages/CouponList';
import OpenRoute from './components/OpenRoute';
import AddCoupon from './pages/AddCoupon';
import EnquiryDetails from './pages/EnquiryDetails';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <Navigate to="/login"/>}>
           
          </Route>
          <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path="/admin" element={<MainLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="/admin/enquiries" element={<Enquiry/>}/>
            <Route path="/admin/enquiries/:id" element={<EnquiryDetails/>}/>
            <Route path="blog-list" element={<BlogList/>}/>
            <Route path="blog-category-list" element={<BlogCatList/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="orders/:id" element={<ViewOrder/>}/>
            <Route path="customers" element={<Customers/>}/>
            <Route path="color-list" element={<ColorList/>}/>
            <Route path="color" element={<AddColor/>}/>
            <Route path="color/:id" element={<AddColor/>}/>
            <Route path="category-list" element={<CategoryList/>}/>
            <Route path="category" element={<AddCat/>}/>
            <Route path="category/:id" element={<AddCat/>}/>
            <Route path="brand-list" element={<BrandList/>}/>
            <Route path="coupon-list" element={<CouponList/>}/>
            <Route path="coupon" element={<AddCoupon/>}/>
            <Route path="coupon/:id" element={<AddCoupon/>}/>
            <Route path="brand" element={<AddBrand/>}/>
            <Route path="brand/:id" element={<AddBrand/>}/>
            <Route path="product-list" element={<ProductList/>}/>
            <Route path="product" element={<AddProduct/>}/>
            <Route path="product/:id" element={<AddProduct/>}/>
            <Route path="blog" element={<AddBlog/>}/>
            <Route path="blog/:id" element={<AddBlog/>}/>
            <Route path="blog-category" element={<AddBlogCat/>}/>
            <Route path="blog-category/:id" element={<AddBlogCat/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
