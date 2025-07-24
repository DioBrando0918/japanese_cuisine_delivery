import React, {useContext, useEffect, useState} from 'react'
import './OrderList.css'
import axios from "axios";
import {useSnackbar} from "notistack";

const OrderList = ({url}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [data,setData] = useState([])

    useEffect(() => {
        axios.get(`${url}/api/order/list`).then(response=>{
            setData(response.data.orderList)
        }).catch(error=>{
            console.log(error.response.data.msg);
            enqueueSnackbar('獲取資料失敗', { variant: 'error' });
        })
    }, []);

    return (
        <div className='order-list'>
            <table className='order-table'>
                <thead className='table-title'>
                <tr>
                    <th className='orderNo-col'>訂單編號</th>
                    <th className='userId-col'>使用者編號</th>
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
                            <tr className='table-items' key={item._id}>
                                <td className='table-item'>{item.orderNo}</td>
                                <td className='table-item'>{item.userId}</td>
                                <td className='table-item'>{item.createTime}</td>
                                <td className='table-item'>{item.paymentTime ? item.paymentTime : '無'}</td>
                                <td className='table-item'>{item.paymentType ? item.paymentType : '無'}</td>
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
        </div>
    )
}
export default OrderList
