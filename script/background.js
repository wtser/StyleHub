let styles = [];

let getSyncFile = function() {
  return new Promise(function(reslove, reject) {
    chrome.storage.sync.get("stylehubfile", function(content) {
      reslove(content.stylehubfile);
    });
  });
};

function render() {
  getSyncFile().then(function(syncStyle) {
    if (syncStyle) {
      styles = syncStyle;
    }

    let html = styles.reduce(function(memo, item, i) {
      let patternStr = item.pattern.toString();
      return (
        memo +
        `<li class="style-item" data-index="${i}">
          <input class="style-pattern" value="${patternStr}">
          <textarea class="style-text" name="" id="" cols="30" rows="6">${
            item.styleText
          }</textarea>
          <button class="style-del" >del</button>
      </li>`
      );
    }, "");
    let addHtml = `<li class="style-item-add">
          <input id="StylePattern" class="style-pattern" placeholder="style pattern">
          <textarea id="StyleText" class="style-text" name="" id="" cols="30" rows="10" placeholder="style text"></textarea>
          <button id="StyleAdd">Add</button>
      </li>`;

    document.querySelector("ul").innerHTML = html + addHtml;
  });
}

window.addEventListener(
  "load",
  function() {
    render();

    document.body.addEventListener("click", function(event) {
      if (event.target.className == "style-del") {
        let index = event.target.closest("li").dataset.index;
        styles.splice(index, 1);
        chrome.storage.sync.set({ stylehubfile: styles });
        render();
      }
      if (event.target.id == "StyleAdd") {
        let item = {
          pattern: document.querySelector("#StylePattern").value,
          styleText: document.querySelector("#StyleText").value
        };
        console.log(item);
        styles.push(item);
        chrome.storage.sync.set({ stylehubfile: styles });
        render();
      }
    });

    document.body.addEventListener("keyup", function(event) {
      if (
        event.target.className == "style-pattern" ||
        event.target.className == "style-text"
      ) {
          let $li = event.target.closest("li");
        let index = $li.dataset.index || -1;
        if (index != -1 && styles[index]) {
          styles[index] = {
            pattern: $li.querySelector(".style-pattern").value,
            styleText: $li.querySelector(".style-text").value
          };
          chrome.storage.sync.set({ stylehubfile: styles });
        }
      }
    });
  },
  false
);
