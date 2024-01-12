window.addEventListener('DOMContentLoaded', function() {
    let aElement = document.querySelectorAll('a')

    function updateTextContent() {
        if (window.innerWidth < 1000 && window.innerWidth >= 675) {
            aElement[0].innerHTML = 'Overview'
            aElement[1].innerHTML = 'BMI Explanation'
        }
        else if (window.innerWidth < 675) {
            aElement[0].innerHTML = '<span class="material-symbols-outlined">dashboard</span>'
            aElement[1].innerHTML = '<span class="material-symbols-outlined">inventory_2</span>'
        } else {
            aElement[0].innerHTML = '<span class="material-symbols-outlined">dashboard</span>Áttekintés'
            aElement[1].innerHTML = '<span class="material-symbols-outlined">inventory_2</span>BMI táblázat'
        }
    }
    updateTextContent()

    window.addEventListener('resize', updateTextContent)
});

function changePage(event) {
    switch(event.target.id) {
        case 'overview':
            document.getElementById('overview').classList.add('active')
            document.getElementById('BMIex').classList.remove('active')
            document.querySelector('.overview').style.display = 'block'
            document.querySelector('.bmi-container').style.display = 'none'
            break
        case 'BMIex':
            document.getElementById('overview').classList.remove('active')
            document.getElementById('BMIex').classList.add('active')
            document.querySelector('.overview').style.display = 'none'
            document.querySelector('.bmi-container').style.display = 'block'
            break
    }
}

const bmiValues = [
    {category : 'underweight', min : 0, max : 18.5, emoji : '💀'},
    {category : 'normal', min : 18.5, max : 25, emoji : '✅'},
    {category : 'overweight', min : 25, max : 30, emoji : '🥓'},
    {category : 'obese', min : 30, max : 35, emoji : '🍖'},
    {category : 'extremely obese', min : 35, max : 300, emoji : '🆘'} //More than the highest BMI ever recorded.
]

function calc() {
    let weight = +document.getElementById('weight').value
    let height = (+document.getElementById('height').value / 100) ** 2

    if (!weight || !height || height <= 0 || weight <= 0) return

    let bmi = weight / height
    let category = bmiValues.find(obj => obj.min <= bmi && obj.max > bmi)
    if (!category) return

    document.getElementById('log-con').innerHTML = `
    <div class="log-data"><span>Kategória:<br>${category.category}</span></div>
    <div class="log-data"><span>Body Mass Index:<br>${Math.round(bmi * 100) / 100}</span></div>
    <div class="log-data"><span>${category.emoji}</span></div>`
}