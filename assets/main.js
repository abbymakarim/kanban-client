const baseUrl = "http://localhost:3000"


// $(function(){
//     check()
// })

// $("#register-btn").on('click', function(event){
//     event.preventDefault()
//     register()
// })

// $("#login-btn").on('click', function(event){
//     event.preventDefault()
//     login()
// })

// $("#logout-btn").on('click', function(event){
//     event.preventDefault()
//     localStorage.clear()
//     const auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//     check()
// })

// $("#btn-sign-up").on('click', function(event){
//     event.preventDefault()
//     $("#form-login-button").hide()
//     $("#change-form-signup").hide()
//     $("#form-register-button").show()
//     $("#change-form-login").show()
// })

// $("#change-form-login").on('click', function(event){
//     event.preventDefault()
//     $("#form-login-button").show()
//     $("#change-form-signup").show()
//     $("#form-register-button").hide()
//     $("#change-form-login").hide()
// })

// function check(){
//     if(localStorage.access_token){
//         $("#main-page").show()
//         $("#login-page").hide()
//         $("#navbar-main").show()
//         getTask()
//     } else {
//         $("#main-page").hide()
//         $("#login-page").show()
//         $("#navbar-main").hide()
//         $("#form-register-button").hide()
//         $("#change-form-login").hide()
//     }
// }

// function register(){
//     const email = $("#email").val()
//     const password = $("#password").val()
//     $.ajax({
//         method : "POST",
//         url : `${baseUrl}/register`,
//         data : {
//             email,
//             password
//         }
//     })
//     .done(response => {
//         $("#login-error").empty()
//         $("#form-login-button").show()
//         $("#change-form-signup").show()
//         check()
//     })
//     .fail(err => {
//         $("#login-error").empty()
//         err.responseJSON.Errors.forEach(el =>{
//             $("#login-error").append(`
//             <h5 style="color: red;">${el}<h5>
//             `)
//         })
//     })
//     .always(() => {
//         $("#email").val('')
//         $("#password").val('')
//     })
// }

// function login(){
//     const email = $("#email").val()
//     const password = $("#password").val()
//     $.ajax({
//         method : "POST",
//         url : `${baseUrl}/login`,
//         data : {
//             email,
//             password
//         }
//     })
//     .done(response => {
//         localStorage.setItem('access_token', response.access_token)
//         $("#login-error").empty()
//         check()
//     })
//     .fail(error => {
//         $("#login-error").empty()
//         $("#login-error").append(`<h5 style="color: red;">${error.responseJSON.message}<h5>`)
//     })
//     .always(() => {
//         $("#email").val('')
//         $("#password").val('')
//     })
// }

// function onSignIn(googleUser) {
//     const id_token = googleUser.getAuthResponse().id_token;
//     $.ajax({
//         method : "POST",
//         url : `${baseUrl}/loginGoogle`,
//         data : {
//             id_token
//         }
//     })
//     .done(response => {
//         localStorage.setItem('access_token', response.access_token)
//         check()
//     }).fail((xhr, status) => {

//     })
// }

// function getTask(){
//     $.ajax({
//         method : "GET",
//         url : `${baseUrl}/task`,
//         headers : {
//             access_token : localStorage.access_token
//         }
//     })
//     .done(response => {
//         $("#Back-Log-Content").empty()
//         $("#To-Do-Content").empty()
//         $("#Doing-Content").empty()
//         $("#Done-Content").empty()
//         response.forEach(el => {
//             if(el.category === "Back-Log"){
//                 $("#Back-Log-Content").append(`
//                 <div class="container" style="background-color: red;">
//                     <h6>Title : ${el.title}<h6>
//                     <h6>Created by : ${el.User.email}<h6>
//                     <div>
//                         <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(${el.id})">Delete</button>
//                         <button onclick="changeCategory('To-Do',${el.id})" type="button" class="btn btn-success btn-sm">To Do</button>
//                     </div>
//                 </div>
//                 `)
//             } else if (el.category === "To-Do"){
//                 $("#To-Do-Content").append(`
//                 <div class="container" style="background-color: red;">
//                     <h6>Title : ${el.title}<h6>
//                     <h6>Created by : ${el.User.email}<h6>
//                     <div>
//                         <button onclick="changeCategory('Back-Log',${el.id})" type="button" class="btn btn-warning btn-sm">Back-Log</button>
//                         <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(${el.id})">Delete</button>
//                         <button onclick="changeCategory('Doing',${el.id})" type="button" class="btn btn-success btn-sm">Doing</button>
//                     </div>
//                 </div>
//                 `)
//             } else if (el.category === "Doing"){
//                 $("#Doing-Content").append(`
//                 <div class="container" style="background-color: red;">
//                     <h6>Title : ${el.title}<h6>
//                     <h6>Created by : ${el.User.email}<h6>
//                     <div>
//                         <button onclick="changeCategory('To-Do',${el.id})" type="button" class="btn btn-warning btn-sm">To Do</button>
//                         <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(${el.id})">Delete</button>
//                         <button onclick="changeCategory('Done',${el.id})" type="button" class="btn btn-success btn-sm">Done</button>
//                     </div>
//                 </div>
//                 `)
//             } else if (el.category === "Done"){
//                 $("#Done-Content").append(`
//                 <div class="container" style="background-color: red;">
//                     <h6>Title : ${el.title}<h6>
//                     <h6>Created by : ${el.User.email}<h6>
//                     <div>
//                         <button onclick="changeCategory('Doing',${el.id})" type="button" class="btn btn-warning btn-sm">Doing</button>
//                         <button type="button" class="btn btn-danger btn-sm" onclick="deleteTask(${el.id})">Delete</button>
//                     </div>
//                 </div>
//                 `)
//             }
//         })
//     })
//     .fail(error => {
//         console.log(error)
//     })
// }

