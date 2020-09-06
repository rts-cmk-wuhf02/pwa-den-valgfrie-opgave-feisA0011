const button = document.querySelector('.button');
const inputValue = document.querySelector('.input-value')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const desc = document.querySelector('.desc')
const weatherIcon = document.querySelector('.weather-icon')
console.log(city)


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
}
window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'a    ppinstalled', event);
});

button.addEventListener('click', () => {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&units=metric&appid=e14cef68b134a4e85532a870af5f0d2e')
        .then(res => res.json())
        .catch(err => {
            console.log(err, 'err in call')
        })
        .then(data => {
            console.log(data)
            city.innerHTML = data['name']
            temp.innerHTML = data['main']['temp'].toFixed(1) + '°'
            desc.innerHTML = data['weather'][0]['description']
            weatherIcon.src = `http://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`
        })
})




