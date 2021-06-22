import { IContentDocument } from '@nuxt/content/types/content'
import { InjectionKey, reactive, toRefs, useAsync, useContext } from '@nuxtjs/composition-api'

interface IState {
  articles: IContentDocument[]
}

const useArticles = () => {  
  const { $content } = useContext()

  const state = reactive<IState>({
    articles: [],
  })

  // @ts-ignore
  state.articles = useAsync(async () => {
    const data = await $content()
      .only(['id', 'title', 'date', 'description'])
      .sortBy('id', 'desc')
      .fetch()
    return Array.isArray(data) ? data : [data]
  })

  return {
    ...toRefs(state),
  }
}

export type ArticlesStoreType = ReturnType<typeof useArticles>
export const ArticlesStoreKey: InjectionKey<ArticlesStoreType> = Symbol('ArticlesStore')
export default useArticles
