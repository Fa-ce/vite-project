<template>
  <div class="role-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" size="small">新增角色</el-button>
        </div>
      </template>
      
      <el-table :data="roleData" border style="width: 100%">
        <el-table-column prop="name" label="角色名称" width="180" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="small" type="success" @click="handleAuth(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const roleData = ref([
  { id: 1, name: '超级管理员', code: 'admin', status: '启用', createTime: '2024-01-01' },
  { id: 2, name: '普通用户', code: 'user', status: '启用', createTime: '2024-01-02' }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(20)

const handleEdit = (row) => {
  console.log('编辑', row)
}

const handleDelete = (row) => {
  console.log('删除', row)
}

const handleAuth = (row) => {
  console.log('分配权限', row)
}
</script>

<style scoped>
.role-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
