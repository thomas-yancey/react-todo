// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// get ui implemented for edit of title
var EditListForm = React.createClass({
  getInitialState: function(){
    return {title: ""}
  },

  handleTitleChanges: function(e){
    this.setState({title: e.target.value})
  },

  handleSubmit: function(e){
    e.preventDefault()
    data = {todo: {title: this.state.title}}
    this.props.UpateTodoOnServer(data)
    this.setState({title: ""})
  },

  render: function(){
    var url = url = "/todos/" + this.props.todo.id
    return (
      <form action ={url} method="POST" onSubmit={this.handleSubmit}>
        <input type="hidden" name="_method" value="put" />
        <input type="text" placeholder="new list" value={this.state.title} onChange={this.handleTitleChanges}/>
        <input type="submit" value="submit"/>
      </form>
    );
  }
});

var NewListForm = React.createClass({
  getInitialState: function(){
    return {title: ""}
  },

  handleTitleChanges: function(e){
    this.setState({title: e.target.value})
  },

  handleSubmit: function(e){
    e.preventDefault()
    data = {todo: {title: this.state.title}}
    this.props.addTodoToServer(data)
    this.setState({title: ""})
  },

  render: function(){
    return (
      <form action = "/todos" method="POST" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="new list" value={this.state.title} onChange={this.handleTitleChanges}/>
        <input type="submit" value="submit"/>
      </form>
    );
  }
});

var Todos = React.createClass({

  clickTodo: function(id){
    this.props.handleClick(id)
  },

  render: function(){

    var todoLists = this.props.todos.map(function(todo, index){
      var style = (index + 1) === this.props.openList ? "open" : "closed-list";
      return (
        <li
          className={style}
          onClick={this.clickTodo.bind(this, todo.id)}
          key={todo.id}>
        {todo.title}
        </li>
      )
    }.bind(this));

    return (
      <div className="lists">
        <h2>Lists</h2>
        <NewListForm addTodoToServer = {this.props.addTodoToServer}/>
        <ul>{todoLists}</ul>
      </div>
    )
  }
});
