import React, {Component} from 'react';
import '../assets/styles/discover.css'

import weixinQCode from '../assets/imgs/weixin-qcode.png'
import zhifubao from '../assets/imgs/zhifubao_qcode.png'

class Discover extends Component {
  render () {
    return (
     <div className="discover-card-box">
        <div className="discover-card">
          <div className="discover-card-img weixin"/>
          <div className="discover-card-content">
            <div className="discover-card-qcode">
              <img src={weixinQCode} alt="微信二维码"/>
            </div>
            <div className="discover-title">关注checkson微信号</div>
          </div>
        </div>
       <div className="discover-card">
         <div className="discover-card-img zhifubao"/>
         <div className="discover-card-content">
           <div className="discover-card-qcode">
             <img src={zhifubao} alt="支付宝二维码"/>
           </div>
           <div className="discover-title">您的支持是对我极大的肯定</div>
         </div>
       </div>
     </div>
    )
  }
}

export default Discover