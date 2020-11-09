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
function cancel(){
    document.querySelector('#addForm').style.display='none';
}
function send() {
    let description = document.getElementById("descriptionInput").value;
    let title = document.getElementById("titleInput").value;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/tasks', true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            // todo show success message
            
        }
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            alert('Fuck, no controller found!');
        }
        cancel();
    }
    let data = {
        desc: description,
        title: title
    };
    
    xhr.send(JSON.stringify(data));
  }