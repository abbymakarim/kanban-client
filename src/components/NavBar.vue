<template>
    <div class="m-4">
        <nav class="m-3" style="display: flex; justify-content: space-between;">
            <h3>Kanban Board</h3>
            <div v-if="page === 'main page'" id="navbar-main">
                <button type="button" class="btn btn-primary" v-on:click="addTask">Add Task</button>
                <button type="button" class="btn btn-danger" v-on:click.prevent="logout">Logout</button>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : "NavBar",
    props : ['page'],
    methods : {
        logout(){
            localStorage.clear()
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            console.log('keluuuarr')
            this.$emit("changePage", "login")
        },
        addTask(){
            this.$emit("changePage", "add task")
        }
    }
}
</script>

<style>

</style>