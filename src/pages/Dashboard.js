import React from 'react'
import { Column } from '@ant-design/plots';
import {Table} from 'antd';
import {useDispatch,useSelector} from 'react-redux';
import { getAllOrders, getMonthlyOrderIncome,getYearlyOrderIncome } from '../features/order/orderSlice';
import { useStateContext } from '../app/ContextProvider';
const Dashboard = () => {
  const dispatch = useDispatch();
  const [monthlyData , setMonthlyData] = React.useState([]);
  const [monthlySale, setMonthlySale] = React.useState([]);
  const [allOrders,setAllOrders] = React.useState([]);
  const token = useSelector((state) => state?.auth?.user?.token);
  const {setAdmin,setToken} = useStateContext();
  React.useEffect(() => {

    if(token === undefined) {
       let user = JSON.parse(localStorage.getItem('admin'));
       setAdmin(user?.admin);
       dispatch(getMonthlyOrderIncome(user?.token));
       dispatch(getYearlyOrderIncome(user?.token));
       dispatch(getAllOrders(user?.token));
    }else {
      let user = JSON.parse(localStorage.getItem('admin'));
      setAdmin(user?.admin);
      setToken(user?.token);
      dispatch(getMonthlyOrderIncome(token));
      dispatch(getYearlyOrderIncome(token));
      dispatch(getAllOrders(token));
    }
  },[token]);
  const monthlySel = useSelector((state) => state.order.monthlyData);
  const yearlySel = useSelector((state) => state.order.yearlyData)
  const ordersSel  = useSelector((state) => state.order.allOrders);
  React.useEffect(() => {
    let data = [];
    for(let i=0; i<ordersSel?.length; i++) {
      data.push({
        key: i,
        name: ordersSel[i]?.user?.firstname + ' ' + ordersSel[i]?.user?.lastname,
        product_count: ordersSel[i]?.orderItems?.length,
        total_price : ordersSel[i]?.totalPrice,
        total_price_after_discount:ordersSel[i]?.totalPriceAfterDiscount,
        status : ordersSel[i]?.orderStatus,
        no : i
      
    })
    }
    setAllOrders(data);
  },[ordersSel]);

  
  React.useEffect(() => {
    var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
    const data= [];
    const salesArr = [];
    let date = new Date();
    for(let i=0; i<= 11; i++) {
      date.setMonth(date.getMonth() - 1);

      data.push({month : month[date.getMonth()],income :0});
      salesArr.push({month: month[date.getMonth()],sales : 0})
    }
    console.log(new Date().getMonth());
    for(let i=0; i< monthlySel?.length; i++) {
      const element = monthlySel[i];
       data.push({month : month[element?._id?.month],income : element?.amount});
       salesArr.push({month : month[element?._id?.month],sales : element?.count})
       
    }
    setMonthlyData(data);
    setMonthlySale(salesArr)
  },[monthlySel])
  

  const config1 = {
    data:monthlySale,
    xField: 'month',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'bottom',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#000',
        opacity: 1,
      },
    },
    color: ({ type }) => {
      return 'lime';
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      income: {
        alias: 'Sales',
      },
    },
    // minColumnWidth: 50,
    // maxColumnWidth: 70,
  };
  const config = {
    data:monthlyData,
    xField: 'month',
    yField: 'income',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'bottom',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#000',
        opacity: 1,
      },
    },
    color: ({ type }) => {
      return 'cyan';
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Month',
      },
      income: {
        alias: 'Income',
      },
    },
    // minColumnWidth: 50,
    // maxColumnWidth: 70,
  };
  
  
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
      title: 'Product Count',
      dataIndex: 'product_count',
      key: 'product-count',
    },
    {
      title : 'Total Price',
      dataIndex : 'total_price',
      key : 'total-price'
    },
    {
      title : 'Total Price After Discount',
      dataIndex : 'total_price_after_discount',
      key : 'total-price-after_discount'
    },
    {
      title : 'Status',
      dataIndex :'status',
      key : 'status'
    }
  ];
  return (
      <div>
        <h3 className="mb-4 title">Dashboard</h3>
        <div className="d-flex justify-content-between gap-3 align-items-center flex-wrap">
          <div 
          style={{backgroundColor:'#f5f5f7'}}
          className="d-flex justify-content-between align-items-end p-3 rounded-3 flex-grow-1 text-white">
              <div className="d-flex flex-column  justify-content-between align-items-start" style={{height:'80px'}}>
                <p className="desc">Total Income</p> <h4 className="mb-0 subtitle">$ {yearlySel &&  yearlySel[0]?.amount ? yearlySel[0]?.amount : 0}</h4>
              </div>
              <div className="d-flex flex-column  justify-content-between align-items-end" style={{height:'80px'}}>
                {/* <h6 className="green"><BsArrowDownRight/>32%</h6> */}
                <div></div>
                <p className="mb-0 desc">Total Income of last 12 months</p>
              </div>
          </div>
          <div 
          style={{backgroundColor:'#f5f5f7'}}
          className="d-flex justify-content-between align-items-end  p-3 rounded-3 flex-grow-1 text-white">
              <div className="d-flex flex-column  justify-content-between align-items-start" style={{height:'80px'}}>
                <p className="desc">Total Sales</p> <h4 className="mb-0 subtitle">{yearlySel && yearlySel[0]?.count ? yearlySel[0]?.count : 0}</h4>
              </div>
              <div className="d-flex flex-column  justify-content-between align-items-end" style={{height:'80px'}}>
                <div></div>
                <p className="mb-0 desc">Total Sales of last 12 months</p>
              </div>
          </div >
        
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <div className="flex-grow-1 w-100">
            <h3 className="mb-4 mt-4 title">Income Statistics</h3>
            <Column {...config} />
          </div>
          <div className="flex-grow-1 w-100">
            <h3 className='mb-4 mt-4 title'>Sales Statistics</h3>
            <Column {...config1} />
          </div>
        </div>
        <h3 className="mb-4 mt-4 title">Recent Orders</h3>
        <div>
        <Table dataSource={allOrders} columns={columns} />
        </div>
      </div>
  )
}

export default Dashboard