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

var NewItemForm = React.createClass({

  getInitialState: function(){
    return {itemValue: ""}
  },

  handleItemValueChange: function(e){
    this.setState({itemValue: e.target.value})
  },

  handleSubmit: function(e){
    e.preventDefault();
    var content = this.state.itemValue.trim()
    if (!content){
      return;
    };
    this.props.handleItemSubmit(this.props.todo, content)
    this.setState({itemValue: ""})
  },

  render: function(){

    var actionUrl = "/todos/" + this.props.todo.id + "/items";
    return(
      <form action={actionUrl} method="POST" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="new item"
          value={this.state.itemValue}
          onChange={this.handleItemValueChange}/>
        <input type="submit" placeholder="submit"/>
      </form>
    )
  }
});

var EditToggle = React.createClass({

  render: function(){
    return(<button onClick={this.props.handleEdit}>Edit</button>)
  }
});

var EditItemForm = React.createClass({

  getInitialState: function(){
    return {itemValue: this.props.item.content}
  },

  handleItemValueChange: function(e){
    this.setState({itemValue: e.target.value})
  },

  handleSubmit: function(e){
    e.preventDefault();
    var content = this.state.itemValue.trim()
    if (!content){
      return;
    };
    this.props.updateItemOnServer(this.props.item, {item: {content: content}})
    this.props.handleEdit()
    this.setState({itemValue: ""})
  },

  render: function(){

    var actionUrl = "/todos/" + this.props.item.todo_id + "/items" + this.props.item.id;
    return(
      <form action={actionUrl} method="POST" onSubmit={this.handleSubmit}>
        <input type="hidden" name="_method" value="put" />
        <input
          type="textarea"
          placeholder="new item"
          value={this.state.itemValue}
          onChange={this.handleItemValueChange}/>
        <input type="submit" placeholder="submit"/>
      </form>
    )
  }
})

var Item = React.createClass({
  getInitialState: function(){
    return {editing: false}
  },

  handleEdit: function(){
    this.setState({editing: !this.state.editing})
  },

  render: function(){
    return (
    <li key={this.props.item.content}>
      <h4>{this.props.item.content}</h4>
      <DeleteItem item={this.props.item} handleClick={this.props.handleClick}/>
      <ToggleItemCompleted item={this.props.item} toggleComplete={this.props.toggleComplete}/>
      <EditToggle handleEdit={this.handleEdit}/>
      {this.state.editing ?
        <EditItemForm
          item={this.props.item}
          updateItemOnServer={this.props.updateItemOnServer}
          handleEdit={this.handleEdit}
        /> : "" }
    </li>
    )
  }
});

var ListItems = React.createClass({

  render: function(){
    var items = this.props.items.map(function(item, index){
      return (
        <div key={item.id}>
          <Item item={item}
            handleClick={this.props.handleClick}
            toggleComplete={this.props.toggleComplete}
            updateItemOnServer={this.props.updateItemOnServer}
            />
        </div>
      )
    }.bind(this));

    return (
      <div className="ListItems">
        <h2>{this.props.todo.title}</h2>
        <div className="ItemForm">
          <NewItemForm
            todo={this.props.todo}
            handleItemSubmit={this.props.handleItemSubmit}
          />
        </div>
        <ul>
          {items}
        </ul>
      </div>
    )
  }
});
