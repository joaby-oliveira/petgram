const form = document.querySelector('form')

const display = document.querySelector('.display')

const listFiles = () => {
  fetch('http://localhost:4000/image').then(response => response.json()).then(res => {
    console.log(res)
    display.innerHTML = "<hr><h1>Files</h1><br>"
    for (const file of res.Contents) {
      display.innerHTML += "<br>" + file.Key
    }
  })
}
  
display.innerText = "Loading"
listFiles()

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData()
  data.append('image', event.target[0].files[0])
  display.innerText += "Loading"
  fetch('http://localhost:4000/image', {
    method: 'POST',
    body: data
  }).then((response) => response.json()).then(res => {
    listFiles()
  }).catch(() => {
    listFiles()
  })
})

