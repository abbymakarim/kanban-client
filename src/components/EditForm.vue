<template>
    <div class="container border border-5">
    <form v-on:submit.prevent="editTask" class="mb-3">
        <label for="task" class="form-label">Title</label>
        <input type="input" class="form-control mb-3" id="task" v-model="task.title">
        <button type="submit" class="btn btn-primary">Edit Task</button>
    </form>
        <button v-on:click.prevent="changePage" type="button" class="btn btn-primary mb-3">Cancel</button>
    </div>
</template>

<script>
export default {
    name : "EditForm",
    props : ['task'],
    methods : {
        editTask(){
            const id = this.task.id
            const title = this.task.title
            this.$emit("editTask", title, id)
        },
        changePage(){
            this.$emit("changePage", "main page")
        }
    }
}
</script>

<style>

</style>