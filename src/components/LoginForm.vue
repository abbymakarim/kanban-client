<template>
    <div>
        <div v-if="page === 'login'" id="login-form" class="m-5">
            <form v-on:submit.prevent="login" class="border border-5" style="padding: 20px;">
                <div id="login-error"></div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div>
                <div class="mb-3" id="form-login-button">
                    <button type="submit" class="btn btn-primary" id="login-btn">Login</button>
                </div>
                <div>
                    <p>Or you can sign in using google</p>
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                </div>
            </form>
            <div class="m-3" id="change-form-signup">
                <p>Create an account?</p>
                <button v-on:click="changePage('register')" id="btn-sign-up" class="btn btn-secondary">Sign up</button>
            </div>
        </div>
        <div v-if="page === 'register'" id="register-form" style="margin: 20px; padding-left: 25vh; padding-right: 25vh;">
            <form v-on:submit.prevent="register" class="border border-5" style="padding: 20px;">
                <div id="login-error"></div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div>
                <div class="mb-3" id="form-register-button">
                    <button type="submit" class="btn btn-primary" id="register-btn">Register</button>
                </div>
            </form>
            <div class="mb-3" id="change-form-login">
                <p>Already have an account?</p>
                <button v-on:click="changePage('login')" id="btn-login" class="btn btn-secondary">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
 import GoogleLogin from 'vue-google-login';

export default {
    name : "LoginForm",
    props : ['page', 'server', 'errors'],
    data(){
        return {
            email : '',
            password : '',
            renderParams: {
                width: 250,
                height: 50,
                longtitle: true
            }
        }
    },
    components : {
        GoogleLogin
    },
    mounted(){
        gapi.signin2.render('google-signin-button', {
            onsuccess: this.onSignIn
        })
    },
    methods : {
        login(){
            this.$emit("login", this.email, this.password)
            this.email = ''
            this.password = ''
        },
        changePage(page){
            this.$emit("changePage", page)
        },
        register(){
            this.$emit("register", this.email, this.password)
            this.email = ''
            this.password = ''
        },
        onSuccess(user){
            const id_token = user.Bc.id_token
            this.$emit("loginGoogle", id_token)
        }
    }
}
</script>

<style>

</style>