let marginPrefix = '_';
let fontWeightPrefix = 'fw-';
let isDown = false;
let startX;
let scrollLeft;

function setMargins(elems, prefix) {
    elems.forEach((elem) => {
        elem.classList.forEach((klass) => {
            if (typeof klass === 'string') {
                if (klass.indexOf(`m${prefix}t`) == 0) {
                    const marginTop = klass.split(`${prefix}`)[2];
                    elem.style.marginTop = `${marginTop}px`;
                }

                if (klass.indexOf(`m${prefix}r`) == 0) {
                    const marginRight = klass.split(`${prefix}`)[2];
                    elem.style.marginRight = `${marginRight}px`;
                }

                if (klass.indexOf(`m${prefix}l`) == 0) {
                    const marginLeft = klass.split(`${prefix}`)[2];
                    elem.style.marginLeft = `${marginLeft}px`;
                }

                if (klass.indexOf(`m${prefix}b`) == 0) {
                    const marginBottom = klass.split(`${prefix}`)[2];
                    elem.style.marginBottom = `${marginBottom}px`;
                }

                if(klass.indexOf("m_") == 0) {
                    const margin = klass.split(`${prefix}`)[1];
                    elem.style.margin = `${margin}px`;
                }
            }
        });
    });
}

function setFontWeights(elems, prefix) {
    elems.forEach((elem) => {
        elem.classList.forEach((klass) => {
            if (typeof klass === 'string') {
                const fontWeight = klass.split(`${prefix}`)[1];
                elem.style.fontWeight = fontWeight;
            }
        });
    });
}

function setColor(elems, type) {
    elems.forEach((elem) => {
        switch (type) {
            case 'bg':
                elem.style.backgroundColor = elem.dataset.bgcolor;
                break;
            case 'txt':
                elem.style.color = elem.dataset.textcolor;
                break;
            case 'fill':
                elem.style.fill = elem.dataset.fillcolor;
                break;
            default:
                break;
        }
    });
}

function setBgImage(elems) {
    elems.forEach((elem) => {
        elem.style.backgroundImage = `url(${elem.dataset.bgimage})`;
    });
}

function scrollOnDragElems(elems) {
    elems.forEach((elem) => {
        elem.addEventListener('mousedown', (e) => {
            elem.classList.add('is-dragged');

            isDown = true;
            startX = e.pageX - elem.offsetLeft;
            scrollLeft = elem.scrollLeft;
        });

        elem.addEventListener('mouseleave', () => {
            isDown = false;
            elem.classList.remove('is-dragged');
        });

        elem.addEventListener('mouseup', () => {
            isDown = false;
            elem.classList.remove('is-dragged');
        });

        elem.addEventListener('mousemove', (e) => {
            if (isDown) {
                e.preventDefault();

                const x = e.pageX - elem.offsetLeft;
                const walk = (x - startX) * 0.5; // control scroll speed
                elem.scrollLeft = scrollLeft - walk;
            };

            return;
        });
    });
}
