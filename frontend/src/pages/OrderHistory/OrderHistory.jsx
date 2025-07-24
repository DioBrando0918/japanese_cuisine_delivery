import React, {useContext, useEffect, useState} from 'react'
import './OrderHistory.css'
import axios from "axios";
import {StoreContext} from "../../context/StoreContext.jsx";
import {useSnackbar} from "notistack";
import {assets} from "../../assets/assets.js";
import {Link} from "react-router-dom";

const OrderHistory = () => {

    const { enqueueSnackbar } = useSnackbar();
    const {url} = useContext(StoreContext)
    const [data,setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.post(`${url}/api/order/userOrders`,{},{headers:{token}}).then(response=>{
            setData(response.data.userOrders);
            console.log(response.data.userOrders)
        }).catch(error=>{
            enqueueSnackbar('獲取資料失敗', { variant: 'error' });
            console.log(`${error.response.data.msg}`);
        })
    }, []);

    return (
        <div className='order-history'>

            {
                data.length > 0
                    ?
                    <table className='history-table'>
                        <thead>
                        <tr>
                            <th className='orderNo-col'>訂單編號</th>
                            <th className='create-time-col'>建立時間</th>
                            <th className='payment-time-col'>支付時間</th>
                            <th className='payment-type-col'>支付方式</th>
                            <th className='merchandise-col'>商品內容</th>
                            <th className='address-col'>收貨地址</th>
                            <th className='total-price-col'>總金額</th>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <tr className='table-items' key={index}>
                                        <td className='table-item'>{item.orderNo}</td>
                                        <td className='table-item'>{item.createTime}</td>
                                        <td className='table-item'>{item.paymentTime?item.paymentTime:'無'}</td>
                                        <td className='table-item'>{item.paymentType?item.paymentType:'無'}</td>
                                        <td className='table-item'>
                                            <div className='merchandise-col-info'>
                                                {
                                                    item.merchandise.map((item, index) => {
                                                        return (
                                                            <p key={index}>{item}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                        <td className='table-item'>{item.address}</td>
                                        <td className='table-item'>{item.totalPrice}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    : <div className='no-history'>
                        <div className='no-history-content'>
                            <img src={assets.empty_img} alt=""/>
                            <h2>查無訂單資料</h2>
                        </div>
                        <button><Link to='/menu-introduce'>開始訂餐</Link></button>
                    </div>
            }

        </div>
    )
}
export default OrderHistory
