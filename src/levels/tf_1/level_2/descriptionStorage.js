function descriptionStorage() {
    /* For description storage, we use inline styling, instead of generating another CSS file */
    return(
        <div>
            <span style={{fontWeight: 650, color: "lightblue", fontSize: '1.25rem', fontWeight: '650'}}> Flood incoming </span>
            <span style={{fontWeight: 500, fontSize: '1.1rem', color: "#dddc"}}>
                "It has been raining recently. Sky was filled with many transparent rain drops, each reaching the ground quicker and quicker.
                Then a sudden storm started - being much noisy at a times, but brought many more rain than anyone had expected. It could
                not be denied that something bad is going to happen soon... The flood is about to start !"
            </span>
            <hr style={{marginBottom: '1em', padding: '.3em', background: 'linear-gradient(lightblue, #222)', border: 0}}/>
            <span style={{fontWeight: 650, color: "lightblue", fontSize: '1.25rem', fontWeight: '650'}}> Water is the limit </span>
            <span style={{fontWeight: 500, fontSize: '1.1rem', color: "#dddc"}}>
                The only thing that keeps you above the surface is the water itself. Don't let it raise by too much as you may find yourself in a 
                real trouble...
            </span>
            <hr style={{marginBottom: '1em', padding: '.3em', background: 'linear-gradient(lightblue, #222)', border: 0}}/>
            <span style={{fontWeight: 650, color: "lightblue", fontSize: '1.25rem', fontWeight: '650'}}> OG level note </span>
            <span style={{fontWeight: 500, color: "lightslategray"}}>
                This level was originally published in old-style version of Flash MG. 'Flood' was created on August 25th, 2021, becoming the 
                second Memory Flash level. The initial version took as little as 4 hours to complete, as it did not involve any superior
                mechanics and advanced styling. 
            </span>
            <span style={{marginTop: '.5em', fontWeight: 500, color: "lightslategray"}}>
                In fact, that is the third level version. Even after some updates to the level, it remains untouched gameplay-wise. 
                The styling, on the other hand, have received some decent and noticeable changes - just to make it suit better to 
                the blue-themed layout.
            </span>
            <hr style={{marginBottom: '1em', padding: '.3em', background: 'linear-gradient(lightblue, #222)', border: 0}}/>
        </div>
    )
}

export {descriptionStorage}