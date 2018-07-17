import React, {PureComponent} from 'react';
import { Spring, config } from 'react-spring';
import './App.css';

class ClickMe extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      toggle:true,
      timer:0,
      ascend: true,
    }
  }
  componentDidMount(){
    setInterval(this.updateTimer, 2500);
  }
  updateTimer = () =>{
    let {ascend} = this.state;
    if(this.state.timer === 0){
      ascend = true;
    } else if(this.state.timer === 4){
      ascend = false;
    }
    this.setState(
      ({timer}, props)=>({timer: timer + (ascend ? 1 : -1), ascend: ascend})
    );
  }
  handleToggle = () => this.setState(state => ({ toggle: !state.toggle }));
  render(){
    const isToggle = this.state.toggle;
    const rotation = isToggle ? '0deg' : '150deg';
    const translation = isToggle ? `0px,${this.state.timer*100}px,0px` : '50px, 100px,0px';
    const scale = isToggle ? '1, 1' : '1.5, 1.5';
    return(
      <Spring
        from = {{ opacity:0 }}
        to = {{
          opacity: 1,
          backgroundColor: isToggle ? 'yellow' : 'lightblue',
          transform: `translate3d(${translation}) rotate(${rotation}) scale(${scale})`,
          borderColor: isToggle ? 'black' : 'white',
        }}
        config = {config.wobbly}>
        {styles => <div style = {styles} className='test' onClick={this.handleToggle}>I will fade in</div>}
      </Spring>
    )
  }
}

class App extends PureComponent {
  render(){
    return (
      <div id='main-content'>
        <ClickMe />
        <ClickMe />
      </div>
    )
  }
}

export default App;
