document.addEventListener('DOMContentLoaded', () => {
    const marginElements = document.querySelectorAll(`[class*=m${marginPrefix}]`);
    const fontWeightElements = document.querySelectorAll(`[class*=${fontWeightPrefix}]`);
    const scrollDragElems = document.querySelectorAll('[data-scrollOnDrag]');
    const elemsBg = document.querySelectorAll('[data-bgColor]');
    const textElems = document.querySelectorAll('[data-textColor]');

    // dragula
    const dragularContainerArray = Array.from(document.querySelectorAll(".tasks"));
    const dragulaOptions = {
        isContainer: function (el) {
            return false; // only elements in drake.containers will be taken into account
        },
        moves: function (el, source, handle, sibling) {
            // return handle.classList.contains('task');
            return true; // elements are always draggable by default
        },
        accepts: function (el, target, source, sibling) {
            return true; // elements can be dropped in any of the `containers` by default
        },
        invalid: function (el, handle) {
            return false; // don't prevent any drags from initiating by default
        },
        direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
        copy: false,                       // elements are moved by default, not copied
        copySortSource: false,             // elements in copy-source containers can be reordered
        revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
        removeOnSpill: false,              // spilling will `.remove` the element, if this is true
        mirrorContainer: document.querySelectorAll('.category')[0],    // set the element that gets mirror elements appended
        ignoreInputTextSelection: true     // allows users to select input text, see details below
    }

    setMargins(marginElements, marginPrefix);
    setFontWeights(fontWeightElements, fontWeightPrefix);
    setColor(elemsBg, 'bg');
    setColor(textElems, 'txt');
    dragulaInit(dragularContainerArray, dragulaOptions);
    // scrollOnDragElems(scrollDragElems);
});

// still a work in progress
function dragulaInit(elems, options) {
    dragula(elems, options).on('drag', function (el) {
        // console.log(`drag: ${el}`);
        // showEmptySheet(el, 'drag');
        el.classList.toggle('dragged');
    }).on('drop', function (el) {
        // console.log(`drop: ${el}`);
        // showEmptySheet(el, 'drop');
        el.classList.remove('dragged');
        el.className += ' dropped';
    }).on('over', function (el, container) {
        el.classList.remove('dragged');
        container.className += ' over';
    }).on('out', function (el, container) {
        // console.log(`out: ${el}`);
        el.classList.remove('dragged');
        container.className = container.className.replace('over', '');
    });
}

// still a work in progress
function showEmptySheet(elem, evType) {
    const emptyDiv = elem.parentNode.parentNode.nextElementSibling.children[0];
    const tasks = elem.parentNode;
    let hasTask = '';

    if (evType == 'drag') {
        hasTask = tasks.children.length == 1;
    } else if (evType == 'drop') {
        hasTask = tasks.children.length != 1 && tasks.children.length == 1;
    }

    if (emptyDiv.classList.contains('empty-category')) {
        if (!hasTask) {
            emptyDiv.style.display = 'none';
        } else {
            emptyDiv.style.display = 'grid';
        }
    }
}