// function changeCategory(category, id){
//     $.ajax({
//         method : "PATCH",
//         url : `${baseUrl}/task/${id}`,
//         headers : {
//             access_token : localStorage.access_token
//         },
//         data : {
//             category
//         }
//     })
//     .done(response => {
//         check()
//     })
//     .fail(error => {
//         console.log(error)
//     })
// }

// function deleteTask(id){
//     $.ajax({
//         method : "DELETE",
//         url : `${baseUrl}/task/${id}`,
//         headers : {
//             access_token : localStorage.access_token
//         }
//     })
//     .done(() => {
//         check()
//     })
//     .fail(err => {
//         console.log(err)
//     })
// }

// const app = new Vue({
//     el : '#app',
//     data : {
//         message : 'Hello using vue!'
//     }
// })

const app = new Vue({
    el : '#app',
    data : {
        email : '',
        password : '',
        task : '',
        tasks : [],
        page : "login",
        server : "http://localhost:3000"
    },
    methods : {
        check(){
            if(localStorage.access_token){
                this.page = 'main page'
                this.getTask()
            } else {
                this.page = 'login'
            }
        },
        logout: function(){
            localStorage.clear()
            this.page = "login"
            this.email = ''
            this.password = ''
        },
        add(){
            this.page = "add"
        },
        switchRegister: function(){
            this.page = "register"
        },
        switchLogin: function(){
            this.page = "login"
        },
        loginUser(){
            if(this.page === 'login'){
                axios.post(this.server+'/login', {
                    email : this.email,
                    password : this.password
                })
                .then(response => {
                    localStorage.setItem("access_token", response.data.access_token)
                    this.check()
                })
                .catch(err => {
                    console.log(err.response)
                })
            } else if(this.page === 'register'){
                axios.post(this.server+'/register', {
                    email : this.email,
                    password : this.password
                })
                .then(response => {
                    this.email = ''
                    this.password = ''
                    this.page = "login"
                })
                .catch(err =>{
                    console.log(err.response)
                })
            }
        },
        addTask(){
            axios({
                method : "POST",
                url : this.server+'/task',
                headers : {
                    access_token : localStorage.access_token
                },
                data : {
                    title : this.task
                }
            })
            .then(response => {
                console.log(response)
                this.check()
                this.task = ''
            })
            .catch(error => {
                console.log(error)
            })
        },
        getTask(){
            axios({
                method : "GET",
                url : this.server+'/task',
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                this.tasks = response.data
            })
            .catch(error => {
                console.log(error.response)
            })
        },
        changeStatus(category, id){
            axios({
                method : "PATCH",
                url : this.server+'/task'+`/${id}`,
                headers : {
                    access_token : localStorage.access_token
                },
                data : {
                    category : category
                }
            })
            .then(() => {
                this.check()
            }).catch(error => {
                console.log(error.response)
            })
        },
        deleteTask(id){
            axios({
                method : "DELETE",
                url : this.server+'/task'+`/${id}`,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(() => {
                this.check()
            })
            .catch(error => {
                console.log(error.response)
            })
        }
    },
    created(){
        if(localStorage.access_token){
            this.page = "main page"
            this.getTask()
        } else {
            this.page = 'login'
        }
    },
    computed : {
        backlog(){
            return this.tasks.filter(task => task.category === 'Back-Log')
        },
        todo(){
            return this.tasks.filter(task => task.category === 'To-Do')
        },
        doing(){
            return this.tasks.filter(task => task.category === 'Doing')
        },
        done(){
            return this.tasks.filter(task => task.category === 'Done')
        }
    }
})