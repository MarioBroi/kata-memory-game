//console.log("test");

//creo un array di 12 elementi
//const cards = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6"];
const images = ["alien", "bug", "duck", "rocket", "spaceship", "tiktac", "alien", "bug", "duck", "rocket", "spaceship", "tiktac"];

//randomizzo l'ordine dei vari elementi dell'array
let shuffler = images.sort(() => (Math.random() > .5) ? 2 : -1);
console.log(shuffler);

for (let i = 0; i < images.length; i++) {

    let box = document.createElement('div');
    box.className = "item";
    box.innerHTML = `<img src="./images/` + shuffler[i] + `.png" alt="">`;
    //console.log(shuffler[i]);
    box.onclick = function () {
        this.classList.add('openBox')
        setTimeout(function () {
            if (document.querySelectorAll('.openBox').length > 1) {
                //se openBox ha lo stesso valore  
                if (document.querySelectorAll('.openBox')[0].innerHTML == document.querySelectorAll('.openBox')[1].innerHTML) {
                    //aggiungi la classe boxMatch
                    document.querySelectorAll('.openBox')[0].classList.add('boxMatch');
                    document.querySelectorAll('.openBox')[1].classList.add('boxMatch');
                    //rimuovi la classe openBox
                    document.querySelectorAll('.openBox')[0].classList.remove('openBox');
                    document.querySelectorAll('.openBox')[1].classList.remove('openBox');

                    if (document.querySelectorAll('.boxmatch').length == images.length) {
                        alert("You win!")
                    }
                } else {
                    document.querySelectorAll('.openBox')[1].classList.remove('openBox');
                    document.querySelectorAll('.openBox')[0].classList.remove('openBox');
                }
            }
        }, 500)
    }

    document.querySelector('.game').appendChild(box);
}