<template>
    <div>
        <TaskList v-bind:tasks="tasks" v-if="page === 'main page'"></TaskList>
        <TaskForm 
            v-if="page === 'add task'" 
            v-bind:server="server"
            v-on:changePage="changePage"
            v-on:getTasks="getTasks"
        >
        </TaskForm>
    </div>
</template>

<script>
import TaskForm from './TaskForm'
import TaskList from './TaskList'

export default {
    name : "MainPage",
    components : {
        TaskForm,
        TaskList
    },
    props : ['tasks', 'page', 'server'],
    methods : {
        changePage(page){
            this.$emit("changePage", page)
        },
        getTasks(){
            this.$emit("getTasks")
        }
    } 
}
</script>

<style>

</style>