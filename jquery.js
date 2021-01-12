const baseUrl = "http://localhost:3000"

$(function(){
    $("#main-page").hide()
    $("#login-page").show()
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        method : "POST",
        url : `${baseUrl}/loginGoogle`,
        data : {
            id_token
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        authorization()
    }).fail((xhr, status) => {

    })
}