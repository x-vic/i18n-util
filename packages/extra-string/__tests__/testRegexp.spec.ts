import { replace$t } from '../src/index';

describe('测试正则替换的功效', () => {
  it('替换 $t 中的内容', () => {
    expect(replace$t(
`<template>
  <div id="app">
    {{ haha }}
    {{$t("标签中文")}}
    {{$t("标签中文1")}}
    {{$t('标签中文2')}}
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      haha: this.$t('中文'),
      hehe: this.$t('english')
    }
  }
}
</script>`,
      (origin, target) => origin.replace(target, `##${target}##`)
    )).toEqual(
`<template>
  <div id="app">
    {{ haha }}
    {{$t("##标签中文##")}}
    {{$t("##标签中文1##")}}
    {{$t('##标签中文2##')}}
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      haha: this.$t('##中文##'),
      hehe: this.$t('english')
    }
  }
}
</script>`
)
  })
})