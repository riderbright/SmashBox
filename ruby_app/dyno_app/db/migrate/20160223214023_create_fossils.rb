class CreateFossils < ActiveRecord::Migration
  def change
    create_table :fossils do |t|
      t.references :user
      t.string :status
      t.string :image
      t.integer :dig_count

      t.timestamps null: false
    end
  end
end
