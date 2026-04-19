(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        .live-active { color: #27ae60 !important; font-weight: bold !important; }
        .icon-fix { filter: hue-rotate(110deg) brightness(1.2) contrast(1.1) !important; }
    `;
    document.head.appendChild(style);

    const updateUI = (node) => {
        if (node.nodeType === 3) {
            if (/Demo|Practice/i.test(node.nodeValue)) {
                node.nodeValue = node.nodeValue.replace(/Demo/gi, 'Live').replace(/Practice/gi, 'Real');
            }
        } else if (node.nodeType === 1) {
            if (node.tagName === 'CANVAS' || node.classList.contains('chart-container')) return;
            
            if (node.innerHTML && (node.innerHTML.includes('Demo') || node.innerHTML.includes('Practice'))) {
                if (node.children.length === 0) {
                    node.innerHTML = node.innerHTML.replace(/Demo/gi, 'Live').replace(/Practice/gi, 'Real');
                }
            }
            
            if (['IMG', 'SVG', 'I'].includes(node.tagName)) {
                if (node.outerHTML.toLowerCase().includes('demo')) node.classList.add('icon-fix');
            }
            node.childNodes.forEach(updateUI);
        }
    };

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            m.addedNodes.forEach(updateUI);
            if (m.type === 'characterData') updateUI(m.target);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    updateUI(document.body);
})();
