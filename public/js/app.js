console.log('test js load');
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const searchForm = document.getElementById('weatherform')

//console.log(searchForm)
weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('searchstring').value;
    console.log(document.getElementById('searchstring').value);
    fetch('/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            document.getElementById('weathermessage').innerHTML = data.message
        })
    })

})