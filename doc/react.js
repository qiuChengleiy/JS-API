1.react 渲染组件时只能渲染创建DOM到根节点上。
   let h1 = React.createElement(
            'h1',
            {
                title:'你好',
            },
            'welcome react'
        );
        ReactDOM.render(h1,document.getElementById('app'),() => {
            alert('')
          //  ReactDOM.render(h3,document.getEelmentById('app2'));
        });

2.  let Ul = React.createElement(
          'ul',
          null,
          React.createElement(
              'li',
              null,
              '女装/男装/'
          ),
          React.createElement(
              'li',
              null,
              '童装/玩具/'
          )
      );

     //将虚拟DOM 渲染到页面
        ReactDOM.render(Ul,document.getElementById('app'));
        ReactDOM.render(Ul,document.getElementById('app2'));

3.组件
 
      let Components = React.createClass({
          render() {
        //       return React.createElement('apps',null,
        //         React.createElement(
        //             'div',
        //             null,
        //             '我是组件1'
        //         ),
        //         React.createElement(
        //             'div',
        //             null,
        //             '我是组件2'
        //         )
        //       )
        //   }

        //JSX
            return(
                <div>
                 <div>我是组件1</div>
                 <div>我是组件2</div>
                 </div>
            )
          }
      });

     //let DOMs = React.createElement(Components);
      //jsx
      let DOMs = (<Components />);
      ReactDOM.render(DOMs,document.getElementById('app'));

4.状态...此处略写
  
          //状态机制
         getInitialState() {
             return {count:0};
         },     
         click() {
             this.setState((state) => {
                  return {
                      count:state.count+1
                  };
             });
         },
         return(
                <div>
                 <button onClick = {this.click}>当前次数为：{this.state.count}</button>
                 <div>我是组件1</div>
                 <div>我是组件2</div>
                 </div>
            )

5.列表渲染
   lists() {
             let arr = [1,2,3,4,5];
            return arr.map((index,value) => {
                  return(
                      <li key={index}>{value}</li>
                  ) 
             })
         },

6.属性props传值  
  
     //默认属性
   getDefaultProps() {
           return {
               user:'0'
           }
        },
  获取：this.props.user

  父组件向子组件： props
  子组件向父组件： 利用props向子组件传递回调函数，子组件触发函数
<div id="correspond"></div>

<!--js代码-->
<script type="text/babel">
    ///子组件
    var HelloMessage = React.createClass({
        childMethod: function(){
            alert("组件之间通信成功");
        },
        render: function() {
            return <div> <h1>Hello {this.props.name}</h1>  <button onClick={this.childMethod}>子组件</button></div>
        }
    });

    //父组件
    var ImDaddyComponent = React.createClass({
        getDS: function(){
            //调用组件进行通信
            this.refs.getSwordButton.childMethod();
        },
        render: function(){
            return (
                    <div>
                        <HelloMessage name="John" ref="getSwordButton" />
                        <button onClick={this.getDS}>父组件</button>
                    </div>
            );
        }
    });

    ReactDOM.render(
            <ImDaddyComponent  />,
            document.getElementById('correspond')
    );

</script>



7.样式
   let styles = {
               border:'none'
           }
   style = {styles}

8.生命周期：
    //将要构建组件
         componentWillMount() {
             console.log('我要开始构建组件啦');
         },

  //构建完成
          componentDidMount() {
             console.log('构建好了，让我来查询一下')
             let info = ReactDOM.findDOMNode(this);
             console.log(info,this.state,this.props);
             //构建完成后的状态无法修改
            // this.state = {
            //     count:0
            // }
            //  this.props.user = ;
            info.style.border = '1px solid red';
          }
      });

    //存在期
            componentWillReceiveProps(){  //1.接受属性
                console.log('1 接受属性')
            },
            shouldComponentUpdate(){      //2.是否应该更新 必须有返回值
                console.log('2 更新 ')
                return true;
            },
            componentWillUpdate() { //3 组件将要更新
                console.log('3 组件将要更新')
            },
            //第四个阶段渲染dom render 方法已经被定义
            componentDidUpdate(){//5.组件更新完成
                console.log('5.组件更新完成')
            }

9. goSearch(e){
                //这里的事件对象e只能获取span元素 想要获取input  可以通过rel属性来获取input
                //获取input
                let inp = this.refs.serInt;
                console.log(inp.value)
            },
            render(){
                let count = {
                    __html: '<span style="color: red; display: inline-block;width: 30px;">高级搜索</span>'
                }
                return (
                    <div className="search">
                        <input ref="serInt" type="text"/>
                        <span onClick={this.goSearch}>搜索</span>
                        {/*内容样式通过dangerouslySetInnerHTML设置*/}
                        <span dangerouslySetInnerHTML={count}></span>
                    </div>

10.ajax(jquery)

//一定要注意先渲染组件然后拿到数据在渲染视图，调用AJAX时要注意箭头函数

componentDidMount: function () {
            $.ajax({
                url: this.props.source,
                dataType:'jsonp',
                cache:true,
                success:(res)=>{
                    this.setState({
                        dataUrl:this.props.source,
                        arrData:res.subjects
                    })
                }
            })
        },
        render: function () {
            console.log(this.state.arrData);
            return (
                    <div>
                        <div>数据接口地址:<a href={this.state.dataUrl}>{this.state.dataUrl}</a></div>
                        <ul>
                            {this.state.arrData.map((value,index)=> {
                                return (<li key={index}>{value.title}</li>)
                            })}
                        </ul>
                    </div>
            );
        }
    });
    ReactDOM.render(
            <DataList source="https://api.douban.com/v2/movie/top250?count=7'"/>,
        document.getElementById('app')
    );


