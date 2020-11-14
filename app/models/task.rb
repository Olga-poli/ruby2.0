class Task < ApplicationRecord
    validates :title,
            presence: true,
            length: { maximum: 60 }
    validates :due_date, presence: true, if: :check_due_date

    def check_due_date
        if due_date && due_date < Date.today
            errors.add(:due_date, "can only be today or later")
        end
    end
end