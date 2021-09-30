<template>
    <div class="tableList-page">
        <div>
            <p class="text-center">List Table</p>
        </div>
        <vs-table>
            <template #thead>
                <vs-tr>
                    <vs-th>
                        IDDDD
                    </vs-th>
                    <vs-th>
                        DATA
                    </vs-th>
                    <vs-th>
                        DATA2
                    </vs-th>
                    <vs-th>
                        Timestamp
                    </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr
                    :key="i"
                    v-for="(tr, i) in $vs.getPage(dataTable, currentPage, maxRows)"
                    :data="tr"
                >
                    <vs-td>
                        {{ tr.data }}
                    </vs-td>
                    <vs-td>
                        {{ tr.data2 }}
                    </vs-td>
                    <vs-td>
                        {{ tr.id }}
                    </vs-td>
                    <vs-td>
                        {{ tr.timestamp }}
                    </vs-td>
                </vs-tr>
            </template>
            <template #footer>
                <vs-pagination v-model="currentPage" :length="$vs.getLength(dataTable, maxRows)" />
            </template>
        </vs-table>
    </div>
</template>

<script>
import { apiDataTtntest } from '../service/api' 
import moment from "moment";

export default {
    data:() => ({
        currentPage: 1,
        maxRows: 10,
        dataTable: [],
    }),
    computed: {},
    created() {},
    mounted() {
        this.getApiTtntest();
    },
    methods: {
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
                        'data': dataTest.data ? dataTest.data : '-',
                        'data2': dataTest.data2 ? dataTest.data2 : '-',
                        'id': dataTest.id,
                        'timestamp': moment(dataTest.timestamp).format('DD/MM/YYYY HH:mm:ss'),
                    }
                    dataTests.push(obj)
                });
                this.dataTable = dataTests;
            }
        }
    },
    watch: {}
}
</script>

<style scoped>
/* .tableList-page {

} */
.text-center {
    text-align: center;
}
</style>
