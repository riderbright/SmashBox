class CreateFossilDigs < ActiveRecord::Migration
  def change
    create_table :fossil_digs do |t|
      t.references :user
      t.references :fossil 

      t.timestamps null: false
    end
  end
end
