<template>
    <div class="container">
        <div class="navbar navbar-default"> 
            <ul class="nav navbar-nav">
                <v-link href="/">待办事项</v-link>
                <v-link href="/about">关于</v-link>
            </ul>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            VLink
        }
    }
</script>
