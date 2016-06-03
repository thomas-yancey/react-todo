class ItemsController < ApplicationController

  def index
    @items = Item.where(todo_id: params[:todo_id]).order(id: :asc)
    render json: @items
  end

  def create
    todo = Todo.find(params[:todo_id])
    todo.items << Item.create(content: params[:content])
    @items = Item.where(todo_id: params[:todo_id]).order(id: :asc)
    render json: @items
  end

  def update
    item = Item.find(params[:id])
    item.update_attributes(item_params)
    @items = Item.where(todo_id: params[:todo_id]).order(id: :asc)
    render json: @items
  end

  def destroy
    item = Item.find(params[:id])
    item.destroy
    @items = Item.where(todo_id: params[:todo_id]).order(id: :asc)
    render json: @items
  end

  private

  def item_params
    params.require(:item).permit(:content, :completed)
  end

end
