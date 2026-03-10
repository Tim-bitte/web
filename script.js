document.addEventListener('DOMContentLoaded', init)

function init() {
  let form = document.getElementById("form__send")
  let file__input =  document.getElementById("file__selected")
  form.addEventListener('submit', handleSubmit)
  file__input.addEventListener('change', loadData)
}


function loadData(event){
    console.log(event.target.files)
    let img = document.createElement('img')
    console.log(event.target.files[0])


    // find last dot and from it read extension, fix upload button 
    // TODO: Add preview icons for uploaded image media (multi-media) above typing line
    // for files: just show their name and size 
    // add close button for files and images prieview
    
    img.setAttribute('src', URL.createObjectURL(event.target.files[0]))
    document.body.appendChild(img)
}

function handleSubmit(event) {
  event.preventDefault()
  
  const message_content = document.getElementById("textarea__elem").value 
  console.log(message_content)
  renderMessage2(message_content)
}

function renderMessage(message_content){
    const messageContainer = document.getElementsByClassName("messages")[0]
    let raw_html = `<div class="message right">
                    <div class="message__container__after__img">
                            <section class="inline__items right__items">
                                <div class="message__content__white"> ${message_content}</div>
                                <div class="message__icons">
                                    <span class="material-symbols-outlined">more_horiz</span>
                                </div>
                            </section>
                            <h4 style="text-align: end;">
                                now
                                
                            </h4> 
                   </div>
                </div>`
    messageContainer.innerHTML+= raw_html
    
}


function renderMessage2(message_content) {
    const messageContainer = document.getElementsByClassName("messages")[0]

    // Outer wrapper
    const inside__message__container = document.createElement("div")
    inside__message__container.classList.add('message', 'right')

    // Inner container
    const message__container__after__img = document.createElement("div")
    message__container__after__img.classList.add('message__container__after__img')

    // Section row
    const inline__items = document.createElement('section')
    inline__items.classList.add('inline__items', 'right__items')

    // Message text
    const message__content__white = document.createElement('div')
    message__content__white.classList.add('message__content__white')
    message__content__white.textContent = message_content

    // Icons div
    const message__icons = document.createElement('div')
    message__icons.classList.add('message__icons')
    const icon__span = document.createElement('span')
    icon__span.classList.add('material-symbols-outlined')
    icon__span.textContent = 'more_horiz'
    message__icons.appendChild(icon__span)

    // Timestamp
    const timestamp = document.createElement('h4')
    timestamp.style.textAlign = 'end'
    timestamp.textContent = 'now'

    // Assemble
    inline__items.appendChild(message__content__white)
    inline__items.appendChild(message__icons)
    message__container__after__img.appendChild(inline__items)
    message__container__after__img.appendChild(timestamp)
    inside__message__container.appendChild(message__container__after__img)
    messageContainer.appendChild(inside__message__container)

    // Clear textarea and scroll to bottom
    document.getElementById("textarea__elem").value = ""
    messageContainer.scrollTop = messageContainer.scrollHeight
}
