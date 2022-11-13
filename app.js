const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    // console.log(event.code)
    // let test = event.code == 'Space' ? console.log('ПРОБЕЛ') : 1 // при нажатии пробела пишет надпись в консоль
    if (event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})


document.addEventListener('click', event =>{
    const type = event.target.dataset.type //задали всем кнопкам дата тип. Получаем тип объекта, на который мы нажали 

    if (type === 'lock') {
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0] // чтобы даже если случилось нажатие на кнопку, все равно поменять иконку
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')

        }
    else if (type === 'copy') {
        copyColor(event.target.textContent)
    }

})


function copyColor(text){
    return navigator.clipboard.writeText(text)
}


function generateRandomColor(){
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i<6; i++){
        color += hexCodes[Math.floor(Math.random()* hexCodes.length)]
    }
    return '#' + color
} //генерирует случайный hexCode цвета (случайный цвет)





function setRandomColors(isInitial){
    const colors = isInitial ? getColorsFromHash() : []
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        // console.log(col) //поочерёдно выводим название колонок
        const text = col.querySelector('h2')
        const button = col.querySelector('button')




        if (isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()

        if (!isInitial){
            colors.push(color)
        }

        // const color = generateRandomColor()
        text.textContent = color
        col.style.background = color
        setTextColor(text, color)
        setTextColor(button, color)
        
    })
    hashColors(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'


}
function hashColors(colors = []){
    document.location.hash = colors
        .map((col) => {
            return col.toString().substring(1)
        })
        .join('-')
}


function getColorsFromHash() {
    if (document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}


setRandomColors(true)