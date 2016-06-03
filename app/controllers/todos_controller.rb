class TodosController < ApplicationController

  def index
    @todos = Todo.all.order(id: :desc)
    render json: @todos
  end

  def create
    todo = Todo.new(todo_params)
    todo.save
    @todos = Todo.all.order(id: :desc)
    render json: @todos
  end

  def update
    todo = Todo.find(params[:id])
    todo.update_attributes(todo_params)
    @todos = Todo.all.order(id: :desc)
    render json: @todos
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    @todos = Todo.all.order(id: :desc)
    render json: @todos
  end

  private

  def todo_params
    params.require(:todo).permit(:title)
  end

end
