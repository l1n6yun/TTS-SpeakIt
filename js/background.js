/**
 * 创建菜单
 */
chrome.contextMenus.removeAll();
chrome.contextMenus.create({"title": "朗读", "contexts": ["selection"], "onclick": speak});

/**
 * speak 方法
 * @param selection
 */
function speak(selection) {
    var utterance = selection.selectionText.toString()
    tts_speak(utterance)
}

/**
 * tts speak
 * @param utterance
 */
function tts_speak(utterance) {
    var options = JSON.parse(localStorage.getItem("options"));
    if (!options) {
        options = {
            'rate': 1,
            'pitch': 1,
            'volume': 1,
            'gender': 'male',
        };
        localStorage.setItem("options", JSON.stringify(options));
    }
    chrome.tts.speak(utterance,
        {
            rate: parseInt(options.rate),
            pitch: parseInt(options.pitch),
            volume: parseInt(options.volume),
            gender: options.gender
        }
    );
}

/**
 * 监听请求事件
 */
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    tts_speak(request)
});