import React, {useContext, useEffect, useState} from 'react'
import "./OrderResult.css"
import {useSearchParams} from "react-router-dom";
import {StoreContext} from "../../context/StoreContext.jsx";
import axios from "axios";
import {assets} from "../../assets/assets.js";
import success_img from "../../assets/success.png";

const OrderResult = () => {

    const [result,setResult] = useState("");
    const [data,setData] = useState({
        msg:"",
        orderNo:"",
        createTime:"",
        totalPrice:"",
        paymentTime:"",
        paymentType:"",
        merchandise:""
    });
    const [searchParams,setSearchParams] = useSearchParams();
    const merchantTradeNo = searchParams.get("merchantTradeNo");
    const {url} = useContext(StoreContext);

    const getOrderResult = ()=>{
        axios.post(`${url}/api/order/result`,{merchantTradeNo}).then(response=>{
            setResult("success");
            setData({
                msg:response.data.msg,
                orderNo:response.data.orderNo,
                createTime:response.data.createTime,
                totalPrice:response.data.totalPrice,
                paymentTime:response.data.paymentTime,
                paymentType:response.data.paymentType,
                merchandise:response.data.merchandise
            });
        }).catch(error=>{
            setResult("fail");
            setData({
                msg:error.response.data.msg,
                orderNo:error.response.data.orderNo,
                merchandise:error.response.data.merchandise,
                totalPrice:error.response.data.totalPrice,
                createTime:error.response.data.createTime,
            });
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getOrderResult();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className='order-result'>
                {

                    data.msg === ""
                        ? <div className='spinner'></div>
                        :data.msg === "支付成功"
                            ?
                            <div className='result-info'>
                                <div className='success-message'>
                                    <div className='title-info'>
                                        <img src={assets.success_img} alt=""/>
                                        <h3>{data.msg}</h3>
                                        <p>您的餐點將盡速送達</p>
                                    </div>

                                    <div className='multi-field'>
                                        <p>訂單編號:</p>
                                        <p>{data.orderNo}</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>創建時間:</p>
                                        <p>{data.createTime}</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>商品內容:</p>
                                        <div className='merchandise-info'>{data.merchandise.map((item, index) => {
                                            return (
                                                <p key={index}>{item}</p>
                                            )
                                        })}</div>
                                    </div>
                                    {/* <div className='multi-field'>
                                        <p>支付方式:</p>
                                        <p>{data.paymentType}</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>支付時間:</p>
                                        <p>{data.paymentTime}</p>
                                    </div> */}
                                    <div className='multi-field'>
                                        <p>總金額:</p>
                                        <p>{data.totalPrice}</p>
                                    </div>
                                    <button className='shopping'><a href="/">繼續選購</a></button>
                                </div>
                            </div>

                            :
                            <div className='result-info'>
                                <div className='fail-message'>
                                    <div className='title-info'>
                                        <img src={assets.fail_img} alt=""/>
                                        <h3>{data.msg}</h3>
                                        <p>請重新選購</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>訂單編號:</p>
                                        <p>{data.orderNo}</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>創建時間:</p>
                                        <p>{data.createTime}</p>
                                    </div>
                                    <div className='multi-field'>
                                        <p>商品內容:</p>
                                        <div className='merchandise-info'>{data.merchandise.map((item, index) => {
                                            return (
                                                <p key={index}>{item}</p>
                                            )
                                        })}</div>
                                    </div>
                                    <div className='multi-field'>
                                        <p>總金額:</p>
                                        <p>{data.totalPrice}</p>
                                    </div>
                                    <button className='shopping'><a href="/">重新選購</a></button>
                                </div>
                            </div>
                    // result === ""?
                    //     <div className='spinner'></div>
                    //     :result === "success"
                    //         ? <div className='result-message'>
                    //             <img src={assets.success_img} alt=""/>
                    //             <h1 className='success'>付款成功</h1>
                    //             <p className='title'>您的餐點將盡速送達</p>
                    //             <div className="payment-detail">
                    //                 <div className="line-info">
                    //                     <p className='title'>Date</p>
                    //                     <p>{data.create_time}</p>
                    //                 </div>
                    //                 <div className="line-info">
                    //                     <p className='title'>Merchant Trade No</p>
                    //                     <p>{data.orderNo}</p>
                    //                 </div>
                    //                 <div className="line-info">
                    //                     <p className='title'>amount</p>
                    //                     <p>${data.totalPrice}</p>
                    //                 </div>
                    //                 <div className="line-info"></div>
                    //             </div>
                    //             <button className='continue'><a href="/">Continue</a></button>
                    //         </div>
                    //         :<div className='result-message'>
                    //             <img src={assets.fail} alt=""/>
                    //             <h1 className="fail">Payment fail</h1>
                    //             <p className="title">Please purchase again</p>
                    //             <button className='continue'><a href="/">Continue</a></button>
                    //         </div>
                }
            </div>
        </>

    )
}
export default OrderResult
