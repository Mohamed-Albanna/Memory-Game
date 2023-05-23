// select the start game button
document.querySelector(".control-buttons span").onclick = function(){

    // prompt window to ask for namr
    let yourName = prompt("what is your name ?")
    
    // if name is empty
    if(yourName == null || yourName == ""){
        
        // set name to unknown
        document.querySelector(".name span").innerHTML = 'unknown';

        // if name os not empty
    }else{

        // set name to your name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // remove splash screen
    document.querySelector(".control-buttons").remove();

};

// create the main variables
let duration = 1000;

let blocksContainer = document.querySelector(".momery-game-blocks");

let blocks = Array.from(blocksContainer.children);

// let orderRange =[...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);
// let testOrderRnage =[1, 11, 13, 12, 18, 17, 19, 0, 2, 16, 5, 7, 9, 3, 10, 4, 6, 8, 14, 15]

// add order css propty to game blocks
blocks.forEach((block , index) =>{

    block.style.order = orderRange[index];

    // add click event
    block.addEventListener('click' , function(){

        // trigger the flipBlock function
        flipBlock(block);
    });

});

// flip  block function
function flipBlock(selectedBlock) {

    // add class is-flipped
    // selectedBlock.classlist.add('is-flipped');
    selectedBlock.classList.add('is-flipped');

    // collect all flipped cards
    let allFlippedBlocks =blocks.filter(flippedBlock =>flippedBlock.classList.contains('is-flipped'));

    // if there is two selected blocks
    if(allFlippedBlocks.length === 2){

        console.log('two flipped blocks selected');

        // stop clicking function
        stopClicking();

        // check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}


// stop clicking function
function stopClicking() {

    // add class no clicking on main contianer
    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{

        // remove class no clicking after the duration
        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

// check matched blocks
function checkMatchedBlocks (firstBlock, secondBlock){

    let triesElements = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    setTimeout(() =>{
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    
        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');
    } ,duration);

    document.getElementById('success').play();

    } else {

        triesElements.innerHTML = parseInt(triesElements.innerHTML) + 1;


        setTimeout(() =>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        } ,duration);

        document.getElementById('fail').play();

    }

}
// shuffle function
function shuffle(array){

    // setting vars
    let current = array.length,
        temp,
        random;

        while (current >0){

            // get random number
            random = Math.floor(Math.random() *current);

            // decrease length by one
            current--;

            // console.log(random); 

            // save current element in stach
            temp = array[current];

            // current element = random element
            array[current] = array[random];

            // random element = get element from stash
            array[random] = temp;


        }

        return array;


}