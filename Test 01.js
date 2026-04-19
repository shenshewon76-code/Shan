(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        .live-mode-active { color: #27ae60 !important; font-weight: bold !important; }
        .icon-live-fix { filter: hue-rotate(110deg) brightness(1.2) !important; }
        .leaderboard-real { border-left: 3px solid #27ae60 !important; }
    `;
    document.head.appendChild(style);

    function processUI() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            let text = node.nodeValue;
            if (/Demo|DEMO|Practice/g.test(text)) {
                node.nodeValue = text.replace(/Demo/g, 'Live').replace(/DEMO/g, 'LIVE').replace(/Practice/g, 'Real');
                if (node.parentElement) node.parentElement.classList.add('live-mode-active');
            }
        }

        document.querySelectorAll('img, svg, i').forEach(icon => {
            const html = icon.outerHTML.toLowerCase();
            if (html.includes('demo') || html.includes('practice')) {
                icon.style.filter = "hue-rotate(110deg) brightness(1.2)";
            }
        });

        document.querySelectorAll('.leaderboard, .account-status, .ui-elements').forEach(el => {
            if (el.innerHTML.includes('Demo')) {
                el.innerHTML = el.innerHTML.replace(/Demo/g, 'Live');
                el.classList.add('leaderboard-real');
            }
        });
    }

    setInterval(processUI, 500);
    processUI();
})();
