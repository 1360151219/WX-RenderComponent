// component/renderHoleid.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: '# 无敌最强最坚 \n## 无敌最强最坚\n### 无敌最强最坚\n#### 无敌最强最坚\n##### 无敌最强最坚\n###### 无敌最强最坚\n - 我是无敌的\n    - 我是无敌的\n跳转#50000是这也的\n测试'
    }
  },
  lifetimes: {
    attached() {
      this.renderMd()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    contentArr: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toHole(e) {
      console.log(e)
    },
    renderMd() {
      let input = this.data.content
      let contentArr = this.data.contentArr
      if(!input.length) return 
      let flag=false
      let start = 0
      for (let i of input.matchAll(/^# (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH1: true })
        start += i[0].length
        input = input.slice(start)
      }
      start = 0
      for (let i of input.matchAll(/^## (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH2: true })
        start += i[0].length
        input = input.slice(start)
      }
      start = 0
      for (let i of input.matchAll(/^### (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH3: true })
        start += i[0].length
        input = input.slice(start)
      }  
      start = 0
      for (let i of input.matchAll(/^#### (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH4: true })
        start += i[0].length
        input = input.slice(start)
      }  
      start = 0
      for (let i of input.matchAll(/^##### (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH5: true })
        start += i[0].length
        input = input.slice(start)
      }  
      start = 0
      for (let i of input.matchAll(/^###### (.*\n?)/g)) {
        flag=true
        contentArr.push({ val: i[1], isH6: true })
        start += i[0].length
        input = input.slice(start)
      }
      // 下面是列表了
      start = 0
      for (let i of input.matchAll(/^([\s]*)- (.*\n?)/g)) {
        flag=true
        contentArr.push({ val1: i[1],val2:i[2], isLi: true })
        start += i[0].length
        input = input.slice(start)
      }
      if(!flag) {
        for(let i of input.matchAll(/(#[\d]+)(.*\n?)/g)){
          console.log(i)
          console.log(start)
          const idx=i.index
          contentArr.push({val:input.slice(start,idx),isHoleId:false})
          contentArr.push({val:input.slice(idx,idx+i[1].length),isHoleId:true,holeId:input.slice(idx+1,idx+i[1].length)})
          contentArr.push({val:input.slice(idx+i[1].length,idx+i[0].length),isHoleId:false})
          start+=idx+i[0].length
          input = input.slice(start)
        }
        contentArr.push({ val: input})
        input=''
      }
      // console.log(contentArr)
  
      this.setData({
        contentArr,
        content:input
      })
      this.renderMd()
    }
  }

})
