import React, {PureComponent, Fragment} from 'react';
import { Spring, config, Transition } from 'react-spring';
import uuidv4 from 'uuid/v4';
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
    const {count} = this.state;
    const isToggle = this.state.toggle;
    const {transitionStyles} = this.props;
    return(
      <Spring
        to = {{
          opacity: 1,
          backgroundColor: isToggle ? colours[count] : 'lightblue',
          borderColor: isToggle ? 'black' : 'white',
        }}
        config = {config.slow}>
        {styles =>
          <div
            style = {{...styles, ...transitionStyles}}
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
      squares: [],
      toggle: true,
    };
  }
  handleAddSquare = () => {
    this.setState(({squares}) => ({squares: squares.concat([uuidv4()])}));
  }
  handleMinusSquare = () => {
    console.log('minused')
    this.setState(({squares}) => {
      return {squares: squares.slice(1)}
    });
  }
  handleToggle = () => {
    this.setState(({toggle}) => ({toggle: !toggle}));
  }
  renderSquares = () => {
    const {squares} = this.state;
    return(
      squares.map((value) => {
        return(
          <ClickMe key={value} />
        );
      })
    );
  }
  render(){
    const {squares, toggle} = this.state;
    return (
      <Fragment>     
        <button onClick={this.handleAddSquare}>+</button>
        <button onClick={this.handleMinusSquare}>-</button>
        <div id='main-content'>
          <Transition
            keys = {squares}
            from = {{opacity:0, height: 0}}
            enter = {{opacity:1, height: 100}}
            leave = {{opacity:0, height: 0}}
          >
            {squares.map(value => styles => <ClickMe transitionStyles={styles} key={value} />)}
          </Transition>
        </div>
      </Fragment>  
    )
  }
}

export default App;
