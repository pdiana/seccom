<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="300">
                <v-card>
                    <v-card-text class="headline text-center">{{warning.headline}}</v-card-text>
                    <v-card-text class="text-center">{{warning.text}}</v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="dialog = false">{{warning.noLabel}}</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="warning.yesAction">{{warning.yesLabel}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-dialog
                v-model="showDetails"
                persistent
                max-width="800"
        >
            <v-card>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="11">
                            <v-card-title class="headline grey--text">User Details</v-card-title>
                        </v-col>
                        <v-col cols="1">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="closeModal" v-bind="attrs" v-on="on">
                                        <v-icon color="red">highlight_off</v-icon>
                                    </v-btn>
                                </template>
                                <span>Close Details</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container>
                    <v-row>
                        <v-col class="user_data_field user_last_name" cols="4">
                            <v-text-field
                                    v-model="fields.lastName"
                                    label="Last Name"
                                    :disabled=!isEditing
                            ></v-text-field>
                        </v-col>
                        <v-col class="user_data_field user_first_name" cols="4">
                            <v-text-field
                                    v-model="fields.firstName"
                                    label="First Name"
                                    :disabled=!isEditing
                            ></v-text-field>
                        </v-col>
                        <v-col class="user_data_field user_email" cols="4">
                            <v-text-field
                                    v-model="fields.email"
                                    label="email"
                                    :disabled=!isEditing
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="5"></v-col>
                        <v-col cols="2">
                            <v-tooltip v-if="!isEditing" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="editDetails" v-bind="attrs" v-on="on">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit User</span>
                            </v-tooltip>
                            <v-tooltip v-else top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="cancelEdit" v-bind="attrs" v-on="on">
                                        <v-icon>highlight_off</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cancel Editing</span>
                            </v-tooltip>
                            <v-tooltip v-if="!isEditing" top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="deletePrompt" v-bind="attrs" v-on="on">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete User</span>
                            </v-tooltip>
                            <v-tooltip v-else top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text @click="saveEdit" v-bind="attrs" v-on="on">
                                        <v-icon>check_circle_outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Save Changes</span>
                            </v-tooltip>
                        </v-col>
                        <v-col cols="5"></v-col>
                    </v-row>
                </v-container>
                <v-card-text class="text-center">
                    <v-divider></v-divider>
                    WIP
                    Tickets section: tickets will be listed here
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import axios from "axios"

    export default {
        name: "UserDetails",
        props: {
            showDetails: {type: Boolean, default: false},
            selectedUserId: {type: Number},
        },
        data() {
            return {
                dialog: false,
                isEditing: false,
                fields: {
                    lastName: '',
                    firstName: '',
                    email: '',
                },
                tempValues: {
                    lastName: '',
                    firstName: '',
                    email: '',
                },
                warning: {
                    headline: '',
                    text: '',
                    noLabel: '',
                    yesLabel: '',
                    yesAction: () => {
                    }
                }
            }
        },
        methods: {
            closeModal() {
                if (this.isEditing) {
                    this.warning = {
                        headline: 'Close without saving?',
                        text: 'Changes will not be applied!',
                        noLabel: 'Keep Editing',
                        yesLabel: 'Close',
                        yesAction: this.discardChanges
                    };
                    this.dialog = true
                } else
                    this.$emit('hideDetails', this.fields)
            },
            editDetails() {
                this.tempValues = this.form;
                this.isEditing = true
            },
            deletePrompt() {
                this.warning = {
                    headline: 'Delete User?',
                    text: 'This will remove the user from the database!',
                    noLabel: 'Keep User',
                    yesLabel: 'Delete User',
                    yesAction: this.deleteUser
                };
                this.dialog = true
            },
            deleteUser() {
                //todo delete AJAX
                this.dialog = false;
                this.closeModal();

            },
            cancelEdit() {
                this.warning = {
                    headline: 'Discard changes?',
                    text: 'Changes won\'t be saved into the database!',
                    noLabel: 'Keep Editing',
                    yesLabel: 'Discard Changes',
                    yesAction: this.undoChanges
                };
                this.dialog = true
            },
            discardChanges() {
                this.isEditing = false;
                this.dialog = false;
                this.closeModal();
            },
            saveEdit() {
                this.isEditing = false;
                this.fields = this.form;
                //todo POST to backend
            },
            undoChanges() {
                this.isEditing = false;
                this.fields = this.tempValues;
                this.dialog = false;
            }
        },
        watch: {
            selectedUserId: function (id) {
                axios.get('http://localhost:3000/api/users/' + id)
                    .then((res) => {
                        this.fields.lastName = res.data.last_name;
                        this.fields.firstName = res.data.first_name;
                        this.fields.email = res.data.email;
                    });
            },
        },
        computed: {
            form() {
                return {
                    lastName: this.fields.lastName,
                    firstName: this.fields.firstName,
                    email: this.fields.email
                }
            },
        }
    }
</script>

<style>
    .user_data_field {
    }

    .v-input--is-disabled {


    }

    .v-input--is-disabled input {
        color: rgba(0, 0, 0, 0.87) !important;
    }

    .theme--light.v-text-field.v-input--is-disabled .v-input__slot::before {
        border: none;
    }
</style>
