import React, {PureComponent} from 'react';
import { Spring, config } from 'react-spring';
import './App.css';

const colours = [
  '#3D9970',
  'orange',
  '#692822',
  '#571C39',
  '#478154'
]

class ClickMe extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      toggle:true,
      count:0,
      ascend: true,
      isHovered: false,
    }
  }
  componentDidMount(){
    //setInterval(this.updateCount, 2500);
  }
  updateCount = () =>{
    let {ascend} = this.state;
    if(this.state.count <= 0){
      ascend = true;
    } else if(this.state.count >= 4){
      ascend = false;
    }
    this.setState(
      ({count}) => (
        {count: count + (ascend ? 0.5 : -0.5), ascend: ascend}
      )
    )
  }
  handleToggle = () => {
    this.setState(state => ({ toggle: !state.toggle }));
    this.updateCount();
  }
  handleHoverIn = () => {
    this.setState({isHovered: true});
  }
  handleHoverOut = () => {
    this.setState({isHovered: false});
  }
  render(){
    const {count, isHovered} = this.state;
    const isToggle = this.state.toggle;
    const rotation = isToggle ? '0deg' : '135deg';
    const translation = `0px,${count*100}px,0px`;
    const scale = isToggle ? (!isHovered ? '1, 1' : '1.05, 1.05') : (!isHovered ? '1.5, 1.5' : '1.55, 1.55');
    return(
      <Spring
        from = {{ opacity:0 }}
        to = {{
          opacity: 1,
          backgroundColor: isToggle ? colours[Math.floor(count)] : 'lightblue',
          transform: `translate3d(${translation}) rotate(${rotation}) scale(${scale})`,
          borderColor: isToggle ? 'black' : 'white',
        }}
        config = {config.gentle}>
        {styles =>
          [<div
            style = {styles}
            className='test'
            onClick={this.handleToggle}
            onMouseEnter={this.handleHoverIn}
            onMouseLeave={this.handleHoverOut}
          />]
        }
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
