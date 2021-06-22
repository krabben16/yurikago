import { provide } from '@nuxtjs/composition-api'
import useArticles, { ArticlesStoreKey } from '~/compositions/useArticles'

const setup = () => {
  const store = useArticles()
  provide(ArticlesStoreKey, store)
}

export default setup
