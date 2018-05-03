<template>
  <div class="search-engines">
    <div class="search-engines-inner" v-loading="loading" element-loading-text="拼命加载中">
      <div class="search-engines-card" v-for="(item, index) in data.row" :key="index">
        <div class="card-inner">
          <div class="card-delete" @click="handleDelete"><i class="fa fa-trash-o" title="删除"></i></div>
          <img :src="item.logo" alt="logo" class="card-image">
          <div class="card-body">
            <div class="card-title">
              <span>{{item.title}}</span>
              <el-button type="text" style="float: right; padding: 0;" @click="handleEdit">编辑</el-button>
            </div>
            <div class="card-description">{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="search-engines-card">
        <div class="add-search-engines" title="添加" @click="handleAddSearchEngines">
          <div class="add-search-engines__icon row"></div>
          <div class="add-search-engines__icon col"></div>
        </div>
      </div>
    </div>
    <el-dialog :title="form.caption" :visible.sync="dialogAddSearchEnginesVisible" @close="handleResetForm">
      <el-form :model="form" size="small" :rules="rules" ref="form">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商标" :label-width="formLabelWidth" prop="logo">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChangeLogo"
            :before-remove="handleRemoveLogo"
            name="logo"
            :limit="1"
            :file-list="fileList"
            ref="upload"
            :multiple="false"
            list-type="picture"
            :auto-upload="false">
            <el-button size="small" type="primary">选择图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
          <el-input type="textarea" v-model="form.description" auto-complete="off" rows="4"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="formLabelWidth">
          <el-button type="default" mini="mini" style="margin-bottom: 5px; color: cornflowerblue" @click="handleAddClassify">新增分类</el-button>
          <el-table
            :data="form.types"
            size="mini"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称"
              width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" auto-complete="off"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="url"
              label="url">
              <template slot-scope="scope">
                <el-input v-model="scope.row.url" auto-complete="off"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteClassify(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddSearchEnginesDialog" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAddSearchEngines" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SearchEngine',
  data () {
    return {
      loading: false,
      dialogAddSearchEnginesVisible: false,
      formLabelWidth: '90px',
      fileList: [],
      form: {
        caption: '新增搜索引擎',
        title: '',
        logo: '',
        types: [],
        description: ''
      },
      rules: {
        title: [{ required: true, message: '请输入搜索引擎的名称', trigger: 'blur' }],
        logo: [{ required: true, message: '请选择搜索引擎的商标', trigger: 'blur' }],
        description: [{ required: true, message: '请输入搜索引擎的描述', trigger: 'blur' }]
      },
      data: {
        row: [],
        total: 0
      }
    }
  },
  methods: {
    ...mapMutations([
      'CURRENT_SIDEBAR_NAV_INDEX'
    ]),
    initData () {
      this.loading = true
      let url = '/api/searchEngines/get'
      this.$http.get(url).then((res) => {
        this.handleResponse(res)
        this.loading = false
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '网络出错或服务器出错！'
        })
        this.loading = false
        console.log(err)
      })
    },
    handleResponse (res) {
      let result = res.data
      let status = result.status
      let message = result.message
      let data = result.data
      if (status === 200 && message === 'ok') {
        this.data = data
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    handleAddSearchEngines () {
      this.form.caption = '新增搜索引擎'
      this.dialogAddSearchEnginesVisible = true
    },
    handleResetForm () {
      this.$refs['form'].resetFields()
      this.$refs['upload'].clearFiles()
      this.form.types = []
    },
    closeAddSearchEnginesDialog () {
      this.dialogAddSearchEnginesVisible = false
    },
    handleChangeLogo (file, fileList) {
      this.form.logo = file.raw
    },
    handleRemoveLogo (file, fileList) {
      this.form.logo = ''
    },
    confirmAddSearchEngines () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        let formData = new FormData()
        formData.append('title', this.form.title)
        formData.append('types', JSON.stringify(this.form.types))
        formData.append('description', this.form.description)
        formData.append('logo', this.form.logo)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post('/api/searchEngines/add', formData, config).then((res) => {
          this.handleAddResponse(res)
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '网络出错或服务器出错！'
          })
          console.error(err)
        })
      })
    },
    handleAddResponse (res) {
      let result = res.data
      let status = result.status
      let message = result.message
      if (status === 200 && message === 'ok') {
        this.$message({
          type: 'success',
          message: '新增搜索成功!'
        })
        this.closeAddSearchEnginesDialog()
        this.initData()
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    handleEdit () {
      alert('你点击了编辑！')
    },
    handleDelete () {
      this.$confirm('你确定删除此搜索引擎吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'error',
          message: '权限不足!'
        })
      }).catch(() => {
        // pass
      })
    },
    handleAddClassify () {
      this.form.types.push({
        name: '',
        url: ''
      })
    },
    handleDeleteClassify (index, row) {
      this.form.types.splice(index, 1)
    },
    init () {
      this.CURRENT_SIDEBAR_NAV_INDEX(1)
      this.initData()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
  .search-engines {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .search-engines-inner {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
  .search-engines-inner::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  .search-engines-inner::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.2);
  }
  .search-engines-card {
    float: left;
    width: calc(100% / 4);
    padding: 10px;
  }
  .card-inner {
    border: 1px solid #ebebeb;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  .card-inner:hover .card-delete {
    display: block;
  }
  .card-delete {
    display: none;
    position: absolute;
    top: -35px;
    right: -35px;
    width: 70px;
    height: 70px;
    cursor: pointer;
    transition: all ease .2s;
    border-radius: 50%;
    background-color: rgba(0,0,0,.04);
  }
  .card-delete>i:before {
    position: absolute;
    top: 42px;
    left: 14px;
    color: #ccc;
  }
  .card-image {
    width: 50%;
    margin: 15px 25% 0;
  }
  .card-body {
    padding: 15px;
  }
  .card-body .card-title {
    font-weight: 500;
    color: #333;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .card-body .card-description {
    font-size: 13px;
    line-height: 1.5;
    height: 36px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    color: #999;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .add-search-engines {
    position: relative;
    padding: 56px 0;
    cursor: pointer;
    margin: 20% 0;
  }
  .add-search-engines:hover>.add-search-engines__icon {
    background-color: #d5d5d5;
  }
  .add-search-engines__icon {
    width: 60%;
    position: relative;
    height: 10px;
    border-radius: 5px;
    background: #ddd;
  }
  .add-search-engines__icon.row {
    margin: 0 20%;
  }
  .add-search-engines__icon.col {
    position: absolute;
    margin: 0 20%;
    top: 45%;
    transform: rotate(90deg);
  }
  .search-engines .el-dialog__body {
    padding-top: 15px;
    padding-bottom: 0;
  }
</style>
