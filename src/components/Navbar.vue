<template>
    <div>
        <v-app-bar app>
            <v-app-bar-nav-icon @click="mobileNav = !mobileNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Dummy</span>
                <span class="grey--text text--darken-2">App</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-for="menu in menuItems" :key="menu.route" class="hidden-xs-only">
                <v-btn :to=menu.route text>
                    <v-icon left>{{menu.icon}}</v-icon>
                    {{menu.title}}
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer v-model="mobileNav" absolute temporary>
            <v-list>
                <v-list-item v-for="menu in menuItems" :key="menu.title" :to="menu.route" link>
                    <v-icon left>{{menu.icon}}</v-icon>
                    {{menu.title}}
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                mobileNav: false,
                menuItems: [
                    {title: 'Users', route: '/', icon: 'people'},
                    {title: 'About', route: '/about', icon: 'info'},
                    {title: 'Log Out', route: '#', icon: 'exit_to_app'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>