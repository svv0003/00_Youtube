$(document).ready(function () {
    $('.link-btn').on('click', function () {
        const link = $(this).find('a').attr('href');
        if (link) {
            window.location.href = link;
        }
    });
});


const homeBtn = document.querySelector(".home-btn img");

homeBtn.addEventListener("mouseover", () => {
  homeBtn.src = "../img/home(2).svg";
});

homeBtn.addEventListener("mouseout", () => {
  homeBtn.src = "../img/home(1).svg";
});