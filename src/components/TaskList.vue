<template>
    <div class="container fs-6" style="color: black; height: 100vh; justify-content: center; padding: 0px;">
        <!-- Content -->
        <div class="container" style="display: flex; flex-direction: row; align-items: flex-start; padding: 0px">
            <!-- Card/Isi -->
            <div class="container border border-5 mx-1 rounded" style="height: 50px; padding: 10px; display: flex; flex-direction: column;  height: auto; background-color: rgb(210,105,30);">
                Back-log
                <div class="border bg-light rounded">
                    <div class="border p-1" v-for="i in backlog" :key="i.id" >
                        <div>
                            Title : {{ i.title }}
                        </div> 
                        <div>
                            <button v-on:click="getTask(i.id)" class="btn btn-secondary btn-sm">Edit</button>
                        </div>
                            Created by : {{ i.User.email }}
                        <div>
                            <button v-on:click="deleteTask(i.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
                            <button v-on:click="changeStatus('To-Do', i.id)" type="button" class="btn btn-success btn-sm">To Do</button>
                        </div>
                    </div>    
                </div>
            </div>
            <div class="container border border-5 rounded mx-1" style="height: 50px; padding: 10px; display: flex; flex-direction: column; height: auto; background-color: rgb(102,204,0);">
                To-Do
                <div class="border bg-light rounded">
                    <div class="border p-1" v-for="i in todo" :key="i.id">
                        <div>
                            Title : {{ i.title }}
                        </div> 
                        <div>
                            <button v-on:click="getTask(i.id)" class="btn btn-secondary btn-sm">Edit</button>
                        </div>
                            Created by : {{ i.User.email }}
                        <div>
                            <button v-on:click="changeStatus('Back-Log', i.id)" type="button" class="btn btn-warning btn-sm">Back-Log</button>
                            <button v-on:click="deleteTask(i.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
                            <button v-on:click="changeStatus('Doing', i.id)" type="button" class="btn btn-success btn-sm">Doing</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container border border-5 rounded mx-1" style="height: 50px; padding: 10px; display: flex; flex-direction: column; height: auto; background-color: rgb(102,102,255);">
                Doing
                <div class="border bg-light rounded">
                    <div class="border p-1" v-for="i in doing" :key="i.id">
                        <div>
                            title : {{ i.title }}
                        </div> 
                        <div>
                            <button v-on:click="getTask(i.id)" class="btn btn-secondary btn-sm">Edit</button>
                        </div>
                            Created by : {{ i.User.email }}
                        <div>
                            <button v-on:click="changeStatus('To-Do', i.id)" type="button" class="btn btn-warning btn-sm">To Do</button>
                            <button v-on:click="deleteTask(i.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
                            <button v-on:click="changeStatus('Done', i.id)" type="button" class="btn btn-success btn-sm">Done</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container border border-5 rounded mx-1" style="height: 50px; padding: 10px; display: flex; flex-direction: column; height: auto; background-color: rgb(255,153,51);">
                Done
                <div class="border bg-light rounded">
                    <div class="border p-1" v-for="i in done" :key="i.id">
                        <div>
                            Title : {{ i.title }}
                        </div> 
                        <div>
                            <button v-on:click="getTask(i.id)" class="btn btn-secondary btn-sm">Edit</button>
                        </div>
                            Created by : {{ i.User.email }}
                        <div>
                            <button v-on:click="changeStatus('Doing', i.id)" type="button" class="btn btn-warning btn-sm">Doing</button>
                            <button v-on:click="deleteTask(i.id)" type="button" class="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    name : "TaskList",
    props : ['tasks'],
    methods : {
        changeStatus(category, id){
            this.$emit("changeStatus", category, id)
        },
        deleteTask(id){
            this.$emit("deleteTask", id)
        },
        getTask(id){
            this.$emit("getTask", id)
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
}
</script>

<style>

</style>