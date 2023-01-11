const form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const data = new FormData()
  data.append('image', event.target[0].files[0])
  await fetch('http://localhost:4000/image', {
    method: 'POST',
    body: data
  })
})