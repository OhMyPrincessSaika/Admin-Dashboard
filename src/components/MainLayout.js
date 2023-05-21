import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
import {RiDashboardFill} from 'react-icons/ri';
import {HiColorSwatch} from 'react-icons/hi'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BsPeopleFill} from 'react-icons/bs';
import {SiBrandfolder} from 'react-icons/si';
import {MdOutlineCategory} from 'react-icons/md';
import {ImBlog} from 'react-icons/im';
import {Outlet} from 'react-router-dom';
import {FaClipboardList,FaBloggerB} from 'react-icons/fa';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {IoIosNotifications} from 'react-icons/io';
import {Link} from 'react-router-dom';
import {RiCoupon2Line,RiCouponLine} from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//just temporary
import saika from '../images/saika.jpg'
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo d-flex justify-content-center align-items-center">
            <h2 className=" py-4 text-center text-white fs-5 mb-0">
              <span className='lg-logo title'>Saika Store</span>
              <span className="sm-logo title">SS</span>
            </h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick = {({key}) => {
              if(key === "signout") {

              }else {
                navigate(key);
              }
            }}
            items={[
              { 
                key: '',
                icon: <RiDashboardFill  className="fs-4"/>,
                label: 'Dashboard',
              },
              {
                key: 'customers',
                icon: <BsPeopleFill  className="fs-4"/>,
                label: 'Customers',
              },
              {
                key: 'catalog',
                icon: <AiOutlineShoppingCart  className="fs-4"/>,
                label: 'Catalog',
                children : [
                  {
                    key : "product",
                    icon : <AiOutlineShoppingCart className="fs-4"/>,
                    label : "Add Product"
                  },
                  {
                    key : "product-list",
                    icon : <AiOutlineShoppingCart className="fs-4"/>,
                    label : "Product List"
                  },
                  {
                    key : "brand",
                    icon : <SiBrandfolder className="fs-4"/>,
                    label : "Brand"
                  },
                  {
                    key : "brand-list",
                    icon : <SiBrandfolder className="fs-4"/>,
                    label : "Brand List"
                  },
                  {
                    key : "category",
                    icon : <MdOutlineCategory className="fs-4"/>,
                    label : "Category"
                  },
                  {
                    key : "category-list",
                    icon : <MdOutlineCategory className="fs-4"/>,
                    label : "Category List"
                  },
                  {
                    key : "color",
                    icon : <HiColorSwatch className="fs-4"/>,
                    label : "Color"
                  },
                  {
                    key : "color-list",
                    icon : <HiColorSwatch className="fs-4"/>,
                    label : "Color List"
                  },
                ]
              },
              {
                key : "orders",
                icon : <FaClipboardList className="fs-4"/>,
                label : 'Orders'
              },
              {
                key : "marketing",
                icon : <RiCoupon2Line className="fs-4"/>,
                label : 'Marketing',
                children : [
                  {
                    key : "coupon",
                    icon : <RiCouponLine className="fs-4"/>,
                    label : "Add Coupon"
                  },
                  {
                    key : "coupon-list",
                    icon : <RiCoupon2Line className="fs-4"/>,
                    label : "Coupon List"
                  },
                ]
              },
              {
                key : "blogs",
                icon : <FaBloggerB className="fs-4"/>,
                label : 'Blogs',
                children : [
                  {
                    key : "blog",
                    icon : <ImBlog className="fs-4"/>,
                    label : "Add Blog"
                  },
                  {
                    key : "blog-list",
                    icon : <FaBloggerB className="fs-4"/>,
                    label : "Blog List"
                  },
                  {
                    key : "blog-category",
                    icon : <ImBlog className="fs-4"/>,
                    label : "Add Blog Category"
                  },
                  {
                    key : "blog-category-list",
                    icon : <FaBloggerB className="fs-4"/>,
                    label : "Blog Category List"
                  }
                ]
              },
              {
                key: 'enquiries',
                icon: <FaClipboardList  className="fs-4"/>,
                label: 'Enquries',
              },
              
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="d-flex justify-content-between ps-2 pe-1"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className="d-flex gap-3 align-items-center">
              <div className="position-relative">
                <IoIosNotifications className="fs-4"/>
                <span className="position-absolute badge bg-warning  rounded-circle" style={{top:'15%',right:'-10%'}}>
                  3
                </span>
              </div>
              <div className="d-flex align-items-center  gap-3 dropdown">
                  <div >
                    <img src={saika}  style={{width:'32px',height:'32px',objectFit:'cover'}} alt="saika"/>
                  </div>
                  <div className="d-flex justify-content-center align-items-end p-1 flex-column dropdown-toggle dropdown-toggle-no-caret" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <h6 className="mb-0">Saika Kawakita</h6>
                    <p className="mb-0">saikakawakita69@gmail.com</p>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item py-1 mb-1 " style={{height:'auto',lineHeight : '20px'}} to="/">View Profile</Link>
                    <Link className="dropdown-item py-1 mb-1 " style={{height:'auto',lineHeight : '20px'}} to="/">Sign Out</Link>
                  </div>
              <div>
                </div>
              </div> 
            </div>
          </Header>
          <Content
            style={{
            
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <ToastContainer
            position="bottom-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            theme="light"/>
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
      
    );
  };
  export default MainLayout;