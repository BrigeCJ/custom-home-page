<template>
  <div class="wallpapers">
    <div class="wallpapers-header">
      <span class="wallpapers-caption ">壁纸库</span>
      <el-button type="text" style="float: right" @click="handleAdd">添加</el-button>
    </div>
    <div class="wallpapers-inner">
      <div class="container" @scroll="handleScroll" ref="container">
        <waterfall
          :align="align"
          :line-gap="200"
          :min-line-gap="100"
          :max-line-gap="220"
          :single-max-width="300"
          :watch="dataList"
          @reflowed="reflowed"
          ref="waterfall"
        >
          <!-- each component is wrapped by a waterfall slot -->
          <waterfall-slot
            v-for="(item, index) in dataList"
            :width="item.width"
            :height="item.height"
            :order="index"
            :key="item._id"
            move-class="item-move"
          >
            <div class="wallpapers-item">
              <img :src="item.src" :alt="item.name" class="wallpapers-img">
              <span class="wallpapers-item-actions">
                <span class="actions-list">
                  <i class="el-icon-zoom-in" @click="openImagePreviewDialog(item.src, item.name)"></i>
                  <i class="el-icon-delete" style="margin-left: 10px" @click="handleDeleteWallpaper"></i>
                </span>
              </span>
            </div>
          </waterfall-slot>
        </waterfall>
      </div>
    </div>
    <el-dialog title="添加壁纸" :visible.sync="dialogAddWallpapersVisible" @close="handleResetForm">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChangeWallpaper"
        :before-remove="handleRemoveWallpaper"
        list-type="picture-card"
        ref="upload"
        name="wallpapers"
        multiple
        :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__tip" slot="tip">建议上传jpg/png文件，且只能是图片文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddWallpapersDialog" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmAddWallpapers" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="caption" :visible.sync="imgPreviewDialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
  name: 'Wallpaper',
  components: {
    Waterfall,
    WaterfallSlot
  },
  data () {
    return {
      dialogAddWallpapersVisible: false,
      imgPreviewDialogVisible: false,
      pagination: {
        size: 50,
        page: 1
      },
      fileList: [],
      dataList: [],
      lastIndex: 0,
      align: 'center',
      noMore: false,
      isBusy: false,
      dialogImageUrl: '',
      caption: ''
    }
  },
  methods: {
    ...mapMutations([
      'CURRENT_SIDEBAR_NAV_INDEX'
    ]),
    reflowed () {
      this.isBusy = false
    },
    initData () {
      let { page, size } = this.pagination
      let url = '/api/wallpapers/get' + '?page=' + page + '&size=' + size
      this.$http.get(url).then((res) => {
        this.handleResponse(res)
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '网络出错或服务器出错！'
        })
        console.log(err)
      })
    },
    handleResponse (res) {
      let result = res.data
      let status = result.status
      let message = result.message
      let data = result.data
      if (status === 200 && message === 'ok') {
        if (data.row.length === 0) {
          this.noMore = true
          return
        }
        this.dataList.push.apply(this.dataList, this.generateRandomItems(data.row))
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    generateRandomItems (dataList) {
      for (let i = 0, len = dataList.length; i < len; i++) {
        dataList[i].width = 130 + ~~(Math.random() * 60)
        dataList[i].height = 90 + ~~(Math.random() * 30)
      }
      return dataList
    },
    handleResetForm () {
      this.$refs['upload'].clearFiles()
    },
    closeAddWallpapersDialog () {
      this.dialogAddWallpapersVisible = false
    },
    handleAdd () {
      this.dialogAddWallpapersVisible = true
    },
    confirmAddWallpapers () {
      if (this.fileList.length > 0) {
        let formData = new FormData()
        for (let i = 0, len = this.fileList.length; i < len; i++) {
          formData.append('wallpapers', this.fileList[i].raw)
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$http.post('/api/wallpapers/add', formData, config).then((res) => {
          this.handleAddResponse(res)
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '网络出错或服务器出错！'
          })
          console.error(err)
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要上传的壁纸'
        })
      }
    },
    handleAddResponse (res) {
      let result = res.data
      let status = result.status
      let message = result.message
      if (status === 200 && message === 'ok') {
        this.$message({
          type: 'success',
          message: '新增壁纸成功!'
        })
        this.closeAddWallpapersDialog()
        this.initData()
      } else {
        this.$message({
          type: 'error',
          message: message
        })
      }
    },
    handleChangeWallpaper (file, fileList) {
      this.fileList = fileList
    },
    handleRemoveWallpaper (file, fileList) {
      this.fileList = fileList
    },
    openImagePreviewDialog (src, name) {
      this.dialogImageUrl = src
      this.caption = name
      this.imgPreviewDialogVisible = true
    },
    handleDeleteWallpaper () {
      this.$confirm('你确定删除这张壁纸吗?', '警告', {
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
    throttle (callback, ms) {
      let args, _this
      return function () {
        if (args === void 0) {
          args = arguments
          _this = this
          setTimeout(function () {
            if (args.length === 1) {
              callback.call(_this, args[0])
            } else {
              callback.apply(_this, args)
            }
            args = void 0
          }, ms)
        }
      }
    },
    handleScroll () {
      this.throttle((() => {
        let oCountainer = this.$refs.container
        let winHeight = window.innerHeight
        let scrollTop = oCountainer.scrollTop
        let scrollHeight = oCountainer.scrollHeight
        if (scrollTop + winHeight >= scrollHeight) {
          if (!this.isBusy && !this.noMore) {
            this.isBusy = true
            this.pagination.page += 1
            this.initData()
          }
        }
      })(), 50)
    },
    init () {
      this.initData()
      this.CURRENT_SIDEBAR_NAV_INDEX(2)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style>
  .wallpapers {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
  }
  .wallpapers-header {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
  .wallpapers-caption {
    font-size: 14px;
    color: #999;
  }
  .wallpapers-inner {
    height: calc(100% - 40px);
    width: 100%;
    padding: 0 5px 5px;
  }
  .wallpapers-inner .container {
    position: relative;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    border: 1px solid #ebebeb;
    padding: 5px;
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .wallpapers-item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
  }
  .wallpapers-item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.4);
    transition: opacity .3s;
  }
  .wallpapers-item-actions:hover {
    opacity: 1;
  }
  .wallpapers-item-actions:hover .actions-list{
   display: inline-block;
  }
  .actions-list {
    display: none;
  }
  .actions-list i {
    cursor: pointer;
  }
  .wallpapers-img {
    width: 100%;
    height: 100%;
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
  .wallpapers-inner .container::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  .wallpapers-inner .container::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.2);
  }
  .wallpapers .el-dialog__body {
    padding-top: 15px;
    padding-bottom: 0;
  }
</style>
