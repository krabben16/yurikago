export const state = () => ({
  breadcrumbItemList: null
})

export const mutations = {
  setBreadcrumbItemList (state, breadcrumbItemList) {
    state.breadcrumbItemList = breadcrumbItemList
  }
}

export const actions = {
  changeBreadcrumbItemList ({ commit }, breadcrumbItemList) {
    commit("setBreadcrumbItemList", breadcrumbItemList)
  }
}

export const getters = {
  breadcrumbItemList (state) {
    return state.breadcrumbItemList
  }
}
