class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos
  end

  def create
    binding.pry
    todo = Todo.new(todo_params)
    todo.save
    @todos = Todo.all
    render json: @todos
  end

  def update
    binding.pry
    todo = Todo.find(params[:id])
    todo.update_attributes(todo_params)
    @todos = Todo.all
    render json: @todos
  end

  def destroy
    binding.pry
    todo = Todo.find(params[:id])
    todo.destroy
    @todos = Todo.all
    render json: @todos
  end

  private

  def todo_params
    params.require(:todo).permit(:title)
  end

end
