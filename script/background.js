let getSyncFile = function () {
    return new Promise(function (reslove, reject) {
        chrome.storage.sync.get('stylehubfile', function (content) {
            reslove(content.stylehubfile);
        })
    })
};

getSyncFile().then(function (syncStyle) {
    if (syncStyle) {

    } else {
        syncStyle = []
    }

    let html = syncStyle.reduce(function (memo, item, i) {
        //console.log(item)
        let patternStr = item.pattern.toString()
        return memo +  `<li>
    <input class="style-pattern" type="text" value="${patternStr}">
    <textarea class="style-text" name="" id="" cols="30" rows="10">${item.styleText}</textarea>
</li>`
    }, '')
    let $html = document.createElement('ol');
    $html.innerHTML = html;
    document.querySelector('body').appendChild($html)




});



