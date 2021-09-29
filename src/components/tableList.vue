<template>
    <div class="tableList-page">
        <div>
            <p class="text-center">List Table</p>
        </div>
        <vs-table>
            <template #thead>
                <vs-tr>
                    <vs-th>
                        ID
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
                    v-for="(tr, i) in $vs.getPage(users, page, max)"
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
                <vs-pagination v-model="page" :length="$vs.getLength(users, max)" />
            </template>
        </vs-table>
    </div>
</template>

<script>
import { apiDataTtntest } from '../service/api' 
import moment from "moment";

export default {
    data:() => ({
        page: 1,
        max: 10,
        users: [],
        active: 0
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
                this.users = dataTests;
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
