window.speechSynthesis.getVoices()
document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.keyCode === 88) {
        e.preventDefault();
        var utterance = window.getSelection().toString();
        chrome.extension.sendRequest(utterance);
    }
});
