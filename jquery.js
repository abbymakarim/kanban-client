const baseUrl = "http://localhost:3000"

$(function(){
    check()
})


$("#login-btn").on('click', function(event){
    event.preventDefault()
    login()
})

$("#logout-btn").on('click', function(event){
    event.preventDefault()
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    check()
})

function check(){
    if(localStorage.access_token){
        $("#main-page").show()
        $("#login-page").hide()
    } else {
        $("#main-page").hide()
        $("#login-page").show()
    }
}

function login(){
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        method : "POST",
        url : `${baseUrl}/login`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        $("#login-error").empty()
        check()
    })
    .fail(error => {
        $("#login-error").empty()
        $("#login-error").append(`<h5 style="color: red;">${error.responseJSON.message}<h5>`)
    })
    .always(() => {
        $("#email").val('')
        $("#password").val('')
    })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : "POST",
        url : `${baseUrl}/loginGoogle`,
        data : {
            id_token
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        check()
    }).fail((xhr, status) => {

    })
}