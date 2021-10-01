<template>
    <div class="calendar-page">
        <div class="topic-text">
            Calendar
        </div>
        <v-calendar
            class="custom-calendar max-w-full"
            :masks="masks"
            :attributes="attributes"
            disable-page-swipe
            is-expanded
            >
            <template v-slot:day-content="{ day, attributes }">
                <div class="flex flex-col h-full z-10 overflow-hidden div-days" @click="openModal(day, attributes)">
                    <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                    <div class="div-day">
                        
                    </div>
                </div>
            </template>
        </v-calendar>
        <div v-if="isOpenDateModal" class="dialog-data-date">
            <!-- <div class="scroll-dialog">
                {{selectedData}}
            </div> -->
            <vs-table>
                <template #thead>
                <vs-tr>
                    <vs-th>
                    ID
                    </vs-th>
                    <vs-th>
                    Data
                    </vs-th>
                    <vs-th>
                    Data 2
                    </vs-th>
                    <vs-th>
                    Timestamp
                    </vs-th>
                </vs-tr>
                </template>
                <template #tbody>
                <vs-tr
                    :key="i"
                    v-for="(tr, i) in $vs.getPage(selectedData, page, max)"
                    :data="tr"
                >
                    <vs-td>
                    {{ tr.key }}
                    </vs-td>
                    <vs-td>
                    {{ tr.customData.title }}
                    </vs-td>
                    <vs-td>
                    {{ tr.customData.title2 }}
                    </vs-td>
                    <vs-td>
                    {{ tr.dates }}
                    </vs-td>
                </vs-tr>
                </template>
                <template #footer>
                <vs-pagination v-model="page" :length="$vs.getLength(selectedData, max)" />
                </template>
            </vs-table>

            <div class="text-webkit-center">
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
// import moment from "moment";

Vue.use(VCalendar);
export default {
    data() {
        return {
            page: 1,
            max: 10,
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
        openModal(day) {
            this.isOpenDateModal = true;
            if (this.selectedDate === null || !this.checkSameDate(day.date, this.selectedDate)) {
                this.selectedDate = day.date;
                this.selectedData = this.filterDataByDate(day.date);
            } 
        },
        getApiTtntest:async function() {
            const loading = this.$vs.loading({
                text: 'Loading...'
            })
            try {
                const resTtntest = await apiDataTtntest();
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
                    this.resData = dataTests;
                }
            } catch (error) {
                console.error('error : ',error)
                loading.close()
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
.text-webkit-center {
    padding-top: 6px;
    text-align: -webkit-center;
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
    border-radius: 8px;
    -webkit-box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
    -moz-box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
    box-shadow: 0px 0px 14px 4px rgba(189,189,189,1);
}
.div-day {
    height: 70px;
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
