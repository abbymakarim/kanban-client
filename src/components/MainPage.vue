<template>
    <div>
        <TaskList 
            v-bind:tasks="tasks" 
            v-if="page === 'main page'"
            v-on:changeStatus="changeStatus"
            v-on:deleteTask="deleteTask"
            v-on:getTask="getTask"
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
        <EditForm 
            v-if="page === 'edit task'"
            v-bind:task="task"
            v-on:changePage="changePage"
            v-on:editTask="editTask"
        >
        </EditForm>
    </div>
</template>

<script>
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import EditForm from './EditForm'

export default {
    name : "MainPage",
    components : {
        TaskForm,
        TaskList,
        EditForm
    },
    props : ['tasks', 'page', 'task'],
    methods : {
        changePage(page){
            this.$emit("changePage", page)
        },
        getTasks(){
            this.$emit("getTasks")
        },
        getTask(id){
            this.$emit("getTask", id)
        },
        addTask(title){
            this.$emit("addTask", title)
        },
        changeStatus(category, id){
            this.$emit("changeStatus", category, id)
        },
        deleteTask(id){
            this.$emit("deleteTask", id)
        },
        editTask(title, id){
            this.$emit("editTask", title, id)
        }
    } 
}
</script>

<style>

</style>