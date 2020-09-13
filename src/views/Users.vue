<template>
    <div class="users">
        <v-container>
            <h1 class="v-subheader grey--text">Registered Users</h1>

            <v-card  outlined hover class="user_row pa-0" v-bind:class="markOpen(user)" v-for="user in users"
                    :key="user.id">
                <v-row class="pa-0 ma-0">
                    <v-col class="pa-0 ma-0" cols="12" sm="8">
                        <div class="caption grey--text px-2">User Name</div>
                        <div class="px-2 pb-1">{{user.first_name}} {{user.last_name}}</div>
                    </v-col>
                    <v-col class="pa-0 ma-0" cols="6" sm="2">
                        <div class="caption grey--text text-center">Open Tickets</div>
                        <div class="text-center px-2 pb-1">
                            <v-icon v-if="hasOpenTicket(user)" color="green">check_circle_outline</v-icon>
                            <v-icon v-else color="red">not_interested</v-icon>
                        </div>
                    </v-col>
                    <v-col class="pa-0 ma-0" cols="6" sm="2">
                        <div class="caption grey--text text-center">Next ticket date</div>
                        <div v-if="hasOpenTicket(user)" class="text-center px-2 pb-1">{{user.tickets[0].date}}</div>
                        <div v-else class="text-center px-2 pb-1">-</div>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                users: [
                    {
                        "id": 1,
                        "first_name": "Jillene",
                        "last_name": "Cirlos",
                        "email": "jcirlos1@pinterest.com",
                        "gender": "Female",
                        "hasOpenTicket": true,
                        "tickets": [
                            {
                                "id": 86156,
                                "date": "10/15/2021",
                                "price": "$79.34"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "first_name": "Matti",
                        "last_name": "Shoreman",
                        "email": "mshoreman0@amazonaws.com",
                        "gender": "Female",
                        "hasOpenTicket": false,
                        "tickets": [
                            {
                                "id": 86156,
                                "date": "10/15/2018",
                                "price": "$50.04"
                            }
                        ]
                    },
                ]
            }
        },
        methods: {
            hasOpenTicket(user) {
                return user.hasOpenTicket;
            },
            markOpen(user) {
                return user.hasOpenTicket ? "hasOpen" : "hasNotOpen";
            }
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
</style>
