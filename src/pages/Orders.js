import React from 'react'
import {Table} from 'antd';
import { getAllOrders, updateOrderStatus } from '../features/order/orderSlice';
import {useDispatch,useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { resetState } from '../utils/resetState';

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
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
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
      title : 'Action',
      dataIndex : 'action',
      key :'action'
    }
  ];

  const Orders = () => {
  const dispatch = useDispatch();

  React.useEffect(()=> {
    dispatch(resetState())
    dispatch(getAllOrders());
  },[])
  const orderSel = useSelector((state) => state.order.allOrders);
  const [orders,setOrders] = React.useState([]);
  
  React.useEffect(()=> {
    const dataSource=[];
    
    for(let i=0;i < orderSel?.length;i++) {
          
          dataSource.push(
        
              {
              key: i+1,
              no : i+1,
              name : orderSel[i].user.firstname+" "+orderSel[i].user.lastname,
              product :  (
              <Link to={`/admin/orders/${orderSel[i]._id}`}>
                View Orders
              </Link>),
              amount : `$ ${orderSel[i].totalPriceAfterDiscount}`,
              date : new Date(orderSel[i].createdAt).toLocaleString(),
              action : (
              <>
                <select className="form-control form-select"
                defaultValue={orderSel[i].orderStatus}
                onChange={(e) => {
                    dispatch(updateOrderStatus({orderStatus:e.target.value,id:orderSel[i]._id}))
                  
                }}
                >
                  <option value="Ordered">Ordered</option>
                  <option value="Processed">Processed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out of Delivery">Out of Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </>)
            }  
          )
        
    }
    console.log(dataSource)
    setOrders(dataSource);
  },[orderSel])
  
  return (
     <div>
        <h3 className="mb-4 title">
            Orders
        </h3>
        <div>
        <Table dataSource={orders} columns={columns} />;
        </div>
     </div>
  )
}

export default Orders;