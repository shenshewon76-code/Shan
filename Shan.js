(function() {
    'use strict';

    function updateInterface() {
        const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let currentNode;

        while (currentNode = textNodes.nextNode()) {
            let val = currentNode.nodeValue;
            
            if (val.includes('Demo')) {
                currentNode.nodeValue = val.replace(/Demo/g, 'Live');
            }
            if (val.includes('DEMO')) {
                currentNode.nodeValue = val.replace(/DEMO/g, 'LIVE');
            }
            if (val.includes('Practice')) {
                currentNode.nodeValue = val.replace(/Practice/g, 'Real');
            }
        }
    }

    updateInterface();
    setInterval(updateInterface, 500);
})();
