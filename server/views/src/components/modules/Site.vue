<template>
  <div class="site">
    <div class="site-inner">
      <div class="site-toolbar">
        <div class="toolbar-left">
          <el-button type="primary" size="mini" @click="handleAddSite">新增</el-button>
        </div>
        <div class="toolbar-right">
          <div class="search-input">
            <el-input
              placeholder="搜索..."
              prefix-icon="el-icon-search"
              size="small"
              v-model="keyword"
              @change="handleSearch">
            </el-input>
          </div>
          <el-button type="default" size="small" @click="initData"><i class="fa fa-refresh" title="刷新"></i></el-button>
        </div>
      </div>
      <div class="site-table">
        <el-table
          v-loading="loading"
          :data="data.row"
          height="100%"
          size="small"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="title"
            label="名称"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"><a :href="scope.row.url" target="_blank">{{scope.row.title}}</a></el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="imagename"
            label="图标"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"><a :href="scope.row.src" target="_blank">{{scope.row.imagename}}</a></el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型">
            <template slot-scope="scope">
              <el-tag v-for="(item, index) in scope.row.type" :key="index" style="margin-right: 5px" type="info">{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="source"
            label="来源"
            width="120">
          </el-table-column>
          <el-table-column label="操作" width="148">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        class="site-pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="pagination.page"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
      <el-dialog :title="form.caption" :visible.sync="dialogAddSiteVisible" @close="handleResetForm">
        <el-form :model="form" size="small" :rules="rules" ref="form">
          <el-form-item label="网站名称" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="网站链接" :label-width="formLabelWidth" prop="url">
            <el-input v-model="form.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="网站图标" :label-width="formLabelWidth" prop="icon">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-change="handleChangeIcon"
              :before-remove="handleRemoveIcon"
              name="icon"
              :limit="1"
              :file-list="form.fileList"
              ref="upload"
              :multiple="false"
              list-type="picture"
              :auto-upload="false">
              <el-button size="small" type="primary">选择图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="网站分类" :label-width="formLabelWidth" prop="type">
            <el-select v-model="form.type" auto-complete="off" style="width:100%;" :multiple="true">
              <el-option label="游戏与娱乐" value="games"></el-option>
              <el-option label="应用" value="apps"></el-option>
              <el-option label="新闻" value="news"></el-option>
              <el-option label="音乐与视频" value="musics"></el-option>
              <el-option label="图片" value="photos"></el-option>
              <el-option label="购物与团购" value="shopping"></el-option>
              <el-option label="社交与博客" value="social"></el-option>
              <el-option label="体育与旅行" value="sports"></el-option>
              <el-option label="生活方式" value="life"></el-option>
              <el-option label="教育与招聘" value="education"></el-option>
              <el-option label="数码科技" value="tech"></el-option>
              <el-option label="金融" value="finance"></el-option>
              <el-option label="阅读" value="read"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站关键字" :label-width="formLabelWidth" prop="keyword">
            <el-input type="textarea" v-model="form.keyword" auto-complete="off" rows="3"></el-input>
          </el-form-item>
          <el-form-item label="网站描述" :label-width="formLabelWidth" prop="description">
            <el-input type="textarea" v-model="form.description" auto-complete="off" rows="4"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeAddSiteDialog" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmAddSite" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Site',
  data () {
    return {
      loading: false,
      dialogAddSiteVisible: false,
      formLabelWidth: '100px',
      form: {
        caption: '新增网站',
        _id: -1,
        title: '',
        icon: '',
        url: '',
        type: [],
        keyword: '',
        description: '',
        source: 'checkson',
        fileList: []
      },
      rules: {
        title: [{ required: true, message: '请输入网站的名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入网站的地址', trigger: 'blur' }],
        icon: [{ required: true, message: '请选择网站的图标', trigger: 'blur' }],
        type: [{ required: true, message: '请选择网站的分类', trigger: 'blur' }]
      },
      keyword: '',
      pagination: {
        page: 1,
        size: 25,
        total: 0
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
      let { page, size } = this.pagination
      let keyword = this.keyword
      let url = '/api/sites/get' + '?page=' + page + '&size=' + size + '&keyword=' + keyword
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
        this.pagination.total = data.total
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    handleAddSite () {
      this.form.caption = '新增网站'
      this.form._id = -1
      this.form.title = ''
      this.form.type = []
      this.form.url = ''
      this.form.keyword = ''
      this.form.description = ''
      this.form.source = 'checkson'
      this.form.icon = ''
      this.form.fileList = []
      this.dialogAddSiteVisible = true
    },
    handleResetForm () {
      this.$refs['form'].resetFields()
      this.$refs['upload'].clearFiles()
    },
    closeAddSiteDialog () {
      this.dialogAddSiteVisible = false
    },
    handleChangeIcon (file, fileList) {
      this.form.icon = file.raw
    },
    handleRemoveIcon (file, fileList) {
      this.form.icon = ''
    },
    confirmAddSite () {
      this.$refs['form'].validate((valid) => {
        if (!valid) return false
        let formData = new FormData()
        formData.append('_id', this.form._id)
        formData.append('title', this.form.title)
        formData.append('url', this.form.url)
        formData.append('type', this.form.type)
        formData.append('keyword', this.form.keyword)
        formData.append('description', this.form.description)
        formData.append('source', this.form.source)

        if (this.form._id === -1) { // 新增
          formData.append('icon', this.form.icon)
        } else { // 编辑
          if (this.form.icon !== 'editing') {
            formData.append('icon', this.form.icon)
          }
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post('/api/sites/add', formData, config).then((res) => {
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
          message: '保存网站成功!'
        })
        this.closeAddSiteDialog()
        this.initData()
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    handleEdit (index, row) {
      this.form.caption = '编辑网站信息'
      this.form._id = row._id
      this.form.title = row.title
      this.form.type = row.type
      this.form.url = row.url
      this.form.keyword = row.keyword
      this.form.description = row.description
      this.form.source = row.source
      this.form.icon = 'editing'
      this.form.fileList = [{name: row.imagename, url: row.src}]
      this.dialogAddSiteVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('你确定删除这条记录吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = '/api/sites/delete/' + row._id
        this.$http.get(url).then((res) => {
          let result = res.data
          let status = result.status
          let message = result.message
          if (status === 200 && message === 'ok') {
            this.$message({
              type: 'success',
              message: '删除网站成功!'
            })
            this.initData()
          } else {
            this.$message({
              type: 'error',
              message: message
            })
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '网络出错或服务器出错！'
          })
          console.error(err)
        })
      }).catch(() => {
        // pass
      })
    },
    handleSearch () {
      this.initData()
    },
    handleSizeChange (size) {
      this.pagination.size = size
      this.initData()
    },
    handlePageChange (page) {
      this.pagination.page = page
      this.initData()
    },
    init () {
      this.CURRENT_SIDEBAR_NAV_INDEX(0)
      this.initData()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
  .site {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-bottom: 0;
  }
  .site-inner {
    width: 100%;
    height: 100%;
  }
  .site-toolbar {
    padding-bottom: 10px;
  }
  .site-toolbar:before, .site-toolbar:after {
    content: '';
    display: table;
    clear: both;
  }
  .site-toolbar .toolbar-left {
    display: inline-block;
    float: left;
  }
  .site-toolbar .toolbar-right {
    float: right;
  }
  .site-toolbar .toolbar-right .search-input {
    width: 200px;
    display: inline-block;
  }
  .site-table {
    height: calc(100% - 92px);
  }
  .site-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .site .el-table .cell {
    white-space: nowrap;
  }
  .site .el-dialog__body {
    padding-top: 15px;
    padding-bottom: 0;
  }
</style>
