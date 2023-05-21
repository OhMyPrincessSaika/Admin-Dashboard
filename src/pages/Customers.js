import React from 'react'
import {Table} from 'antd';
import { useDispatch,useSelector
 } from 'react-redux';
 import { getAllUsers } from '../features/customers/customerSlice';
const dataSource = [
    {
      key: '1',
      name: 'Mike',
      product: 'Lenovo L340 Gaming',
      status : 'Pending',
      no : '1'
    },
    {
      key: '2',
      name: 'Hsu Mon',
      product: 'Lenovo L340 Gaming',
      status : 'Cash On Delivery',
      no : '2'
    },
    {
      key: '3',
      name: 'Inzali',
      product: 'Lenovo L340 Gaming',
      status : 'Completed',
      no : '3'
    },
   
  ];
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
      title : 'Status',
      dataIndex :'status',
      key : 'status'
    }
  ];
  
  const Customers = () => {
    const dispatch = useDispatch();
    // const selector = useSelector((state) => state.customers);
    React.useEffect(
      () => {
        dispatch(getAllUsers())
      }
      
      , [])
  return (
     <div>
        <h3 className="mb-4 title">
            Customers
        </h3>
        <div>
        <Table dataSource={dataSource} columns={columns} />;
        </div>
     </div>
  )
}

export default Customers