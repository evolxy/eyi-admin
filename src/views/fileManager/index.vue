<template>
  <div>
    <p>hello world</p>
    <a-table
      ref="table"
      :data-source="dataSource"
      :columns="columns"
    >
      <template #action="{record}">
        <a @click="clicked(record)">查看详情</a>
      </template>
    </a-table>
  </div>
</template>

<script>

export default {
  name: 'FileManagerIndex',
  components: {
  },
  data () {
    return {
      columns: [
        {
          name: 'Name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ]
    }
  },
  methods: {
    clicked (record) {
      console.log(record)
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
