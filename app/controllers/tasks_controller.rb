class TasksController < ApplicationController
  protect_from_forgery
  def index
    @tasks = Task.all.order('due_date, priority DESC, title')
    render json: {data:@tasks}
  end
  def create 
    @task = Task.new(task_params)
    @task.save
    render json: @task
    # todo save to database
  end

  def task_params
    params.require(:task).permit(:title, :priority, :due_date)
  end
end
