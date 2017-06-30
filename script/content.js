// let getLocalFile = function () {
//     return new Promise(function (reslove, reject) {
//         chrome.storage.local.get('stylehubfile', function (content) {
//             if (!content.hasOwnProperty('length')) {
//                 content = null;
//             }
//             reslove(content);
//         })
//     })
// };

let getSyncFile = function () {
    return new Promise(function (reslove, reject) {
        chrome.storage.sync.get('stylehubfile', function (content) {
            reslove(content.stylehubfile);
        })
    })
};

getSyncFile().then(function (syncStyle) {
    if (syncStyle) {
        console.log(syncStyle)

    } else {
        chrome.storage.sync.set({stylehubfile: initStyle});
    }
    let usingStyle = syncStyle || initStyle;

    let styleApply = function (styleText) {
        let $style = document.createElement('style');
        $style.type = 'text/css';

        $style.appendChild(document.createTextNode(styleText));
        //$style.styleSheet.cssText = styleText;
        document.head.appendChild($style)

    };

    usingStyle.forEach(function (styleItem) {
        let isUrlMatch = (new RegExp(styleItem.pattern)).test(location.href);
        if (isUrlMatch) {
            styleApply(styleItem.styleText);
            if (styleItem.scriptText) {
                eval(styleItem.scriptText)
            }
        }
    })
});



