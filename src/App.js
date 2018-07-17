import React, {PureComponent} from 'react';
import { Spring, animated } from 'react-spring';
import './App.css';

class ClickMe extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      toggle:true,
    }
  }
  handleToggle = () => this.setState(state => ({ toggle: !state.toggle }));
  render(){
    const isToggle = this.state.toggle;
    const rotation = isToggle ? '0deg' : '150deg';
    const translation = isToggle ? '0px,0px,0px' : '50px, 100px,0px';
    const scale = isToggle ? '1, 1' : '1.5, 1.5';
    return(
      <Spring
        native
        from = {{ opacity:0 }}
        to = {{
          opacity: 1,
          backgroundColor: isToggle ? 'yellow' : 'lightblue',
          transform: `translate3d(${translation}) rotate(${rotation}) scale(${scale})`,
          borderColor: isToggle ? 'black' : 'white',
        }}>
        {styles => <animated.div style = {styles} className='test' onClick={this.handleToggle}>I will fade in</animated.div>}
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
