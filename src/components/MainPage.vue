<template>
    <div>
        <TaskList 
            v-bind:tasks="tasks" 
            v-if="page === 'main page'"
            v-on:changeStatus="changeStatus"
            v-on:deleteTask="deleteTask"
        >
        </TaskList>
        <TaskForm 
            v-if="page === 'add task'" 
            v-bind:server="server"
            v-on:changePage="changePage"
            v-on:getTasks="getTasks"
            v-on:addTask="addTask"
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
    props : ['tasks', 'page'],
    methods : {
        changePage(page){
            this.$emit("changePage", page)
        },
        getTasks(){
            this.$emit("getTasks")
        },
        addTask(title){
            this.$emit("addTask", title)
        },
        changeStatus(category, id){
            this.$emit("changeStatus", category, id)
        },
        deleteTask(id){
            this.$emit("deleteTask", id)
        }
    } 
}
</script>

<style>

</style>