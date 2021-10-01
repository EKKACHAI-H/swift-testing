<template>
    <div class="home">
        <div class="header-bar">
            <i class='bx bx-spreadsheet bx-custom-size-md'></i> 
            <span class="padding-font-icon header-text">Assignment of Open Work Orders</span> 
        </div>
        <div class="div-content">
            <div class="btn-position">
                <div class="btn-position-left">
                    <vs-button
                        success
                        flat
                        :active="activeList == 0"
                        @click="activeList = 0"
                    >
                        <i class='bx bx-list-ul bx-sm'></i> <span class="padding-font-icon">List</span> 
                    </vs-button>
                    <vs-button
                        success
                        flat
                        :active="activeList == 1"
                        @click="activeList = 1"
                    >
                        <i class='bx bx-calendar bx-sm'></i>  <span class="padding-font-icon">Calendar</span> 
                    </vs-button>
                </div>
                <div class="btn-position-right">
                    <vs-button
                        flat
                        @click="openChart()"
                    >
                        <i class='bx bx-line-chart bx-sm'></i>  <span class="padding-font-icon">Chart</span> 
                    </vs-button>
                </div>
            </div>
            <tableList v-if="activeList === 0" />
            <calendar v-if="activeList === 1" />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import tableList from "@/components/tableList.vue";
import calendar from "@/components/calendar.vue";

export default {
    name: "Home",
    components: {
        tableList,
        calendar,
    },
    data:() => ({
        activeList: 0,
    }),
    computed: {},
    created() {},
    mounted() {},
    methods: {
        openChart() {
            this.$router.push({name:'chart'});
        }
    },
    watch: {}
};
</script>

<style scoped>
.bx-sm {
    font-size: 1.25rem!important;
}
.bx-custom-size-md {
    font-size: 2rem!important;
}
.header-text {
    vertical-align: super;
}
.header-bar {
    font-size: 18px;
    background-color: #46c93a;
    color: white;
    padding: 8px 8px 4px 8px;
}
.div-content {
    padding: 20px;
}
.btn-position {
    display: flex;
}
.btn-position-left {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: left;
}
.btn-position-right {
    width: 50%;
    align-items: center;
    text-align: -webkit-right;
}
.padding-font-icon {
    padding-left: 5px;
}
</style>
