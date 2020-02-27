$(function() {
  $hamburger = $(".hamburger")
  $mobileMenu = $(".nav-bar")

  let menuOpen = false

  $hamburger.on("click", function() {
    $mobileMenu.slideToggle({ direction: "right" })
    // $mobileMenu.toggle("slide")
    // $mobileMenu.hide("slide", { direction: "left" }, 1000)

    console.log("clicked")
  })
})
