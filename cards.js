// Card constructor with birthdate
function Card(name, email, address, phone, birthdate) {
  this.name = name
  this.email = email
  this.address = address
  this.phone = phone
  this.birthdate = birthdate
}

// render card as table row
Card.prototype.printRow = function () {
  return `
    <tr>
      <td>${this.name}</td>
      <td>${this.email}</td>
      <td>${this.address}</td>
      <td>${this.phone}</td>
      <td>${this.birthdate}</td>
    </tr>
  `
}

// array to store card objects
const cards = []

window.onload = function () {
  const form = document.getElementById('card-form')
  const tableBody = document.querySelector('#card-table tbody')
  const addBtn = document.getElementById('add-card-btn')
  const showBtn = document.getElementById('show-cards-btn')
  const promptBtn = document.getElementById('prompt-cards-btn')

  // Toggle form visibility
  addBtn.onclick = () => {
    form.classList.toggle('hidden')
  }

  // form submission
  form.onsubmit = function (e) {
    e.preventDefault()
    const formData = new FormData(form)
    const newCard = new Card(
      formData.get('name'),
      formData.get('email'),
      formData.get('address'),
      formData.get('phone'),
      formData.get('birthdate')
    )
    cards.push(newCard)
    form.reset()
    form.classList.add('hidden')
  }

  // Show all cards in table
  showBtn.onclick = () => {
    tableBody.innerHTML = cards.map(card => card.printRow()).join('')
  }

  // Prompt-based card input
  promptBtn.onclick = () => {
    const moreCards = promptForCards()
    cards.push(...moreCards)
  }
}
