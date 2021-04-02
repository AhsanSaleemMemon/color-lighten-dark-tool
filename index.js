(function(){
    
    var hexInput = document.getElementById('hexInput');
    var inputBox = document.getElementById('inputColor');
    var alterColorText = document.getElementById('alterColorText')
    var alteredColor = document.getElementById('alterColor');
    var containerDiv = document.querySelector('.container');
    var sliderText = document.getElementById('sliderText');
    var slider = document.getElementById('slider');
    var toggleBtn = document.getElementById('toggleBtn');
    var lightenText = document.getElementById('lightenText');
    var  darkenText = document.getElementById('darkenText');


    toggleBtn.addEventListener('click', function(e) {
        if(toggleBtn.classList.contains('toggled')){
            toggleBtn.classList.remove('toggled');
            lightenText.classList.remove('unselected')
            darkenText.classList.add('unselected');
        }
        else{
            toggleBtn.classList.add('toggled');
            lightenText.classList.add('unselected');
            darkenText.classList.remove('unselected');
        }
        alteredColor.style.backgroundColor = hexInput.value;
        alterColorText.innerText = `Altered Color ${hexInput.value}`;
        reset();

    })
    

    slider.addEventListener('input', function(e){
        
        
        if (!isValidHex(hexInput.value)){
            return;
        }
        sliderText.textContent = e.target.value + '%';

        const toggledValue = toggleBtn.classList.contains('toggled') ? -slider.value: slider.value;
        
        const alteredHex = alterColor(hexInput.value, toggledValue);
        
        alteredColor.style.backgroundColor = alteredHex;
        alterColorText.innerText = "Altered Color " + alteredHex;
        // alterColor.style.backgroundColor = alteredHex;


    })

    hexInput.addEventListener('input', function(e) {
       
        if(e.target.value == "f0e374" || e.target.value == "#f0e374"){
            containerDiv.style.backgroundColor = '#ffffff';
        }
        else{
            containerDiv.style.backgroundColor = '#f0e374';
             
        }

        if(isValidHex(e.target.value)){
            
            inputBox.style.backgroundColor = e.target.value;
            alteredColor.style.backgroundColor = hexInput.value;
            alterColorText.innerText = `Altered Color ${hexInput.value}`;
            reset();
        }
        else{
            console.log("invalid")
        }

       
    })

})();

function isValidHex(hex){
    if(!hex) return false; // if hex is empty, undefined, null, etc

    const strippedHex = hex.replace('#','')
    if(strippedHex.length==3 || strippedHex.length==6){
        return true;
    }

    else{
        return false;
    }

    // another expression can be -> return strippedHex.length==3 || strippedHex.length==6

}


function convertHexToRGB (hex) {
    if(!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#','');
    
    if(strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
      + strippedHex[1] + strippedHex[1]
      + strippedHex[2] + strippedHex[2];
    }
    
    const r  = parseInt(strippedHex.substring(0,2), 16);
    const g  = parseInt(strippedHex.substring(2,4), 16);
    const b  = parseInt(strippedHex.substring(4,6), 16);
    
    return {r,g,b}
  }

function convertRGBToHex (r,g,b) {
    const firstPair = ("0" + r.toString(16)).slice(-2); // grab the last two values
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);
   

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const increaseWithin0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount));
  }

function alterColor(hex, percent) {

    const {r,g,b} = convertHexToRGB(hex);
    // console.log(r,g,b);
    const amount = Math.floor((percent/100) * 255);
    
    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    // console.log({newR,newG, newB});
    return convertRGBToHex(newR, newG, newB);
    

}


const reset = () => {
    slider.value = 0;
    sliderText.innerText = "0%";
     
}




