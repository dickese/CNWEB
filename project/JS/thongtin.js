const currentHash = window.location.hash;
const sidebarLinks = document.querySelectorAll('.linkxxx');

sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === `Thongtin.html${currentHash}`) {
        link.classList.add('active');
    }
});

const links = document.querySelectorAll('.linkxxx');

links.forEach(function (link) {
    link.addEventListener('click', function () {
        links.forEach(function (link) {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});