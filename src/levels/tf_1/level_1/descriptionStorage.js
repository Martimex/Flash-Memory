function descriptionStorage() {
    /* For description storage, we use inline styling, instead of generating another CSS file */
    return(
        <div>
            <span style={{fontWeight: 650, color: "lightgreen", fontSize: '1.15rem'}}> The very first level in the game !</span>
            <span style={{fontWeight: 500, color: "#dddc"}}>
                This simple level is a quick startup for those of you, who are brand new to the
                game. This is a very basic and simple level, that does not require much 
                memoization skill. Have fun !
            </span>
            <hr style={{marginBottom: '1em'}}/>
            <span style={{fontWeight: 650, color: "lightgreen", fontSize: '1.15rem'}}> Should you pick this as your first level ? </span>
            <span style={{fontWeight: 500, color: "#dddc"}}>
                Absolutely! As the level name suggest, this ideally should be your starting point.
                I recommend you trying to get at least 1 star here, which can become a little challenging, but 
                definitely doable even if you have just started your Memory Game adventure. As you progress, you
                may notice that even getting all 3 stars on this level might be doable. It is all about the practice! 
            </span>
            <hr style={{marginBottom: '1em'}}/>
            <span style={{fontWeight: 650, color: "lightgreen", fontSize: '1.15rem'}}> OG level note </span>
            <span style={{fontWeight: 500, color: "lightslategray"}}>
                This level was originally published in old-style version of Flash MG. 'First level' was created on August 22nd, 2021 - and it 
                is truly the very first level EVER. Despite the slight change to lotus decoration added in the background, and the second stage being included,
                other level parts remain unchanged, keeping old-style look *almost* untouched. 
            </span>
        </div>
    )
}

export {descriptionStorage}