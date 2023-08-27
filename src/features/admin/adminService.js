import axios from 'axios';


const getAllAdmins = async() => {
    try {
        const allAdmins = await axios.get(`http://localhost:5000/admin/authority`);
        return allAdmins.data;
    }catch(err) {
        console.log(err);
    }
}

const getAdmin = async(id) => {
    try {
        const admin = await axios.get(`http://localhost:5000/admin/authority/${id}`);
        return admin.data;
    }catch(err) {
        console.log(err);
    }
}   

const updateAdmin = async(props) => {

    const {data,id} = props;
    try {
        const updatedAdmin = await axios.patch(`http://localhost:5000/admin/authority/${id}`,data);
        return updatedAdmin.data;
    }catch(err) {
        console.log(err);
    }
}

const deleteAdmin = async(id) => {
    try {
        const deletedAdmin = await axios.delete(`http://localhost:5000/admin/authority/${id}`);
        return deleteAdmin.data;
    }catch(err) {
        console.log(err);
    }
}

const addNotification = async(props) => {
    const {adminId,data} = props;
    console.log(data.notification)
    try {
        const updatedAdmin = await axios.patch(`http://localhost:5000/admin/authority/noti/${adminId}`,{name:data.notification.name,description:data.notification.description,read:data.notification.read});
        return updatedAdmin.data;
    }catch(err) {
        console.log(err);
    }
}

const getAllNotifications = async() => {
    try {
        const allNotifications = await axios.get(`http://localhost:5000/admin/authority/noti`);
        return allNotifications.data;
    }catch(err) {   
        console.log(err);
    }
}

const updateNotification = async(id) => {
    try {
        const updatedNotification = await axios.patch(`http://localhost:5000/admin/authority/update-noti/${id}`);
        return updatedNotification.data;
    }catch(err) {
        console.log(err);
    }
}

export const adminService = {getAdmin,getAllAdmins,updateAdmin,deleteAdmin,addNotification,getAllNotifications,updateNotification}