class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.date :due_date, null: true
      t.integer :priority, null: false, default: 0
      t.boolean :complete, null: false, default: false

      t.timestamps
    end
  end
end