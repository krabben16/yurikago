export const state = () => ({
  landingArticleID: null
})

export const mutations = {
  setLandingArticleID(state, landingArticleID) {
    state.landingArticleID = landingArticleID
  }
}

export const actions = {
  changeLandingArticleID({ commit }, landingArticleID) {
    commit("setLandingArticleID", landingArticleID)
  }
}

export const getters = {
  landingArticleID(state) {
    return state.landingArticleID
  }
}
