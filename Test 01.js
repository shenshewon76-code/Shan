(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        .live-mode-active { color: #27ae60 !important; font-weight: bold !important; }
        .icon-live-fix { filter: hue-rotate(110deg) brightness(1.2) contrast(1.1) !important; }
        .leaderboard__item, .table__row { border-left: 2px solid #27ae60 !important; }
    `;
    document.head.appendChild(style);

    function coreEngine() {
        // 1. Text Replacement
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.parentElement && !node.parentElement.closest('canvas, .chart-container')) {
                let val = node.nodeValue;
                if (/Demo|Practice/i.test(val)) {
                    node.nodeValue = val.replace(/Demo/gi, 'Live').replace(/Practice/gi, 'Real');
                    node.parentElement.classList.add('live-mode-active');
                }
            }
        }

        // 2. Leaderboard, Balance & Sidebar Fix
        const uiElements = document.querySelectorAll('.leaderboard__item, .sidebar__item, .account-status, .user-balance, .table__cell');
        uiElements.forEach(el => {
            if (el.innerHTML.includes('Demo')) {
                el.innerHTML = el.innerHTML.replace(/Demo/gi, 'Live');
            }
        });

        // 3. Icons & Images Fix
        document.querySelectorAll('img, svg, i').forEach(icon => {
            const html = icon.outerHTML.toLowerCase();
            if (html.includes('demo') || html.includes('practice')) {
                icon.classList.add('icon-live-fix');
            }
        });
    }

    // High speed update for real-time leaderboard
    setInterval(coreEngine, 500);
    coreEngine();
})();
