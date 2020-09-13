<template>
    <nav>
        <v-toolbar app>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Dummy</span>
                <span class="grey--text text--darken-2">App</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn to="/" text>
                    <v-icon left>home</v-icon>
                    Home
                </v-btn>
                <v-btn to="/about" text class="mr-10">
                    <v-icon left>info</v-icon>
                    About
                </v-btn>
            </v-toolbar-items>
            <v-btn text>
                <span class="grey--text text--darken-2">Log Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
    export default {
        items: [
            {title: 'Home', link: '/', icon: 'home'},
            {title: 'About', link: '/about', icon: 'info'}
        ]
    }
</script>

<style scoped>

</style>