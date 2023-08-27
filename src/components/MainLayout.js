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
import {TbSlideshow} from 'react-icons/tb';
import {ImBlog} from 'react-icons/im';
import {Outlet, useNavigate} from 'react-router-dom';
import {FaClipboardList,FaBloggerB,FaModx} from 'react-icons/fa';
import { Layout, Menu, notification, theme } from 'antd';
import React, { useState } from 'react';
import {IoIosNotifications,IoIosAddCircle} from 'react-icons/io';
import {ImImage} from 'react-icons/im';
import {Link} from 'react-router-dom';
import { useStateContext } from '../app/ContextProvider';
import {RiCoupon2Line,RiCouponLine} from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
//just temporary

import { getAdmin, getAllNotifications, updateNotification } from '../features/admin/adminSlice';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const dispatch = useDispatch();
  const [notifications,setNotifications ] = React.useState([]);
  const [unreadNotis,setUnreadNotis] = React.useState([]);
    const adminId = JSON.parse(localStorage.getItem('admin')).admin._id;
    const profileSel = useSelector((state) => state.admin.admin?.profile_img);
    const notiSel = useSelector ((state) => state.admin.notification);
    const allNotiSel = useSelector((state) => state.admin.notifications);
    // console.log(allNotiSel);
    // console.log(notifications);
    React.useEffect(() => {
      dispatch(getAdmin(adminId));
    },[])
    React.useEffect(() => {
      dispatch(getAllNotifications());
    },[notiSel]);
    React.useEffect(() => {
      if(allNotiSel?.length > 0)  {
        setNotifications(allNotiSel);
        const filterUnreadNotis = allNotiSel?.filter((noti) => noti.read === false);
        setUnreadNotis(filterUnreadNotis);
      }
    },[allNotiSel]);
    const {admin,setAdmin,profileImg,setProfileImg} = useStateContext();
      if(admin?.firstname === undefined) {
        const adminFromLocalStorage = JSON.parse(localStorage.getItem('admin'))?.admin;
       
        setAdmin(adminFromLocalStorage);
        
      }
    
    // const [admin,setAdmin] = React.useState({});
    // const [profileImg,setProfileImg] = React.useState({});
    const [loading,setLoading] = React.useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    // const adminFromLocalStorage = JSON.parse(localStorage.getItem('admin'))?.admin;
    // React.useEffect(() => {
    //   setAdmin(adminFromLocalStorage)
    // },[]);
    React.useEffect(() => {
      if(profileSel) {
        setProfileImg({url:profileSel?.url,asset_id:profileSel?.asset_id,public_id:profileSel?.public_id});
      }
    },[profileSel])
    return (
      <>
        {
          loading ?
          ''
          :
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
                  {
                    key : 'banners',
                    icon : <TbSlideshow className='fs-4'/>,
                    label : 'Banners',
                    children : [
                      {
                        key : 'banner',
                        icon : <IoIosAddCircle className='fs-4'/>,
                        label : 'Add Banner'
                      },
                      {
                        key : 'banner-list',
                        icon : <ImImage className='fs-4'/>,
                        label : 'Banner List'
                      }
                    ]
                  },
                  {
                    key : 'banner-cats',
                    icon : <FaModx className='fs-4'/>,
                    label : 'Banner Categories',
                    children : [
                      {
                        key : 'banner-cat',
                        icon : <IoIosAddCircle className='fs-4'/>,
                        label : 'Add Category'
                      },
                      {
                        key : 'banner-cat-list',
                        icon : <ImImage className='fs-4'/>,
                        label : 'Category List'
                      }
                    ]
                  }
                  
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
                    <IoIosNotifications className="fs-4" style={{cursor:'pointer'}} onClick={() => {
                      const container = document.querySelector('.notification-container');
                      if(container.classList.contains('active')) {
                        container.classList.remove('active');
                      }else {
                        container.classList.add('active');
                      }
                     }}/>
                    <span className="position-absolute badge bg-warning  rounded-circle" style={{top:'15%',right:'-10%'}}>
                      {unreadNotis?.length}
                    </span>
                    <div className="position-absolute notification-container">
                       {notifications?.map((noti,key) => {
                        const dateObj = new Date(noti.createdAt);
                        const options = {weekday : 'short',hour : 'numeric',minute:'numeric',timeZone: 'Asia/Yangon'};
                        const dateFormat = dateObj.toLocaleDateString('en-Us',options);
                        const format1 =dateFormat.replace(/^\s+|\s+$/g, '').replace(/\s+(\w{2})$/, ' $1').replace(/\s+/, ' at ');
                        const options2 = {day : 'numeric',month:'short',year:'numeric',timeZone:'Asia/Yangon'};
                        const format2 = dateObj.toLocaleDateString('en-Us',options2);
                
                        return (
                              <div key={key}
                              onClick={async() => {
                                await dispatch(updateNotification(noti?._id)).unwrap();
                                await dispatch(getAllNotifications()).unwrap();
                                document.querySelector(`[data-id="${noti?._id}"]`).classList.remove('unread');
                              }} 
                              data-id={noti?._id}
                              className={`notification ${noti.read ? '' : 'unread'}`}>
                                <p className="description "><span className="name">{noti.name}</span> {noti.description}</p>
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="time mb-0">{format1}</p>
                                  <p className="date mb-0">{format2}</p>
                                </div>
                            </div>

                        )
                       })}
                       
                    </div>
                  </div>
                  <div className="d-flex align-items-center  gap-3 dropdown">
                      <div >
                        <img src={profileImg.url ||'https://th.bing.com/th/id/R.653f93c3cb58cb7f21b6a721ebdbec19?rik=jdfs8mriT15fAQ&pid=ImgRaw&r=0'}  style={{width:'32px',height:'32px',objectFit:'cover'}} alt="saika"/>
                      </div>
                      <div
                      style={{cursor:"pointer"}} 
                      className="d-flex justify-content-center align-items-end p-1 flex-column dropdown-toggle dropdown-toggle-no-caret" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <h6 className="mb-0">{admin?.firstname} {admin?.lastname}</h6>
                        <p className="mb-0">{admin?.email}</p>
                        </div>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item py-1 mb-1 " style={{height:'auto',lineHeight : '20px'}} to="/admin/profile">View Profile</Link>
                        <button className="dropdown-item py-1 mb-1 bg-transparent border-0" style={{height:'auto',lineHeight : '20px'}} 
                        onClick={() => {
                          setLoading(true);
                          localStorage.clear();
                          navigate('/login',{replace: true});
                          window.location.reload();
                         
                        }}
                        >Sign Out</button>
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
        }
      </>
      
    );
  };
  export default MainLayout;