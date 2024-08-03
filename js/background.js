/**
 * 创建菜单
 */
chrome.contextMenus.removeAll();
chrome.contextMenus.create({
    "title": "朗读",
    "contexts": ["selection"],
    "onclick": speak
});
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
	window.speechSynthesis.cancel()
    const speechInstance = new window.SpeechSynthesisUtterance(utterance);
    const voices = window.speechSynthesis.getVoices()
    let options = JSON.parse(localStorage.getItem("options"));
    if (!options) {
        options = {
            rate: 1,
            pitch: 1,
            volume: 100,
            voice: 0,
            gender: 'male',
            test: "这是一段测试语音"
        };
        localStorage.setItem("options", JSON.stringify(options));
    }
    speechInstance.rate = options.rate;
    speechInstance.pitch = options.pitch;
    speechInstance.volume = options.volume/100;
    speechInstance.voice = voices[options.voice];
    speechInstance.gender = options.gender;
    window.speechSynthesis.speak(speechInstance);
}
/**
 * 监听请求事件
 */
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    tts_speak(request)
});
