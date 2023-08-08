function descriptionStorage() {
    return(
        <div>
            <span style={{fontWeight: 650, color: "hsl(144, 60%, 50%)", letterSpacing: '.02rem', fontSize: '1.15rem'}}> Real memory level </span>
            <span style={{fontWeight: 500, color: "#ddde"}}>
                Here is a fun challenge, for those, who love memoization-heavy levels. This time, you need to solve a small set of tiles - but
                with a tricky addition - a visibility change. You'd better remember what is shown before you won't be able to spot it ever again !  
            </span>
            <hr style={{marginBottom: '1em', padding: '.1rem', background: 'hsl(144, 70%, 50%)'}}/>
            <span style={{fontWeight: 650, color: "hsl(188, 60%, 50%)", fontSize: '1.15rem'}}> Where is the turns counter ? </span>
            <span style={{fontWeight: 500, color: "#ddde"}}>
                Well, in this case it's not about the moves you can make. The real concern is the time to complete the board. If you make it
                happen quick enough, you will maybe get rewarded with some shiny stars too ! 
            </span>
            <hr style={{marginBottom: '1em', padding: '.1rem', background: 'hsl(188, 70%, 50%)'}}/>
            <span style={{fontWeight: 650, color: "#bbbe", fontSize: '1.15rem'}}> OG level note </span>
            <span style={{fontWeight: 500, color: "#999e"}}>
                This level was originally published in old-style version of Flash MG. 'Psychodelic' was created on August 29th, 2021 - being the
                third level added to the game. Surprisingly, when this level came out back in 2021, the invisibility mechanic addition was not planned
                first. Level was supposed to have tiles moving diagonally, making a deceiving move effect. Because of a poor 
                performance, and some weird bugs ongoing, a new invisibility approach got deployed as a result.
            </span>
            <hr style={{marginBottom: '1em', marginTop: '.75rem', padding: '.1rem', background: '#bbbe'}}/>
        </div>
    )
}

export {descriptionStorage}