// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
function showForm(){
    document.querySelector('#addForm').style.display='block';
}
function cancel() {
    $('#addForm').modal('hide');
    // document.querySelector('#addForm').style.display='none';
}
function send() {
    let title = document.getElementById("titleInput").value;
    let priority = document.getElementById('task_priority').value;
    let duedate = document.getElementById('task_date').value;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/tasks', true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // todo show success message
            $('#task_table').DataTable().ajax.reload();
            
        }
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            alert('No controller found!');
        }
        cancel();
    }
    let data = {
        title: title,
        priority: priority,
        due_date: duedate,
    };
    
    xhr.send(JSON.stringify(data));
}

function show() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", '/tasks', true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            let result = JSON.parse(xhr.response);
            let table = document.getElementById('task_table');
            
        }
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            alert('No controller found!');
        }
    }
    
    xhr.send();
}

$(document).ready( function () {
    $('#task_table').DataTable(
        {
            "bSort" : false,
            "ajax": "tasks",
            "columns": [
                { "data": "title" },
                { "data": "due_date" },
                {
                    "data": "complete",
                    render: function (data, type, row) {
                        if (type === 'display') {
                            if (data === true) {
                                str = 'checked';
                            } else {
                                str = '';
                            }
                            str = (data ? 'checked' : '');
                            return '<input type="checkbox" class="form-check-input" ' + str + ' data-id="'+row.id+'">';
                        }
                        return data;
                    },
                    className: "dt-body-center"
                },
                
                {
                    "data": "id",
                    render: function (data, type, row) {
                        return '<button class="delete-btn btn btn-outline-dark"' + ' data-id="'+data+'">X</button>';
                    }
                },
            ]
        }
    );
    $('#task_table').on('change', 'input[type="checkbox"]', function (event) {
        let id = this.dataset.id;
        let complete = this.checked;

        let xhr = new XMLHttpRequest();
        xhr.open("PATCH", '/tasks/'+id, true);

        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
                // todo show success message
                $('#task_table').DataTable().ajax.reload();
                
            }
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
                alert('No controller found!');
            }
        }
        let data = {
            complete: complete
        };
        
        xhr.send(JSON.stringify(data));
    });
    
    $('#task_table').on('click', 'button.delete-btn', function (event) {
        let id = this.dataset.id;
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", '/tasks/' + id, true);
        xhr.onload = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 204) {
                // todo show success message
                $('#task_table').DataTable().ajax.reload();
            }
        }
        xhr.send(null);
    }
    )
});