<template>
    <div class="chart-page">
        <div>
            <p class="text-center">Chart</p>
        </div>
        <canvas id="chart-div"></canvas>
        <div class="text-center">
            <vs-button
                @click="backToHome()"
            >
                Back to home
            </vs-button>
        </div>
    </div>
</template>

<script>
import { apiDataTtntest } from '../service/api' 
import Chart from 'chart.js'

export default {
    data:() => ({
        filterData: [],
        tnTest: [],
    }),
    computed: {},
    created() {},
    mounted() {
        this.getApiTtntest();
    },
    methods: {
        backToHome() {
            this.$router.push({name: 'Home'})
        },
        createChart() {
            var ctx = document.getElementById('chart-div')
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.filterData.map(item => {
                        const day = new Date(item.timestamp)
                        return `${day.getHours()} : ${day.getMinutes()} : ${day.getSeconds()}`
                    }),
                    datasets: [{
                    label: 'Data',
                    data: this.filterData.map(item => item.data),
                    borderColor: '#6E7EF5',
                    fill: false
                    }, {
                    label: 'Data 2',
                    data: this.filterData.map(item => item.data2),
                    borderColor: '#B277DE',
                    fill: false
                    }]
                },
                options: {
                    responsive: true
                }
            })
            console.log('myChart ',myChart)
        },
        getApiTtntest:async function() {
            const loading = this.$vs.loading({
                text: 'Loading...'
            })
            const resTtntest = await apiDataTtntest();
            console.log('resTtntest :: ',resTtntest.data)
            if (resTtntest.data.length > 0) {
                loading.close()
                const filteredData = resTtntest.data.filter(element => {
                    const startTime = new Date('2020-07-13T17:55:00')
                    const endTime = new Date('2020-07-13T18:00:00')
                    const currentTime = new Date(element.timestamp)
                    return currentTime >= startTime && currentTime <= endTime;
                })
                filteredData.sort(function(a, b) {
                    return new Date(a.timestamp) - new Date(b.timestamp);
                });
                this.filterData = filteredData;
                console.log('filteredData :: ',filteredData)
            }
            this.createChart();
        },
    },
    watch: {}
}
</script>

<style scoped>
/* .chart-page {

} */
.text-center {
    text-align: -webkit-center;
}
/* .chart-data {
    width: 100%;
    height: 500px;
} */
</style>
