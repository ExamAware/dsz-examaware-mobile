// Utilities
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('app', {
  state: () => ({
    examName: '考试名称',
    appHeader: '考试看板 Mobile',
    message: '考试提醒信息',
    room: ' ',
    examInfos: [],
  }),
  persist: true,
})
