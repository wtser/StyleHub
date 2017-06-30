let getLocalFile = function () {
    return new Promise(function (reslove, reject) {
        chrome.storage.local.get('stylehubfile', function (content) {
            if (!content.hasOwnProperty('length')) {
                content = null;
            }
            reslove(content);
        })
    })
}

getLocalFile().then(function (localStyle) {

    if (localStyle) {
    } else {
        chrome.storage.local.set({stylehubfile: initStyle})
    }
    let usingStyle = localStyle || initStyle;

    let styleApply = function (styleText) {
        let $style = document.createElement('style');
        $style.type = 'text/css';

        $style.appendChild(document.createTextNode(styleText));
        //$style.styleSheet.cssText = styleText;
        document.head.appendChild($style)

    }

    usingStyle.forEach(function (styleItem) {
        let isUrlMatch = location.href.match(styleItem.pattern)
        if (isUrlMatch) {
            styleApply(styleItem.styleText)
            if (styleItem.scriptText) {
                eval(styleItem.scriptText)
            }
        }
    })
})



