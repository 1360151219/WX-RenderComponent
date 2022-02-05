// component/renderHoleid.js
const App = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: '# 无敌最强最坚 \n ## 无敌最强最坚 \n ### 无敌最强最坚\n gggg\n#### 无敌最强最坚\n ##### 无敌最强最坚\n ###### 无敌最强最坚\n - 我是无敌的\n    跳转#50000是这也的\n测试 \n**加粗**表*格* \n- 我是无敌的2\n*我是斜体*噢\n~~哈哈~~'
    },
    isReply:{
      type:Boolean,
      value:false
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
      // console.log(e)
    },
    renderMd() {
      const input = this.data.content
      const inputParagraph = input.split('\n')
      let contentArr = this.data.contentArr
      for (let paragraph of inputParagraph) {
        const md=(paragraph.includes('# ') && paragraph.includes('- '))||(paragraph.includes('~~')&&!paragraph.match(/#[\d]*/))||(this.data.isReply&&!paragraph.match(/#[\d]*/))
        if(md){
          contentArr.push({val:App.markdown(paragraph),isMd:true})
          this.setData({
            contentArr,
          })
          continue
        }
        
        const text = paragraph.includes('# ') || paragraph.includes('- ')
        if (!text) {
         this.renderText(contentArr, paragraph)
        }
        const h1 = paragraph.match(/^[\s]*# (.*)/)
        if (h1) {
          const renderH1 = h1[1]
          contentArr.push({ val: renderH1, isH1: true })
        }
        const h2 = paragraph.match(/^[\s]*## (.*)/)
        if (h2) {
          // console.log(h2)
          const renderH2 = h2[1]
          contentArr.push({ val: renderH2, isH2: true })
        }
        const h3 = paragraph.match(/^[\s]*### (.*)/)
        if (h3) {
          // console.log(h3)
          const renderH3 = h3[1]
          contentArr.push({ val: renderH3, isH3: true })
        }
        const h4 = paragraph.match(/^[\s]*#### (.*)/)
        if (h4) {
          // console.log(h4)
          const renderH4 = h4[1]
          contentArr.push({ val: renderH4, isH4: true })
        }
        const h5 = paragraph.match(/^[\s]*##### (.*)/)
        if (h5) {
          // console.log(h5)
          const renderH5 = h5[1]
          contentArr.push({ val: renderH5, isH5: true })
        }
        const h6 = paragraph.match(/^[\s]*###### (.*)/)
        if (h6) {
          // console.log(h6)
          const renderH6 = h6[1]
          contentArr.push({ val: renderH6, isH6: true })
        }
        const li=paragraph.match(/^([\s]*)- (.*)/)
        if(li){
          console.log(li)
          const renderLi = li[2]
          contentArr.push({ val1:li[1],val2: renderLi, isLi: true })
        }
        this.setData({
          contentArr,
        })
      }
    },
    renderText(contentArr, text) {
      // console.log(text)
      let flag = false
      if (!text.includes('*') && !text.includes('#')) {
        contentArr.push({ val: text })
      }
      let idText=text.split(/(#[\d]+)/)
      if(idText.length>1&&!flag){
        let idItem=[]
        for(let i =0;i<idText.length;i++){
          if(i&1){
            idItem.push({val:idText[i],isHoleId:true,holeId:idText[i].slice(1)})
          }else{
            idItem.push({val:idText[i],isHoleId:false})
          }
        }
        contentArr.push({idItem})
      }
      // 先判断加粗 其中加粗中也会有斜体
      let bolds = text.split('**')
      if (bolds.length > 1 && !flag) {
        flag = true
        let boldItem = []
        for (let i = 0; i < bolds.length; i++) {
          const sinBold = bolds[i]
          let its = sinBold.split('*')
          if (its.length > 1) {
            let italicItem = []
            for (let j = 0; j < its.length; j++) {
              const it = its[j]
              if (j & 1) {
                italicItem.push({ val: it, isItalic: true })
              } else {
                italicItem.push({ val: it, isItalic: false })
              }
            }
            boldItem.push({ italicItem })
          } else {
            if (i & 1) {
              boldItem.push({ val: sinBold, isBold: true })
            } else {
              boldItem.push({ val: sinBold, isBold: false })
            }
          }

        }
        contentArr.push({ boldItem })
      }

      let italics = text.split('*')
      if (italics.length > 1 && !flag) {

        flag = true
        let italicItem = []
        for (let i = 0; i < italics.length; i++) {
          const it = italics[i]
          if (i & 1) {
            italicItem.push({ val: it, isItalic: true })
          } else {
            italicItem.push({ val: it, isItalic: false })
          }
        }
        contentArr.push({ italicItem })
      }
    }
    // renderMd() {
    //   let input = this.data.content
    //   let contentArr = this.data.contentArr
    //   if (!input.length) return
    //   let flag = false
    //   let start = 0
    //   
    //   // 下面是列表了
    //   start = 0
    //   for (let i of input.matchAll(/^([\s]*)- (.*\n?)/g)) {
    //     flag = true
    //     contentArr.push({ val1: i[1], val2: i[2], isLi: true })
    //     start += i[0].length
    //     input = input.slice(start)
    //   }
    //   if(input.match(/(.*\n)/)){
    //     flag = true
    //     const i=input.match(/(.*\n)/)
    //     const n=i[0].length
    //     console.log(i)
    //     contentArr.push({ val: input.slice(0,n), isHoleId: false })
    //     contentArr.push({ val: '', isHr: true })
    //     input=input.slice(n)
    //   }

    //   if (!flag) {
    //     let flag2 = false
    //     // 最后处理跳转树洞的渲染
    //     for (let i of input.matchAll(/(#[\d]+)(.*\n?)/g)) {
    //       flag2 = true
    //       const idx = i.index
    //       contentArr.push({ val: input.slice(start, idx), isHoleId: false })
    //       if(input.slice(0, idx).includes('\n')){
    //         contentArr.push({ val: '', isHr: true })
    //       }
    //       contentArr.push({ val: input.slice(idx, idx + i[1].length), isHoleId: true, holeId: input.slice(idx + 1, idx + i[1].length) })
    //       contentArr.push({ val: input.slice(idx + i[1].length, idx + i[0].length), isHoleId: false })
    //       if (i[2].includes('\n'))
    //         contentArr.push({ val: '', isHr: true })
    //       start += idx + i[0].length
    //       input = input.slice(start)
    //     }
    //     start = 0
    //     for (let i of input.matchAll(/(\*\*.*\*\*)(.*\n?)/g)) {
    //       flag2 = true
    //       const idx = i.index
    //       contentArr.push({ val: input.slice(0, idx), isHoleId: false })
    //       if(input.slice(0, idx).includes('\n')){
    //         contentArr.push({ val: '', isHr: true })
    //       }
    //       contentArr.push({ val: i[1].replaceAll('**',''), isBold: true, isHoleId: false })
    //       contentArr.push({ val: input.slice(idx + i[1].length,idx + i[0].length), isHoleId: false })
    //       if (i[2].includes('\n'))
    //         contentArr.push({ val: '', isHr: true })
    //       input = input.slice(idx + i[0].length)
    //     }
    //     start = 0
    //     for (let i of input.matchAll(/(\*.*\*)(.*\n?)/g)) {
    //       flag2 = true
    //       const idx = i.index
    //       contentArr.push({ val: input.slice(0, idx), isHoleId: false })
    //       if(input.slice(0, idx).includes('\n')){
    //         contentArr.push({ val: '', isHr: true })
    //       }
    //       contentArr.push({ val: i[1].replaceAll('*',''), isItalic: true, isHoleId: false })
    //       contentArr.push({ val: input.slice(idx + i[1].length,idx + i[0].length), isHoleId: false })
    //       if (i[2].includes('\n'))
    //         contentArr.push({ val: '', isHr: true })
    //       input = input.slice(idx + i[0].length)
    //     }

    //     if (!flag2) {
    //       contentArr.push({ val: input })
    //       input = ''
    //     }
    //     console.log(input)

    //   }
    //   // console.log(contentArr)

    //   this.setData({
    //     contentArr,
    //     content: input
    //   })
    //   this.renderMd()
    // }
  }

})
