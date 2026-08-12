// ============================================================
// Shared responsive sidebar navigation
// Works on every page (index, about, services, viewbooking, contact).
// The hamburger (#toggleBtn) already exists in each .navBar; this wires
// it up to slide the #sideBar in/out with an overlay.
// ============================================================
(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    ready(function () {
        const toggleBtn = document.getElementById('toggleBtn');
        const sideBar = document.getElementById('sideBar');
        const overlay = document.getElementById('sideBarOverlay');
        const closeBtn = document.getElementById('closeSidebarBtn');

        function openSidebar() {
            if (sideBar) sideBar.classList.add('open');
            if (overlay) overlay.classList.add('open');
            document.body.classList.add('noScroll');
        }

        function closeSidebar() {
            if (sideBar) sideBar.classList.remove('open');
            if (overlay) overlay.classList.remove('open');
            document.body.classList.remove('noScroll');
        }

        if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        // Close the sidebar after tapping any of its links.
        if (sideBar) {
            sideBar.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeSidebar);
            });
        }

        // If the window is enlarged back to desktop, make sure the
        // sidebar/overlay are reset.
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) closeSidebar();
        });
    });
})();
