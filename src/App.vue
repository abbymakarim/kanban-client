<template>
    <div id="app" >
        <!-- NavBar -->
        <NavBar
            v-bind:page="page"
            v-on:changePage="changePage"
        >
        </NavBar>
        <LoginForm 
            v-bind:page="page" 
            v-bind:server="server"
            v-on:changePage="changePage"
            v-on:login="login"
            v-on:register="register"
            v-on:loginGoogle="loginGoogle"
        >
        </LoginForm>
        <MainPage 
            v-bind:page="page"  
            v-bind:tasks="tasks"
            v-bind:server="server"
            v-bind:task="task"
            v-on:changePage="changePage"
            v-on:getTask="getTask"
            v-on:getTasks="getTasks"
            v-on:addTask="addTask"
            v-on:changeStatus="changeStatus"
            v-on:deleteTask="deleteTask"
            v-on:editTask="editTask"
        >
        </MainPage>
    </div>    
</template>

<script>
import axios from 'axios'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import NavBar from './components/NavBar'


export default {
    name : "App",
    data() {
        return {
            page : "login",
            task : [],
            tasks : [],
            server : "https://kanban-board-server.herokuapp.com"
        }
    },
    components : {
        LoginForm,
        MainPage,
        NavBar
    },
    methods : {
        register(email, password){
            axios({
                method : "POST",
                url : this.server+'/register',
                data : {
                    email,
                    password
                }
            })
            .then(response => {
                this.changePage('login')
            })
            .catch(err => {
                Swal.fire(err.response.data.message[0])
            })
        },
        login(email, password){
            axios({
                method : "POST",
                url : this.server+'/login',
                data : {
                    email,
                    password
                }
            })
            .then(response => {
                localStorage.setItem("access_token", response.data.access_token)
                this.changePage('main page')
                this.getTasks()
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
        },
        loginGoogle(id_token){
            console.log('massoooook')
            axios({
                method : "POST",
                url : this.server+'/loginGoogle',
                data : {
                    id_token
                }
            })
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token)
                this.changePage('main page')
                this.getTasks()  
            })
            .catch(err => {
                console.log(err)
            })
        },
        getTasks(){
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
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
        },
        addTask(title){
            axios({
                method : "POST",
                url : this.server+'/task',
                data : {
                    title
                },
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                this.changePage('main page')
                this.getTasks()
            })
            .catch(err => {
                Swal.fire(err.response.data.message[0])
            })
        },
        changeStatus(category, id){
            axios({
                method : "PATCH",
                url : this.server+'/task'+`/${id}`,
                data : {
                   category
                },
                headers : {
                    access_token : localStorage.access_token
                } 
            })
            .then(response => {
                this.getTasks()
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
        },
        getTask(id){
            axios({
                method : "GET",
                url : this.server+'/task'+`/${id}`,
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                this.task = response.data
                this.changePage('edit task')
            })
            .catch(err => {
                Swal.fire('Do Not Have Access')
            })
        },
        editTask(title, id){
            axios({
                method : "PUT",
                url : this.server+'/task'+`/${id}`,
                headers : {
                    access_token : localStorage.access_token
                },
                data : {
                    title
                }
            })
            .then(response => {
                this.changePage('main page')
                this.getTasks()
            })
            .catch(err =>{
                Swal.fire(err.response.data.message[0])
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
            .then(response => {
                this.getTasks()
            })
            .catch(err => {
                Swal.fire(err.response.data.message)
            })
        },
        changePage(page){
            this.page = page
        }
    },
    created() {
        if(localStorage.access_token){
            this.page = "main page"
            this.getTasks()
        } else {
            this.page = "login"
        } 
    }
}
</script>
<style>

</style>