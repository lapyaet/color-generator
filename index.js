
class Colour {
    constructor (hex, element) {
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    setHex (hex) {
        this.hex = hex;
        this.element.style.background = hex;
        this.element.querySelector(".color-input").value = hex ;
    }

    setLocked(locked) {
        this.locked = locked;

        if(locked) {
            this.element.querySelector("i").className = "fa-solid fa-lock" ;

        }else {
            this.element.querySelector("i").className = "fa-solid fa-lock-open" ;
        }
    }

    toggleLocked () {
        this.setLocked(!this.locked);
    }

    generateHex () {
        if(this.locked) {
            return;
        }

        const letter = "0123456789ABCDEF";
        let hex = "#"

        for(let i=0; i<6; i++) {
            hex += letter[Math.floor(Math.random() *16)];
        }
        this.setHex(hex)
    }

    copyToClipboard () {
        const input = this.element.querySelector(".color-input");
        input.select();
        document.execCommand("copy");
        input.blur ();

        this.element.classList.add("copied");
        setTimeout(() => {
            this.element.classList.remove("copied")
        },1000)
    }
}

const colourElements = document.querySelectorAll(".colors .color");

const colours = [];

for (let i=0; i<colourElements.length; i++) {
    const colourElement = colourElements[i];
    const input = colourElement.querySelector(".color-input");
    const lock = colourElement.querySelector(".lock");
    const copyHex = colourElement.querySelector(".copy");

    const hex = input.value;
    const colour =new Colour(hex,colourElement)

    input.addEventListener("input", () => {
        colour.setHex(e.target.value)
    })
    lock.addEventListener ("click", () => {
        colour.toggleLocked();
    })

    copyHex.addEventListener ("click", () => {
        colour.copyToClipboard();
    })

    colour.generateHex();
    colours.push(colour);
}

document.querySelector(".generate").addEventListener("click", function() {
    for(let i=0; i<colours.length; i++) {
        colours[i].generateHex();
    }
})
