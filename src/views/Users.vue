<template>
    <v-card class="users_body">
        <UserDetails :showDetails.sync="dialog" :selectedUserId="selectedUserId" @hideDetails="closeDetails"/>
        <UsersList  @selecting="showUserDetails"/>
    </v-card>
</template>
<script>
    import UserDetails from "../components/UserDetails";
    import UsersList from "../components/UsersList";
    export default {
        components: {
            UserDetails,
            UsersList
        },
        data() {
            return {
                dialog: false,
                selectedUserId: 0,
            }
        },
        methods: {
            showUserDetails(id) {
                this.selectedUserId = id;
                this.dialog = true;
            },
            closeDetails() {
                this.dialog = false;
                //todo compare returned user and update list of changes
            }
        },
    }
</script>

<style scoped>
    .users_body {
        position: relative;
        max-width: 800px;
        margin: 1% auto 0 auto;
    }

</style>