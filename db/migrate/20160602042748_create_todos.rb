class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.references :item

      t.timestamps null: false
    end
  end
end
