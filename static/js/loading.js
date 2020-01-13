$(document).on('DOMContentLoaded', () => {
  $('.container-fluid').hide()
})

$(window).on('load', () => {
  $('.container-fluid').fadeIn(1500)
})
