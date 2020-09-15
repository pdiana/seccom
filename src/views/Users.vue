<template>
    <v-card class="users_body">
        <v-card-title class="grey--text">
            Users
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <UserDetails :showDetails.sync="dialog" :selectedUserId="selectedUserId" @hideDetails="closeDetails"/>
        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="users"
                :search="search"
                :sort-by="['last_name']"
                :sort-desc="[false, true]"
                :loading="isLoading"
                class="elevation-1"
                hide-default-footer
                disable-pagination
                single-select
                @click:row="selectUser"
        >

            <template v-slot:item.hasOpenTicket="{ item }">
                <v-icon :color=setColor(item)>train</v-icon>
            </template>
            <template v-slot:item.tickets[0].ticket_date="{ item }">
                {{getNextDate(item)}}
            </template>

        </v-data-table>
    </v-card>
</template>

<script>
    import axios from "axios"
    import UserDetails from "../components/UserDetails";

    export default {
        components: {
            UserDetails
        },
        data() {
            return {
                isLoading: true,
                dialog: false,
                search: '',
                selected: [],
                selectedUserId:0,
                users: [],
                headers: [
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Tickets', value: 'hasOpenTicket'},
                    {text: 'Next Ticket', value: 'tickets[0].ticket_date'},
                ],
            }
        },
        methods: {
            setColor(user) {
                return user.hasOpenTicket ? 'green' : 'red'
            },
            getNextDate(user) {
                return user.hasOpenTicket ? user.tickets[0].ticket_date : '-'
            },
            selectUser(user) {
                this.selected = [];
                this.selected.push(user);
                this.selectedUserId= this.selected[0].id;
                this.dialog = true
            },
            closeDetails(){
                this.dialog = false;
                //todo compare returned user and update list of changes
            }
        },
        created() {
            axios.get('http://localhost:3000/api/users')
                .then((res) => {
                    // workaround to make date sortable since dummy data has a ticket date for all users.
                    // in a real application i would use moment.js to standardize date format,
                    // iterate thru tickets dates and compare them to today date to determine if a ticket is "active"
                    res.data.forEach(function (val) {
                        if (!val.hasOpenTicket) val.tickets[0].ticket_date = 0
                    });
                    this.users = res.data;
                    this.isLoading = false
                })

                .catch(err => console.log(err))
        },
    }
</script>

<style scoped>
    .users_body {
        max-width: 800px;
        margin: auto;
    }

</style>