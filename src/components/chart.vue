<template>
    <div class="chart-page">
        <div>
            <p class="text-center">Chart</p>
        </div>
        <div class="text-center padding-date-picker">
            <a-range-picker 
                show-time 
                @ok="onChangeDate"
                :default-value="[moment('2020/07/13 17:55:00', dateFormat), moment('2020/07/13 18:00:00', dateFormat)]"
            >
                <template slot="renderExtraFooter">
                    extra footer
                </template>
            </a-range-picker>
        </div>
        <canvas id="chart-div"></canvas>
        <div class="text-center padding-btn-back">
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
import moment from "moment";

export default {
    data:() => ({
        dateFormat: 'YYYY/MM/DD HH:mm:ss',
        filterData: [],
        tnTest: [],
        selectDate: {
            start: null,
            end: null
        },
        resData: []
    }),
    computed: {},
    created() {},
    mounted() {
        this.getApiTtntest();
    },
    methods: {
        moment,
        backToHome() {
            this.$router.push({name: 'Home'})
        },
        onChangeDate(event) {
            for (let i = 0; i < event.length; i++) {
                this.selectDate.start = event[0]._d;
                this.selectDate.end = event[1]._d;
            }
            this.filterDataDate('change');
        },
        filterDataDate(flag) {
            let startTime = null;
            let endTime = null;
            const filteredData = this.resData.filter(element => {
                if (flag === 'change') {
                    startTime = new Date(this.selectDate.start);
                    endTime = new Date(this.selectDate.end);
                }
                if (flag === 'mouted') {
                    startTime = new Date('2020-07-13T17:55:00')
                    endTime = new Date('2020-07-13T18:00:00')
                }
                const currentTime = new Date(element.timestamp)
                return currentTime >= startTime && currentTime <= endTime;
            })
            filteredData.sort(function(a, b) {
                return new Date(a.timestamp) - new Date(b.timestamp);
            });
            this.filterData = filteredData;
            this.createChart();
        },
        getApiTtntest:async function() {
            const loading = this.$vs.loading({
                text: 'Loading...'
            })
            const resTtntest = await apiDataTtntest();
            console.log('resTtntest :: ',resTtntest.data)
            if (resTtntest.data.length > 0) {
                loading.close()
                this.resData = resTtntest.data;
            //     const filteredData = resTtntest.data.filter(element => {
            //         const startTime = new Date('2020-07-13T17:55:00')
            //         const endTime = new Date('2020-07-13T18:00:00')
            //         const currentTime = new Date(element.timestamp)
            //         return currentTime >= startTime && currentTime <= endTime;
            //     })
            //     filteredData.sort(function(a, b) {
            //         return new Date(a.timestamp) - new Date(b.timestamp);
            //     });
            //     this.filterData = filteredData;
            //     console.log('filteredData :: ',filteredData)
            }
            this.filterDataDate('mouted');
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
            console.log(myChart)
        },
    },
    watch: {}
}
</script>

<style scoped>
.text-center {
    text-align: -webkit-center;
}
.padding-date-picker {
    padding-bottom: 16px;
}
.padding-btn-back {
    padding-top: 16px;
}
</style>
