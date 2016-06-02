// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var DeleteItem = React.createClass({
  handleClick: function(item){
    this.props.handleClick(item)
  },

  render: function(){
    return(<button onClick={this.handleClick.bind(this,this.props.item)} >Delete</button>)
  }
});

var ToggleItemCompleted = React.createClass({
  updateItem: function(){
    this.props.toggleComplete(this.props.item)
  },

  render: function(){
    completionStatus = this.props.item.completed ? "Not Completed" : "Completed"
    return(
      <button onClick={this.updateItem}>{completionStatus}</button>
    )
  }
});

var ListItems = React.createClass({

  render: function(){
    var items = this.props.items.map(function(item, index){
      return (
        <li key={item.content}>
          <p>{item.content}</p>
          <DeleteItem item={item} handleClick={this.props.handleClick}/>
          <ToggleItemCompleted item={item} toggleComplete={this.props.toggleComplete}/>
        </li>
      )
    }.bind(this));

    return (
      <ul>
        {items}
      </ul>
    )
  }
});
