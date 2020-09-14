<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">{{warning.headline}}</v-card-title>
                    <v-card-text>
                        All modifications will be lost
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="dialog = false">Continue editing</v-btn>
                        <v-btn color="red darken-1" text @click="warning.discardAction">{{warning.discardLabel}}
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
                            <v-btn text @click="closeModal">
                                <v-icon color="red">highlight_off</v-icon>
                            </v-btn>
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
                            <v-btn v-if="!isEditing" text @click="editDetails">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn v-else text @click="cancelEdit">
                                <v-icon>highlight_off</v-icon>
                            </v-btn>
                            <v-btn v-if="!isEditing" text @click="deleteUser">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-btn v-else text @click="saveEdit">
                                <v-icon>check_circle_outline</v-icon>
                            </v-btn>
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
    export default {
        name: "UserDetails",
        props: {
            showDetails: {type: Boolean, default: false},
            selectedUser: Array,
        },
        data() {
            return {
                dialog: false,
                fields: {
                    lastName: '',
                    firstName: '',
                    email: '',
                },
                isEditing: false,
                warning: {
                    headline: '',
                    discardAction: function () {

                    },
                    discardLabel: ''
                }

            }
        },
        methods: {
            closeModal() {
                if (this.isEditing) {
                    this.warning.headline = 'Close without saving?';
                    this.warning.discardAction = this.discardChanges;
                    this.warning.discardLabel = 'Close';
                    this.dialog = true
                } else
                    this.$emit('hideDetails', this.fields)
            },
            editDetails() {
                this.isEditing = true
            },
            deleteUser() {

            },
            cancelEdit() {
                this.warning.headline = 'Discard changes?';
                this.warning.discardAction = this.undoChanges;
                this.warning.discardLabel = 'Discard';
                this.dialog = true
            },
            discardChanges() {
                this.isEditing = false;
                this.dialog = false;
                this.closeModal();
            },
            saveEdit() {
                this.isEditing = false;
            },
            undoChanges() {
                this.isEditing = false;
                this.fields.lastName = this.selectedUser[0].last_name;
                this.fields.firstName = this.selectedUser[0].first_name;
                this.fields.email = this.selectedUser[0].email;
                this.dialog = false;
            }
        },
        watch: {
            selectedUser: function (val) {
                this.fields.lastName = val[0].last_name;
                this.fields.firstName = val[0].first_name;
                this.fields.email = val[0].email;
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
