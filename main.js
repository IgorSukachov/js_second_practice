const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = [{ // массив из объектов
    title: 'Добиться своего',
    completed: false, // выполнили ли мы её
},
{
    title: 'Посмотреть когда будет 8 марта',
    completed: true,
}
]

function render() {
    listElement.innerHTML = '' // Очищяем содержимое
    if (notes.length === 0) {
        listElement.innerHTML = '<p style="color: orange";>No elements</p>'
    }
    for (let i = 0; i < notes.length; i++) { // Создаём индекс i, присваиваем ему значение 0, потому что каждый массив начинается со значения 0. После точки с запятой, мы говорим до какого момента делать итерацию. И после ещё одной точки с запятой мы ставим индекс с оператором ++, который увеличивает индекс на еденицу. (Есть еще ++i, который сразу меняет значение - это просто для справки)
        
        // insertAdjacentHTML он не перезаписывает элементы как innerHTML, и так же можно указать позицию, куда можно вставить наш переданный HTML код. Он определяет позицию добавляемого элемента относительно элемента, вызвавшего метод.
    
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i)) // передаём каждый элемент массива, и получаем каждый индекс
    }
}
    
render()

// Записали в отдельную функцию шаблон
function getNoteTemplate(note, index) { // получаем с массива отдельный объект и принимаем его
    console.log(note, index)
    return `
    <li
    class="list-group-item d-flex justify-content-between align-items-center"
    >
        <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span> 
        <span>
        <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
        </span>
    </li>
    ` 
    // Т.к мы передали объект, то мы можем выбирать у него свойство, через точку note.title
    // К спану мы добавляем класс с условием, если в свойстве объекта будет параметр равняться true, если нет, то класс пустой. Для справки класс text-decoration-line-through - это класс с бустрапа и btn-success и btn-warning тоже классы бустрапа
    // Добавили параметр data-index к тегу, чтобы можно было повесить на него номер(индекс), по которому мы к нему смогли бы обращаться.
    // Добавим дата класс тайп, чтобы определить какое действие нам нужно совершить data-type="toggle" data-type="remove".
    // Со всеми дата классами, можно работать с помощью метода dataset()
}

createBtn.onclick = function () {
    
    if (inputElement.value.length === 0) {
        return // просто написанный return возвращает undefiend
    }
    // Создаём новый объект, с теми же параметрами, что и наши основные объекты массива notes
    const newNoteObject = { 
        title: inputElement.value,
        completed: false
    }
    notes.push(newNoteObject) // метод массива для добавления элемента в конец массива
    render()
        // listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNoteObject))
    // В конце кода обозначаем, что наш инпут будет пуст
    inputElement.value = ''

}

listElement.onclick = function(event) {
    /*  Делегирование событий
        event - событие
        target - определяет клик(у нас событие клик) на странице по тегу в нашем случае мы повесели наш таргет во внутрь listElement, т.е нашего ненумеровонаго списка
        dataset - даёт нам все значения дата классов, в нашем случае
        data-index: индексу, data-type: toggle или remove.
    */
   // Булева логика
    if (event.target.dataset.index) { // если там что-то есть, мы попали на нужный элемент
        const index = parseInt(event.target.dataset.index)// индекс всегда число, а не строчка. event.target.dataset.index - передаёт индекс как строку, мы преобразуем его в числовой вид испольщуем или Number или parseInt
        const type = event.target.dataset.type
        // console.log(index, type)

        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed // ! - булевый оператор НЕ. Получается что, мы обращаемся при нажатии к свойству notes по его индексу и меняем его значение на противоположное  true/false
        } else if (type === 'remove') {
            notes.splice(index, 1) // По клику находит по индексу li элемент и удаляет его, сколько? 1 элемент, который мы указали во втором значении. Метод splice удаляет, либо заменяет содержимое.
        }

        render()
    }
}