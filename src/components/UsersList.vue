<template>
    <div>
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
        <v-data-table
                height="80vh"
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
                fixed-header
                @click:row="selectUser"
        >

            <template v-slot:item.hasOpenTicket="{ item }">
                <v-icon :color=setColor(item)>train</v-icon>
            </template>
            <template v-slot:item.tickets[0].ticket_date="{ item }">
                {{getNextDate(item)}}
            </template>

        </v-data-table>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: 'UsersList',
        props: {
        },
        data() {
            return {
                isLoading: true,
                users:[],
                selected: [],
                search:'',
                selectedUserId: 0,
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
            selectUser(user) {
                this.selected = [];
                this.selected.push(user);
                this.selectedUserId = this.selected[0].id;
                this.$emit('selecting', this.selectedUserId)

            },
            getNextDate(user) {
                return user.hasOpenTicket ? user.tickets[0].ticket_date : '-'
            },
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
                })
                .then(()=> this.isLoading = false)

                .catch(err => console.log(err))
        },
    }
</script>

<style scoped>

</style>