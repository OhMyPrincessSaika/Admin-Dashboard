import React from 'react'
import {Table} from 'antd';
import { useDispatch,useSelector
 } from 'react-redux';
 import { getAllUsers } from '../features/customers/customerSlice';

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title : 'Phone Number',
      dataIndex :'phone',
      key : 'phone'
    },
    {
      title : 'Admin',
      dataIndex : 'admin',
      key : 'admin'
    }
  ];
  
  const Customers = () => {
    const dispatch = useDispatch();
    const cusSel = useSelector((state) => state.customer.customers);
    const dataSource = [];
    for(let i=0; i< cusSel?.length; i++) {
      const obj = {};
      obj.name = cusSel[i]?.firstname + " " + cusSel[i]?.lastname;
      obj.email = cusSel[i]?.email;
      obj.phone = cusSel[i]?.phonenum;
      obj.no = i+1;
      obj.key = cusSel[i]?._id;
      obj.admin = cusSel[i]?.isAdmin ? 'admin' : '-';
      dataSource.push(obj);
    }

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