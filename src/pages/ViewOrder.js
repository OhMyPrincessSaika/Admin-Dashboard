import React from 'react'
import {Table} from 'antd';
import { getOrderById } from '../features/order/orderSlice';
import {useDispatch,useSelector} from 'react-redux';
import { Link ,useLocation } from 'react-router-dom';
import { resetState } from '../utils/resetState';
import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi';
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title : 'Brand',
      dataIndex : 'brand',
      key :'brand'
    },
    {
        title : 'Count',
        dataIndex : 'count',
        key : 'count'
    },
    {
        title : 'Color',
        dataIndex  :'color',
        key  : 'color'
    },
    {
      title : 'Amount',
      dataIndex :'amount',
      key : 'amount'
    },
    {
      title : 'Date',
      dataIndex : 'date',
      key: 'date'
    },
    {
        title :'Action',
        dataIndex  :'action',
        key : 'action'
    }
  ];

  const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split('/')[3];
  
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch(getOrderById(orderId));
  },[])
  const orderSel = useSelector((state) => state.order.ordersByUserId);
  const [orders,setOrders] = React.useState([]);
  console.log(orderSel);
  React.useEffect(()=> {
    const dataSource=[];
    
    for(let i=0; i<orderSel?.orderItems?.length; i++) {
      dataSource.push({
        key: i+1,
        no : i +1,
        name : orderSel.user.firstname +" "+orderSel.user.lastname,
        product : orderSel.orderItems[i].product.title,
        brand : orderSel.orderItems[i].product.brand,
        amount : orderSel.orderItems[i].product.price,
        count : orderSel.orderItems.length,
        color : orderSel.orderItems[i].product.color[0].value,
        date : new Date(orderSel.createdAt).toLocaleString(),
        action : (
          <div className="d-flex align-items-center flex-column gap-1">
          <Link to='/'>
            <BiEditAlt className="fs-5"/>
          </Link>
          <button type="button" 
          className='fs-5 text-danger border-0 bg-transparent'
          onClick={() => {
             
          }}
          >
            <AiFillDelete />
          </button>
      </div>
        )

})
    }
   
        
    
    console.log(dataSource);
    setOrders(dataSource);
  },[orderSel])
  console.log(orders)
  
  return (
     <div>
        <h3 className="mb-4 title">
            Order Details
        </h3>
        <p>OrderId : <span style={{color:'blue',fontWeight:'bold'}}>{orderId}</span></p>
        <div>
        <Table dataSource={orders} columns={columns} />;
        </div>
     </div>
  )
}

export default ViewOrder;