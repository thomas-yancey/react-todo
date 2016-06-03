var App = React.createClass({
  loadItemsFromServer: function(todoId){
    var url = "/todos/" + todoId + "/items"
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error("/todos", status, err.toString());
      }.bind(this)
    });
  },

  deleteItemFromServer: function(item){
    var url = "/todos/" + item.todo_id + "/items/" + item.id
    $.ajax({
      url: url,
      method: "DELETE",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error("/todos", status, err.toString());
      }.bind(this)
    });
  },

  updateItemOnServer: function(item, data){
    var url = "/todos/" + item.todo_id + "/items/" + item.id
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
        console.error("/todos", status, err.toString());
      }.bind(this)
    });
  },

  addItemToServer: function(todo, content){
    var url = "/todos/" + todo.id + "/items"
    var data = {content: content}
    $.ajax({
      url: url,
      method: "POST",
      dataType: 'json',
      data: data,
      cache: false,
      success: function(data) {
        this.setState({items: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error("/todos", status, err.toString());
      }.bind(this)
    });
  },

  loadTodosFromServer: function(){
    $.ajax({
      url: "/todos",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error("/todos", status, err.toString());
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
    this.updateItemOnServer(item, {item: {completed: newStatus}})
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
    title = ""
    if (this.state.openList){
      title = this.state.todos[this.state.openList - 1].title
    };

    return (
      <div className="overall-app">
        <Todos
          todos={this.state.todos}
          handleClick={this.handleListClick}/>
        {this.state.openList !== null
          ?
        <ListItems
          updateItemOnServer={this.updateItemOnServer}
          items={this.state.items}
          toggleComplete={this.toggleComplete}
          todo={this.state.todos[this.state.openList - 1]}
          handleClick={this.handleItemClick}
          handleItemSubmit = {this.addItemToServer}/>
        : "" }
      </div>
    )
  }
});

var ready = function(){
  ReactDOM.render(<App url="/todos"/>, document.getElementById('app'));
};

$(document).ready(ready);