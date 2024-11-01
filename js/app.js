const menuLinks = document.querySelectorAll(' .menu a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribte("href");
  return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop) {
  window.scrollTo({ top: distanceFromTheTop, behavior: "smooth" });
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  nativeScroll(distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});
