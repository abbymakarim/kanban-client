const baseUrl = "http://localhost:3000"

$(function(){
    check()
})

$("#register-btn").on('click', function(event){
    event.preventDefault()
    register()
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

$("#btn-sign-up").on('click', function(event){
    event.preventDefault()
    $("#form-login-button").hide()
    $("#change-form-signup").hide()
    $("#form-register-button").show()
    $("#change-form-login").show()
})

$("#change-form-login").on('click', function(event){
    event.preventDefault()
    $("#form-login-button").show()
    $("#change-form-signup").show()
    $("#form-register-button").hide()
    $("#change-form-login").hide()
})

function check(){
    if(localStorage.access_token){
        $("#main-page").show()
        $("#login-page").hide()
        $("#navbar-main").show()
    } else {
        $("#main-page").hide()
        $("#login-page").show()
        $("#navbar-main").hide()
        $("#form-register-button").hide()
        $("#change-form-login").hide()
    }
}

function register(){
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        method : "POST",
        url : `${baseUrl}/register`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        $("#login-error").empty()
        $("#form-login-button").show()
        $("#change-form-signup").show()
        check()
    })
    .fail(err => {
        $("#login-error").empty()
        err.responseJSON.Errors.forEach(el =>{
            $("#login-error").append(`
            <h5 style="color: red;">${el}<h5>
            `)
        })
    })
    .always(() => {
        $("#email").val('')
        $("#password").val('')
    })
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