11.面向对象与继承：react组件高级写法
  class Test extends React.Component {
        constructor(...args) {
            super(...args);
            this.state = {a: 12};

        }

        fn() {
            this.setState({
                a: this.state.a+1
            })
        }

        render() {
            return <div>
                <span>{this.state.a}</span>  //必须绑定this
                <input type="button" value="按钮" onClick={this.fn.bind(this)}/>
            </div>
        }
    }

    window.onload = function () {
        ReactDOM.render(
                <Test/>,
            document.getElementById('app')
        )
    }


12.React-Router-dom使用：
      在jsx中一定要注意元素的包裹，只允许有一个根元素
      工程创建：react 构建工具
          npm install -g create-react-app
		create-react-app demo-app
		cd demo-app
           路由安装：
              npm install react-router-dom --save

      必要模块导入：
        import React from 'react'
	import {
	  BrowserRouter as Router,
	  Route,
	  Link
	} from 'react-router-dom'
     
      基本用法：
            允许class类写的组件插入,注意包裹关系就行
          let compnent = () => (
                     <Router>
			<a><Link to='/patch'>这里需要跳的路径</Link></a>

                        <Route patch='/patch' component={my component注意大小写:这里渲染当前路径对应的模板}>
                     </Router>
		);
            二次子路由传入{match}对象   可以用模板字符串: 路由解析：match.params. (url参数)

              const Topics = ({ match }) => (
		  <div>
		    <h2>Topics</h2>
		    <ul>
		      <li>
			<Link to={`${match.url}/rendering`}>
			  Rendering with React
			</Link>
		      </li>
		      <li>
			<Link to={`${match.url}/components`}>
			  Components
			</Link>
		      </li>
		      <li>
			<Link to={`${match.url}/props-v-state`}>
			  Props v. State
			</Link>
		      </li>
		    </ul>

		    <Route path={`${match.url}/:topicId`} component={Topic}/>
		    <Route exact path={match.url} render={() => (
		      <h3>Please select a topic.</h3>
		    )}/>
		  </div>
		)

		const Topic = ({ match }) => (
		  <div>
		    <h3>{match.params.topicId}</h3>
		  </div>
		)


  路由认证功能：

                import React, { Component } from 'react';
		import {
		  BrowserRouter as Router,
		  Route,
		  Link,
		  Redirect,
		  withRouter
		} from 'react-router-dom'
		import { setTimeout } from 'timers';

            <li><Link to='/protected'>需要登录才能看到</Link></li>
	    <PrivateRoute path='/protected' component={Protected}/> 
	    <Route path='/login' component={Login}/>

	    //认证功能：

		//进行对象判断

		const judge = {
		    islogin:false,
		    login(cb) {
		       this.islogin = true;
		       setTimeout(cb,100);
		    },
		    logout(cb) {
			this.islogin = false;
			alert('')
			setTimeout(cb,100);
		    }
		}

             
		class Login extends Component{
		    state={
			redirectToReferrer:false
		    }
		    logins = () =>{
			judge.login(() => {
			    this.setState({redirectToReferrer:true})
			})
		    }

		    render() {
			const {from} = this.props.location.state || {from:{pathname:'/'}}
			const {redirectToReferrer} = this.state;

			if(redirectToReferrer){
			    return(
				<Redirect to={from} />
			    )
			}
			return(
			    <div>
				<p>你必须登录后才能看到内容</p>
				<button onClick={this.logins}>Log IN</button>
			    </div>
			)
		    }
		}

		const Protected = ()=>(
		     <h1 style={{color:'red'}}>protected</h1>
		)


		const PrivateRoute = ({component: Component,...rest }) => (
		      <Route {...rest} render={props => (
			  judge.islogin?(
			      <Component {...props}/>
			  ):(
			      <Redirect to={{
				  pathname:'/login',
				  state:{from:props.location}
			      }}/>
			  )
		      )}/>  
		 )

		  //调用对象withRouter //注意返回
		const Showpage =withRouter(({history}) => {
		    return(
		   judge.islogin?(
		       <div>
		       welcome!<button onClick={
			   () => {judge.logout(() => history.push('/'))} 
		       }>sign out</button>
		       </div>
		   ):(
		       <p>你还没有登录哦</p>
		   ))   
		});
		    
react-redux状态管理机制：
	1.步骤

	定义 UI 组件。规划组件属性 this.props，组件属性包括【展示属性】和【绑定事件】
	定义组件通信。包括【展示数据】到 state 的映射、【绑定事件】到 dispatch 的映射
	将 UI 组件包装成容器组件
	定义容器组件的 Reducer
	生成 Store 对象，并使用 Provider 在根组件外面包一层

简单实例：

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
