let getSyncFile = function() {
    return new Promise(function(reslove, reject) {
        chrome.storage.sync.get("stylehubfile", function(content) {
            reslove(content.stylehubfile);
        });
    });
};

getSyncFile().then(function(syncStyle) {
    if (syncStyle) {
    } else {
        syncStyle = [];
    }

    let html = syncStyle.reduce(function(memo, item, i) {
        let patternStr = item.pattern.toString();
        return (
            memo +
            `<li class="style-item">
    <input class="style-pattern" value="${patternStr}">
    <textarea class="style-text" name="" id="" cols="30" rows="4">${item.styleText}</textarea>
    <button class="style-del" data-index="${i}">del</button>
</li>`
        );
    }, "");
    let addHtml = `<li class="style-item-add">
    <input id="StylePattern" class="style-pattern" placeholder="style pattern">
    <textarea id="StyleText" class="style-text" name="" id="" cols="30" rows="10" placeholder="style text"></textarea>
    <button id="StyleAdd">Add</button>
</li>`;
    let $html = document.createElement("ol");
    $html.innerHTML = html + addHtml;
    document.querySelector("body").appendChild($html);

    document
        .querySelector("#StyleAdd")
        .addEventListener("click", function(event) {
            let item = {
                pattern: document.querySelector("#StylePattern").value,
                styleText: document.querySelector("#StyleText").value
            };
            console.log(item);
            syncStyle.push(item);
            chrome.storage.sync.set({ stylehubfile: syncStyle });
        });

    document.querySelectorAll(".style-del").forEach(function($style) {
        $style.addEventListener("click", function(event) {
            let index = event.target.dataset.index;
            syncStyle.splice(index, 1);
            chrome.storage.sync.set({ stylehubfile: syncStyle });
        });
    });
});
