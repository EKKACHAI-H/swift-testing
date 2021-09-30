<template>
    <div class="calendar-page">
        <div>
            <p class="text-center">Calendar</p>
        </div>
        <v-calendar
            class="custom-calendar max-w-full"
            :masks="masks"
            :attributes="attributes"
            disable-page-swipe
            is-expanded
            >
            <template v-slot:day-content="{ day, attributes }">
                <div class="flex flex-col h-full z-10 overflow-hidden" @click="openDialog(day, attributes)">
                    <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                </div>
            </template>
        </v-calendar>
        <div v-if="isOpenDateModal" class="dialog-data-date">
            <div class="scroll-dialog">
                {{selectedData}}
            </div>
            <div class="text-right">
                <vs-button
                    flat
                    @click="isOpenDateModal = false"
                >
                    Close
                </vs-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from 'v-calendar';
import { apiDataTtntest } from '../service/api' 

Vue.use(VCalendar);
export default {
    data() {
        return {
            attributes: [],
            resData: [],
            filterDate: [],
            isOpenDateModal: false,
            selectedDate: null,
            selectedData: [],
            masks: {
                weekdays: 'WWW',
            },
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.getApiTtntest();
        console.log('attributes :: ',this.attributes)
    },
    methods: {
        checkSameDate(first, second) {
            if (second === null || first === null) {
                return false
            }
            return first.getFullYear() === second.getFullYear() &&
            first.getMonth() === second.getMonth() &&
            first.getDate() === second.getDate(); 
        },
        filterDataByDate(date) {
            return this.resData.filter(item => {
                return this.checkSameDate(new Date(date), item.dates)
            })
        },
        openDialog(day) {
            this.isOpenDateModal = true;
            if (this.selectedDate === null || !this.checkSameDate(day.date, this.selectedDate)) {
                this.selectedData = this.filterDataByDate(day.date);
                this.selectedDate = day.date;
                console.log('this.selectedData :: ',this.selectedData)
            } 
        },
        getApiTtntest:async function() {
            const loading = this.$vs.loading({
                text: 'Loading...'
            })
            const resTtntest = await apiDataTtntest();
            console.log('resTtntest :: ',resTtntest.data)
            if (resTtntest.data.length > 0) {
                loading.close()
                let obj = {};
                let dataTests = [];
                resTtntest.data.forEach(dataTest => {
                    obj = {
                        'key': dataTest.id,
                        'customData': {
                            'title': dataTest.data,
                            'title2': dataTest.data,
                        },
                        'dates': new Date(dataTest.timestamp)
                    }
                    dataTests.push(obj)
                });
                console.log('dataTests :: ',dataTests)
                this.resData = dataTests;
            }
        }
    },
    watch: {}
};
</script>

<style lang="postcss" scoped>
.text-center {
    text-align: center;
}
.text-right {
    text-align: -webkit-right;
}
.dialog-data-date {
    padding: 20px 20px 10px 20px;
    z-index: 5;
    background-color: #f1f1f1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 500px;
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
    -moz-box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
    box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
}
.scroll-dialog {
    height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
}
/deep/ .custom-calendar.vc-container {
    --day-border: 1px solid #b8c2cc;
    --day-border-highlight: 1px solid #b8c2cc;
    --day-width: 90px;
    --day-height: 90px;
    --weekday-bg: #f8fafc;
    --weekday-border: 1px solid #eaeaea;
    border-radius: 0;
    width: 100%;
    & .vc-header {
        background-color: #f1f5f8;
        padding: 10px 0;
    }
    & .vc-weeks {
        padding: 0;
    }
    & .vc-weekday {
        background-color: var(--weekday-bg);
        border-bottom: var(--weekday-border);
        border-top: var(--weekday-border);
        padding: 5px 0;
    }
    & .vc-day {
        padding: 0 5px 3px 5px;
        text-align: left;
        height: var(--day-height);
        min-width: var(--day-width);
        background-color: white;
        &.weekday-1,
        &.weekday-7 {
        background-color: #eff8ff;
        }
        &:not(.on-bottom) {
        border-bottom: var(--day-border);
        &.weekday-1 {
            border-bottom: var(--day-border-highlight);
        }
        }
        &:not(.on-right) {
        border-right: var(--day-border);
        }
    }
    & .vc-day-dots {
        margin-bottom: 5px;
    }
}
</style>
