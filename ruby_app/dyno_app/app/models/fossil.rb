class Fossil < ActiveRecord::Base
  belongs_to :user
  has_many :fossil_digs

end
