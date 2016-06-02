var App = React.createClass({
  loadItemsFromServer: function(todoId){
    var url = this.props.url + "/" + todoId + "/items"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  deleteItemFromServer: function(item){
    var url = this.props.url + "/" + item.todo_id + "/items/" + item.id
    $.ajax({
      url: url,
      method: "DELETE",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  updateItemFromServer: function(item, newStatus){
    var url = this.props.url + "/" + item.todo_id + "/items/" + item.id
    var data = {completed: newStatus}
    $.ajax({
      url: url,
      method: "PUT",
      dataType: 'json',
      data: data,
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadTodosFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleListClick: function(todoId){
    this.loadItemsFromServer(todoId)
    this.setState({openList: todoId})
  },

  handleItemClick: function(itemId){
    this.deleteItemFromServer(itemId)
  },

  toggleComplete: function(item){
    var newStatus = item.completed ? false : true
    this.updateItemFromServer(item, newStatus)
  },

  getInitialState: function(){
    return (
      { todos: [],
        openList: null,
        items: []
      }
    )
  },

  componentDidMount: function(){
    this.loadTodosFromServer();
  },

  render: function(){
    return (
      <div className="overall-app">
        <Todos
          todos={this.state.todos}
          openList={this.state.openList}
          handleClick={this.handleListClick}/>
        <ListItems
          items={this.state.items}
          toggleComplete={this.toggleComplete}
          handleClick={this.handleItemClick}/>
      </div>
    )
  }
});

var ready = function(){
  ReactDOM.render(<App url="/todos"/>, document.getElementById('app'));
};

$(document).ready(ready);