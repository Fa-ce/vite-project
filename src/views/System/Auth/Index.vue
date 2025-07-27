<template>
  <div class="auth-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>权限管理</span>
          <el-button type="primary" size="small">新增权限</el-button>
        </div>
      </template>
      
      <el-row :gutter="20">
        <el-col :span="8">
          <el-tree
            :data="treeData"
            node-key="id"
            default-expand-all
            :props="defaultProps"
          />
        </el-col>
        <el-col :span="16">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="权限名称" width="180" />
            <el-table-column prop="code" label="权限编码" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作" width="180">
              <template #default>
                <el-button size="small">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
const treeData = [
  {
    id: 1,
    label: '系统管理',
    children: [
      { id: 2, label: '用户管理' },
      { id: 3, label: '角色管理' },
      { id: 4, label: '权限管理' }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const tableData = [
  { id: 1, name: '用户管理', code: 'user:manage', status: '启用' },
  { id: 2, name: '角色管理', code: 'role:manage', status: '启用' },
  { id: 3, name: '权限管理', code: 'auth:manage', status: '启用' }
]
</script>

<style scoped>
.auth-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
