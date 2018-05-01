import Vue from 'vue'
import axios from 'axios'

const vueProto = Vue.prototype

vueProto.$http = axios
