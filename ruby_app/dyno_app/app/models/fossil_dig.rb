class FossilDig < ActiveRecord::Base
  belongs_to :users
  belongs_to :fossils
end
