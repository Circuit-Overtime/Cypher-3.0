const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  // console.log(toggled)
  document.getElementById("successLoaderContainer").classList.toggle("toggled");
  // if (toggled == true)
  // {
    
  // }
  // else
  // {
  //   (setTimeout(() => {
      
  //   }, 500));
  // }
}
setInterval(() => {
  document.getElementById("successLoaderContainer").classList.contains("toggled") ? 
  (document.querySelector(".centered").style.opacity = 0) 
  : 
  (document.querySelector(".centered").style.opacity = 1) 
  
}, 200);

const handleOnClick = index => {
  toggle();
  
  // ..darkbackground"

  setTimeout(() => {
    anime({
      targets: ".darkbackground",
      opacity: toggled ? 0 : 1,
      delay: anime.stagger(50, {

      })
    });
  }, 200);
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });

 
  setTimeout(() => {
    let numberOfTilesSpawned = document.querySelectorAll(".tile").length;

    globalThis.TilesAnimationInterval = setInterval(() => {
      var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
     document.querySelectorAll(".tile")[n].click();
    }, 1300 );
    clearInterval(TilesAnimationInterval);
  }, 500);
  
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();


window.onresize = () => createGrid();