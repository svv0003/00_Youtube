$(document).ready(function () {
    $('.link-btn').on('click', function () {
        const link = $(this).find('a').attr('href');
        if (link) {
            window.location.href = link;
        }
    });
});