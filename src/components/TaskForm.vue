<template>
    <div class="container border border-5">
        <form v-on:submit.prevent="addTask" class="mb-3">
            <label for="task" class="form-label">Title</label>
            <input v-model="title" type="input" class="form-control mb-3" id="task">
            <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
        <button v-on:click.prevent="changePage" type="button" class="btn btn-primary mb-3">Cancel</button>
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
        addTask(){
            this.$emit("addTask", this.title)
        },
        changePage(){
            this.$emit("changePage", "main page")
        }
    }
}
</script>

<style>

</style>