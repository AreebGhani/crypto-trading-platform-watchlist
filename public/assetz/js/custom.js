document.addEventListener("DOMContentLoaded", function () {
  document.onkeydown = function (e) {
    if (e.keyCode === 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
      return false;
    }
  };
  const links = document.querySelectorAll(".section-link");
  if (links.length > 0) {
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Adjust offset for header height if needed
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
});
