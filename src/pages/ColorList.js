import React from 'react'
import {Table} from 'antd';
import { AiFillDelete } from 'react-icons/ai';
import {Link} from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import {deleteColor, getAllColors}from '../features/color/colorSlice';
import { useDispatch,useSelector } from 'react-redux';
import Loading from '../components/Loading';
import CustomModal from '../components/CustomModal';
import { resetState } from '../utils/resetState';

const columns = [
{
  title : 'SNo',
  dataIndex : 'sno'
},
{
  title : 'Color',
  dataIndex : 'color',
  key : 'color'
},
{ 
  title : 'Action',
  dataIndex : 'action',
  key : 'action'
}
]
const ColorList = () => {
  const [open,setOpen] = React.useState(false);
  const [loading,setLoading] = React.useState(false);
  const [colorId,setcolorId] = React.useState('');
  const showModal = (id) => {
    setOpen(true);
    setcolorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllColors());
  },[]);
  const colorSel = useSelector((state) => state.color.colors);
  const [dataSource,setDataSource] = React.useState([]);
  React.useEffect(() => {
    const data = colorSel?.map((color,i) => {
      return (
          {
            key : i+1,
            sno : i+1,
            color : color.color,
            action : (
              <>
                <Link to={`/admin/color/${color._id}`}>
                  <BiEditAlt />
                </Link>
                <button 
                className="bg-transparent ms-3 border-0 text-danger fs-5"
                onClick={() =>showModal(color._id)}
                
                >
                  <AiFillDelete />
                </button>
              </>
            )
          }
      )
    })
    setDataSource(data);
  },[colorSel]);
  const handleDelete = (id) => {
    setLoading(true);
    dispatch(deleteColor(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(resetState())
      dispatch(getAllColors());
      setLoading(false);
    },1000)
  }
  return (
     <div className="position-relative">
        <h3 className="mb-4 title">
            Colors
        </h3>
        {loading
         ?
        <div
        className="d-flex align-items-center justify-content-center"
        style={{backgroundColor:'rgba(255,255,255,0.7)',
        width:'100%',
        height:'70vh',
        zIndex:4,
        borderRadius: '20px'
        }}>
          <div>
            <Loading size="default" title="Loading"/>  
          </div>
        </div>
        :
        <>
          <div>
          <Table dataSource={dataSource} columns={columns} />;
          </div>
          <CustomModal
          title="Are you sure to delete this color?"
          open = {open}
          hideModal = {hideModal}
          performAction ={()=> handleDelete(colorId)}
          />
        </>
      }
     </div>
  )
}

export default ColorList