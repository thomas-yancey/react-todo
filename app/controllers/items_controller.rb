class ItemsController < ApplicationController

  def index
    @items = Item.where(todo_id: params[:todo_id])
    render json: @items
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update
    @items = Item.where(todo_id: params[:todo_id])
    item = Item.find(params[:id])
    item.update_attributes(completed: params[:completed])
    render json: @items
  end

  def destroy
    @items = Item.where(todo_id: params[:todo_id])
    item = Item.find(params[:id])
    item.destroy
    render json: @items
  end


end
