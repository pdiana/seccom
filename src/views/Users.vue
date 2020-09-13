<template>
    <div class="users">

        <v-container class="container">
            <div class="toolbar">
                <h1 class="v-subheader grey--text">Registered Users</h1>
            </div>
            <div>
                <v-card outlined hover class="user_row pa-0" v-bind:class="markOpen(user)" v-for="user in users"
                        :key="user.id">
                    <v-row class="pa-0 ma-0">
                        <v-col class="pa-0 ma-0" cols="12" sm="8">
                            <div class="caption grey--text px-2">User Name</div>
                            <div class="px-2 pb-1">{{user.first_name}} {{user.last_name}}</div>
                        </v-col>
                        <v-col class="pa-0 ma-0" cols="6" sm="2">
                            <div class="caption grey--text text-center">Open Tickets</div>
                            <div class="text-center px-2 pb-1">
                                <v-icon v-if="hasOpenTicket(user)" color="green">train</v-icon>
                                <v-icon v-else color="red">train</v-icon>
                            </div>
                        </v-col>
                        <v-col class="pa-0 ma-0" cols="6" sm="2">
                            <div class="caption grey--text text-center">Next ticket date</div>
                            <div v-if="hasOpenTicket(user)" class="text-center px-2 pb-1">
                                {{user.tickets[0].ticket_date}}
                            </div>
                            <div v-else class="text-center px-2 pb-1">-</div>
                        </v-col>
                    </v-row>
                </v-card>
            </div>

        </v-container>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                users: []
            }

        },
        methods: {
            hasOpenTicket(user) {
                return user.hasOpenTicket;
            },
            markOpen(user) {
                return user.hasOpenTicket ? "hasOpen" : "hasNotOpen";
            }
        },
        created() {
            axios.get('http://localhost:3000/api/users')
                .then(res => this.users = res.data)
                .catch(err => console.log(err))
        }
    }
</script>
<style scoped>
    .user_row.hasOpen {
        border-left: 4px solid green;
    }

    .user_row.hasNotOpen {
        border-left: 4px solid red;
    }

    .search_bar {
        z-index: 10;
        background-color: aliceblue;
        position: fixed;
    }

    .users {
        width: 100%;
    }

</style>
