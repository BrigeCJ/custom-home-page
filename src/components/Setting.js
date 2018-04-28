import React, {Component} from 'react'
import '../assets/styles/setting.css'

class Setting extends Component {
  constructor (props) {
    super(props);
    this.state = {
      targetOpenMethods: [{
        title: '在新标签页中打开打开网站',
        checked: true
      }, {
        title: '在新标签页中打开第三方搜索结果',
        checked: false
      }, {
        title: '在新标签页中打开书签链接',
        checked: false
      }, {
        title: '在新标签页中打开历史记录',
        checked: false
      }]
    };
  }
  render () {
    let targetOpenMethods = this.state.targetOpenMethods
    return (
      <div className="setting-box">
        <div className="setting-item-wrapper">
          <div className="setting-item-title">目标打开方式</div>
          <div className="setting-item">
          {
            targetOpenMethods.map((item, index) => (<div className="setting-toggle" key={index}>
                <div className="setting-toggle-text setting-text-btn-max-width">
                  <span>{item.title}</span>
                </div>
                <input type="checkbox" className="checkbox-toggle" defaultChecked={item.checked}/>
            </div>))
          }
            <div className="setting-toggle">
              <p className="tips">注意：以上打开方式仅作用于该应用</p>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">视图</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-add-max-width">
                <span>主屏幕视图缩放</span>
              </div>
              <div className="setting-add-reduce-box">
                <button className="setting-reduce-btn setting-reduce-add-common"/>
                <span className="setting-reduce-add-number">100%</span>
                <button className="setting-add-btn setting-reduce-add-common"/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-add-max-width">
                <span>侧边栏视图缩放</span>
              </div>
              <div className="setting-add-reduce-box">
                <button className="setting-reduce-btn setting-reduce-add-common"/>
                <span className="setting-reduce-add-number">100%</span>
                <button className="setting-add-btn setting-reduce-add-common"/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>在右下角显示随机切换壁纸按钮</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标阴影</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标圆角</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" data-progress="50%"/>
                <progress className="setting-progress" max="50" value="50"/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>图标不透明</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" data-progress="50%"/>
                <progress className="setting-progress" max="50" value="50"/>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div className="setting-item-title">搜索框</div>
          <div className="setting-item">
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>隐藏搜索框</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>隐藏搜索类别</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>隐藏搜索按钮</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框阴影</span>
              </div>
              <input type="checkbox" className="checkbox-toggle"/>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框大小</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" data-progress="50%"/>
                <progress className="setting-progress" max="50" value="50"/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框圆角</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" data-progress="50%"/>
                <progress className="setting-progress" max="50" value="50"/>
              </div>
            </div>
            <div className="setting-toggle">
              <div className="setting-toggle-text setting-text-btn-max-width">
                <span>搜索框不透明度</span>
              </div>
              <div className="setting-range-progress">
                <input type="range" className="setting-range" min="0" max="50" data-progress="50%"/>
                <progress className="setting-progress" max="50" value="50"/>
              </div>
            </div>
          </div>
        </div>
        <div className="setting-item-wrapper">
          <div>
            <div className="setting-item-title">还原默认设置</div>
          </div>
          <div className="setting-toggle">
            <div className="tips">执行操作后将所有设置项还原</div>
            <div className="reset-btn-box">
              <button className="reset-btn">立即还原</button>
            </div>
          </div>
        </div>
        <div className="tips no-more">
          <div className="line"/>
          <span>我是有底线的</span>
          <div className="line"/>
        </div>
      </div>
    )
  }
}

export default Setting;