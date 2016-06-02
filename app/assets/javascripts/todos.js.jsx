// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

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
        <ul>{todoLists}</ul>
      </div>
    )
  }
});
