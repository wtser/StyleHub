let db = function () {
    
}

let styleApply = function (styleText) {
    let $style = document.createElement('style');
    $style.type = 'text/css';

    $style.appendChild(document.createTextNode(styleText));
    //$style.styleSheet.cssText = styleText;
    document.head.appendChild($style)

}

stylesheet.forEach(function (styleItem) {
    let isUrlMatch = location.href.match(styleItem.pattern)
    if (isUrlMatch) {
        styleApply(styleItem.styleText)
        if(styleItem.scriptText){
            eval(styleItem.scriptText)
        }
    }
})