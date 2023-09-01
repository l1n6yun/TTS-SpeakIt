$(function() {
    var options = JSON.parse(localStorage.getItem("options"));
    if (!options) {
        options = {
            'rate': 1,
            'pitch': 1,
            'volume': 1,
            'gender': 'male',
            'voiceName': 'Microsoft Huihui - Chinese (Simplified, PRC)',
        };
        localStorage.setItem("options", JSON.stringify(options));
    }
    $('#rate').slider({
        value: options.rate,
        formatter: function(value) {
            return value;
        }
    });
    $('#pitch').slider({
        value: options.pitch,
        formatter: function(value) {
            return value;
        }
    });
    $('#volume').slider({
        value: options.volume,
        formatter: function(value) {
            return value;
        }
    });
    $('#gender').val(options.gender);
    $('#voiceName').val(options.voiceName);
    $("#submit").click(function() {
        var options = {};
        var t = $('form').serializeArray();
        $.each(t, function() {
            options[this.name] = this.value;
        });
        localStorage.setItem("options", JSON.stringify(options));
        return false;
    });
    $("#subtest").click(function() {
        var options = {};
        var t = $('form').serializeArray();
        $.each(t, function() {
            options[this.name] = this.value;
        });
        var utterance = $("#test").val();
        chrome.tts.speak(utterance, {
            rate: parseFloat(options.rate),
            pitch: parseFloat(options.pitch),
            volume: parseFloat(options.volume),
            gender: options.gender,
            voiceName: options.voiceName
        });
        return false;
    });
});