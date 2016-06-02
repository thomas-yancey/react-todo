class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.text :content, null: false
      t.boolean :completed, default: false
      t.references :todo

      t.timestamps null: false
    end
  end
end
