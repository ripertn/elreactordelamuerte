var React = require('react')
var ReactDOM = require('react-dom')


class AddSome extends React.Component {
  constructor(props){
    super(props);
    this.state = {index: 0, value: "init", list: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(event){
    this.setState((prevState) => ({index: prevState.index+1})) // better because asynchronous
    this.state.list[this.state.index] = [this.state.value, this.state.index]; //using tuple to avoid identic key
    // this.setState({list: this.state.list});
  }

  handleDelete(event){
    this.setState((prevState) => ({index: 0}))
    // this.state.list[this.state.index] = []; //using tuple to avoid identic key
    this.setState({list: []});
  }


  handleChange(event){
    this.setState({value: event.target.value});
  }

  render(){
    return (
      <center>
      <div className="center">
          <button id= "btn_add" onClick={this.handleClick}>Add todo</button>
          <button id= "btn_delete" onClick={this.handleDelete}>Delete todo</button>
          <input id="ipt_task" placeholder="add a task" onChange = {this.handleChange}></input>
          <div id="ls_todo">
            <DisplayList list = {this.state.list}/>
          </div>
      </div>
      </center>
    );
  }
}


class BreadCrumb extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="breadCrumb">
          <button id= "btn_home"><a href="http://localhost:7000/home">Home</a></button>
          <button id= "btn_todo"><a href="http://localhost:7000/todo">Todo</a></button>
          <button id= "btn_fuck"><a href="http://localhost:7000/fuck">fuck it!</a></button>
      </div>
    );
  }
}


function DisplayList(props) {
  const numbers = props.list;
  const listItems = numbers.map(([number,index]) =>
    <li key={index.toString()} value={number}>
      {number}
    </li>);
  return (
    <ul>{listItems}</ul>
  );
}


function App() {
  return (
  <div>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
  <div className="container-fluid">
    <div className="row">
      <div className="col-xs-2">
        <BreadCrumb />
      </div>
      <div className="col-xs-10">
       <AddSome />
      </div>
    </div>
  </div>
  </div>
  );
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);