
const {createApp, ref, reactive, onMounted} = Vue
const app = Vue.createApp({
    setup() {
        window.speechSynthesis.getVoices()

        const form = reactive({
            rate: 1,
            pitch: 1,
            volume: 100,
            voice: 0,
            gender: 'male',
            test: "这是一段测试语音"
        })
        const voices = ref([]);

        const onSubmit = () => {
            localStorage.setItem("options", JSON.stringify(form));
            ElementPlus.ElMessage({
                message: '保存成功！',
                type: 'success',
            })
        }

        const test = () => {
            const speechInstance = new window.SpeechSynthesisUtterance(form.test);
            speechInstance.rate = form.rate;
            speechInstance.pitch = form.pitch;
            speechInstance.volume = form.volume / 100;
            speechInstance.voice = voices.value[form.voice];
            speechInstance.gender = form.gender;
            window.speechSynthesis.speak(speechInstance);
        }

        onMounted(() => {
            setTimeout(() => {
                voices.value = window.speechSynthesis.getVoices()
                const options = JSON.parse(localStorage.getItem("options"));
                if (options) {
                    Object.assign(form, options);
                }
            })
        })

        return {
            form,
            voices,
            onSubmit,
            test
        }
    }
})
app.use(ElementPlus);
app.mount('#app');
