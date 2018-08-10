var React = require('react')
var ReactDOM = require('react-dom')


class AutoRefresh extends React.Component {
  constructor(props){
    super(props);
    this.state = {index: 0, value: "init", list: [], tick_json: '{"str":""}' };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(event) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
         if (xhr.readyState == 4 && xhr.status == 200)
          this.setState({tick_json: JSON.parse(xhr.responseText)});
    }.bind(this)
    xhr.onerror = function (e) {console.error(xhr.statusText);};
    xhr.open("GET", "http://localhost:7000/tick.json", true);
    xhr.send(null);
    
    this.timerID = setInterval(() => this.tick(), 500);
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

  handleDeleteTask(event){
    this.setState((prevState) => ({index: 0}))
    // this.state.list[this.state.index] = []; //using tuple to avoid identic key
    this.setState({list: []});
  }


  handleChange(event){
    this.setState({value: event.target.value});
  }


  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log("tick!");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
         if (xhr.readyState == 4 && xhr.status == 200)
          this.setState({tick_json: JSON.parse(xhr.responseText)});
    }.bind(this)
    xhr.onerror = function (e) {console.error(xhr.statusText);};
    xhr.open("GET", "http://localhost:7000/tick.json", true);
    xhr.send(null);
  }

  render(){
    return (
      <center>
      <div className="center">
          <button id= "btn_delete" onClick={this.handleDelete}>Delete</button>
          <div>
            <p>{this.state.tick_json.str}</p>
          </div>
      </div>
      </center>
    );
  }
}



function getTick(props)
{
    const xmlHttp = new XMLHttpRequest();
    var url = `http://localhost:7000/tick.json`;

    xhr.onreadystatechange = function() { 
         if (xhr.readyState == 4 && xhr.status == 200)
          props.setState({tick:xhr.responseText});
    }.bind(this)

    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}


function App() {
  return (
  <div>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
  <div className="container-fluid">
    <div className="row">
      <div>
        <AutoRefresh />
      </div>
    </div>
  </div>
  </div>
  );
}

//

ReactDOM.render(
  <App />,
  document.getElementById('root')
);