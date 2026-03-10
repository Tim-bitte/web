document.addEventListener('DOMContentLoaded', init)

function init() {
  let form = document.getElementById("form__send")
  let file__input = document.getElementById("file__selected")
  form.addEventListener('submit', handleSubmit)
  file__input.addEventListener('change', loadData)

  document.getElementById("upload__btn").addEventListener('click', function() {
    file__input.click()
  })
}


function loadData(event) {
    const files = event.target.files

    Array.from(files).forEach(file => {
        const filename = file.name
        const lastDot = filename.lastIndexOf('.')
        const extension = filename.slice(lastDot + 1).toLowerCase()
        console.log('filename:', filename, '| extension:', extension)

        const previewBar = document.getElementById("preview__bar")

        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)

        const previewItem = document.createElement('div')
        previewItem.classList.add('preview__item')

        if (isImage) {
            const img = document.createElement('img')
            img.classList.add('preview__img')
            img.setAttribute('src', URL.createObjectURL(file))
            previewItem.appendChild(img)
        } else {
            const fileIcon = document.createElement('span')
            fileIcon.classList.add('material-symbols-outlined', 'preview__file__icon')
            fileIcon.textContent = 'file_copy'

            const fileInfo = document.createElement('div')
            fileInfo.classList.add('preview__file__info')

            const fileName = document.createElement('span')
            fileName.classList.add('preview__file__name')
            fileName.textContent = filename

            const fileSize = document.createElement('span')
            fileSize.classList.add('preview__file__size')
            fileSize.textContent = formatSize(file.size)

            fileInfo.appendChild(fileName)
            fileInfo.appendChild(fileSize)
            previewItem.appendChild(fileIcon)
            previewItem.appendChild(fileInfo)
        }

        const closeBtn = document.createElement('button')
        closeBtn.classList.add('preview__close')
        closeBtn.textContent = '✕'
        closeBtn.addEventListener('click', function() {
            previewItem.remove()
            if (previewBar.children.length === 0) {
                previewBar.style.display = 'none'
            }
        })

        previewItem.appendChild(closeBtn)
        previewBar.appendChild(previewItem)
        previewBar.style.display = 'flex'
    })
}

function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
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
    messageContainer.innerHTML += raw_html
}


function renderMessage2(message_content) {
    const messageContainer = document.getElementsByClassName("messages")[0]

    const inside__message__container = document.createElement("div")
    inside__message__container.classList.add('message', 'right')

    const message__container__after__img = document.createElement("div")
    message__container__after__img.classList.add('message__container__after__img')

    const inline__items = document.createElement('section')
    inline__items.classList.add('inline__items', 'right__items')

    const message__content__white = document.createElement('div')
    message__content__white.classList.add('message__content__white')
    message__content__white.textContent = message_content

    const message__icons = document.createElement('div')
    message__icons.classList.add('message__icons')
    const icon__span = document.createElement('span')
    icon__span.classList.add('material-symbols-outlined')
    icon__span.textContent = 'more_horiz'
    message__icons.appendChild(icon__span)

    const timestamp = document.createElement('h4')
    timestamp.style.textAlign = 'end'
    timestamp.textContent = 'now'

    inline__items.appendChild(message__content__white)
    inline__items.appendChild(message__icons)
    message__container__after__img.appendChild(inline__items)
    message__container__after__img.appendChild(timestamp)
    inside__message__container.appendChild(message__container__after__img)
    messageContainer.appendChild(inside__message__container)

    document.getElementById("textarea__elem").value = ""
    messageContainer.scrollTop = messageContainer.scrollHeight
}
