<template>
    <div class="container border border-5">
        <form v-on:submit.prevent="task" class="mb-3">
            <label for="task" class="form-label">Title</label>
            <input v-model="title" type="input" class="form-control mb-3" id="task">
            <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
        <button type="button" class="btn btn-primary mb-3">Cancel</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name : "TaskForm",
    props : ['server'],
    data : {
        title : ''
    },
    methods : {
        task(){
            axios({
                method : "POST",
                url : this.server+'/task',
                data : {
                    title : this.title
                },
                headers : {
                    access_token : localStorage.access_token
                }
            })
            .then(response => {
                console.log(response)
                this.$emit("changePage", "main page")
                this.$emit("getTasks")
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>