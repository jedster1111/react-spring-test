import React, {PureComponent, Fragment} from 'react';
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
    this.setState(({toggle}) => ({ toggle: !toggle }));
    this.updateCount();
  }
  handleHoverIn = () => {
    this.setState({isHovered: true});
  }
  handleHoverOut = () => {
    this.setState({isHovered: false});
  }
  renderSpring = () => {
    const {count, isHovered} = this.state;
    const isToggle = this.state.toggle;
    const rotation = isToggle ? '0deg' : '135deg';
    const translation = `0px,${count*100}px,0px`;
    const scale = isToggle ? (!isHovered ? '1, 1' : '1.05, 1.05') : (!isHovered ? '1.5, 1.5' : '1.55, 1.55');
    return(
      <Spring
        to = {{
          opacity: 1,
          backgroundColor: isToggle ? colours[count] : 'lightblue',
          transform: `translate3d(${translation}) rotate(${rotation}) scale(${scale})`,
          borderColor: isToggle ? 'black' : 'white',
        }}
        config = {config.slow}>
        {styles =>
          <div
            style = {styles}
            className='test'
            onClick={this.handleToggle}
            onMouseEnter={this.handleHoverIn}
            onMouseLeave={this.handleHoverOut}
          />
        }
      </Spring>
    )
  }
  render(){
    return(
        this.renderSpring()
    )
  }
}

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSquares: 0,
    };
  }
  handleAddSquare = () => {
    this.setState((prevState) => ({numberOfSquares: prevState.numberOfSquares + 1}))
  }
  handleMinusSquare = () => {
    this.setState((prevState) => ({numberOfSquares: prevState.numberOfSquares - 1}))
  }
  renderSquares = () => {
    const {numberOfSquares} = this.state;
    let squares = [];
    for(let i=0; i < numberOfSquares; i++){
      squares.push(<ClickMe key={i} />); // Not sure if I should be using index as key here, might cause problems if I want to reorder
    }
    return squares;
  }
  render(){
    return (
      <Fragment>     
        <button onClick={this.handleAddSquare}>+</button>
        <button onClick={this.handleMinusSquare}>-</button>
        <div id='main-content'>
            {this.renderSquares()}
        </div>
      </Fragment>  
    )
  }
}

export default App;
