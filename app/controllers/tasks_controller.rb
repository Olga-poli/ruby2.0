class TasksController < ApplicationController
  protect_from_forgery
  def index
  end
  def create 
    @task = Task.new(task_params)
    @task.save
    render json: @task
    # todo save to database
  end

  def task_params
    params.require(:task).permit(:title, :description, :priority, :due_date)
  end
end
