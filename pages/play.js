import React, {useState, useEffect, useLayoutEffect} from "react";
import prisma from '../lib/prisma';
import { getSession, signIn } from "next-auth/react";
import Router from "next/router";
import * as Animation from 'animejs';

// Components
import Preview from "../src/components/preview";
import Game from "../src/components/memory_game";
import UserBanned from "../src/components/user_banned";
import { getPlayerLevel } from "../src/global/predefined/exp_to_level";

export const getServerSideProps = async ({ req, res }) => {

    const session = await getSession({ req });
    if(!session) { return { props: {noSession: true}}; } // noSession will indicate if we have unauthenticated access to /play route

    const session_user = await prisma.user.findUnique({
        where: { email: session.user.email }
    })

    const user_progresses = await prisma.progress.findMany({
        where: { userId: session_user.id },
    })

    const DEV_ONLY_includeUnreleasedLevels = false; // In production it ALWAYS should be set to FALSE. In dev, it can temporarily be set to TRUE to develop unreleased level(s)

    const data = await prisma.serie.findMany({
        where: { 
            isReleased: { 
                equals: (DEV_ONLY_includeUnreleasedLevels)? false : true, 
            },
        },
        include: {
            Levels: {
                select: { id: true, name: true, number: true, stages: true, difficulty: true, creatorUserId: true, createdAt: true, Created_By: { select: { name: true } } }
            },
        },
    
    });

    // Each time we request a full data, we need to update User Progress difficulties ! (useful in cases when the level has the difficulty changed, so we also have to updated progress records for it)
    const all_levels = [].concat.apply([], [...data.map(el => [...el.Levels])].flat());

    user_progresses.forEach((user_progress, ind) => {
        const levelForProgress = all_levels.find((lv) => lv.id === user_progress.levelId);
        if(levelForProgress) {
            if(levelForProgress.difficulty !== user_progress.lv_difficulty) {
                updateOutdatedProgressRecord(user_progress.id, levelForProgress.difficulty);
            }
        }
    })

    async function updateOutdatedProgressRecord(progressRecordId, updatedDifficulty) {
        await prisma.progress.update({
            where: { id: progressRecordId},
            data: {
                lv_difficulty: updatedDifficulty,
            }
        });
    }

    const levelsByDifficulty = {all: {}, user_completed: {}, user_stars: 0};
    data.forEach(serie => {
        serie.Levels.map(lv => (levelsByDifficulty.all.hasOwnProperty(lv.difficulty)? levelsByDifficulty.all[lv.difficulty] += 1 : levelsByDifficulty.all[lv.difficulty] = 1));
    });
    const progressesArr = user_progresses.filter(lv => lv.lv_progress === 100);
    progressesArr.map(lv => levelsByDifficulty.user_completed.hasOwnProperty(lv.lv_difficulty)? levelsByDifficulty.user_completed[lv.lv_difficulty] += 1 : levelsByDifficulty.user_completed[lv.lv_difficulty] = 1)
    progressesArr.map(lv => levelsByDifficulty.user_stars += lv.stars_got);

    // Now add last fields to indicate all the levels, and also number of levels which p;ayer won (lv_progress is 100)
    levelsByDifficulty.levelsAmount = {inGame: Object.values(levelsByDifficulty.all).length? Object.values(levelsByDifficulty.all).reduce((a, b) => +a + +b) : 0, userWin: Object.values(levelsByDifficulty.user_completed).length? Object.values(levelsByDifficulty.user_completed).reduce((a, b) => +a + +b) : 0};
    levelsByDifficulty.user_exp = getPlayerLevel(session_user.exp);

    return {
        props: { data: [...JSON.parse(JSON.stringify(data))].sort((a, b) => a.index - b.index), user_progresses: user_progresses, session_user: JSON.parse(JSON.stringify(session_user)), levelsCount: levelsByDifficulty },
    };
};

function Play(props) {

    const anime = Animation.default;

    const [component, setComponent] = useState(props.session_user && props.session_user.isBanned? 'banned' : 'preview');
    // State to share with main Memory_game component
    const [levelData, setLevelData] = useState(null);
    const [levelProgressRecord, setLevelProgressRecord] = useState(null);
    const [gameCounters, setGameCounters] = useState(null);

    async function showUpAnimation() {
        await anime({
            targets: 'body',
            duration: 400,
            opacity: [0, 1],
            easing: 'linear',
        }).finished;
    }

    useEffect(() => {
        if(levelData) { 
            setComponent('game');
        }
    }, [levelData])

    useLayoutEffect(() => { // Using LayoutEffect, because of flickering issue when switching between Landing and Play(Preview) Components
        if(props.noSession === true) { signIn('google'); }
        else if(component === 'preview' && !props.session_user.isBanned) {
            showUpAnimation();
            Router.push('/play'); // performs an artificial refresh so that if user make any progress on the level, it is not necessry to refresh the game manually
        }
        else if(props.session_user.isBanned) {
            setComponent('banned')
        }
    }, [component])

    return(
        <div style={{background: '#111', width: '100%', minHeight: '100vh'}}>
            {(props.noSession !== true && component === 'preview') && (
                <Preview data={props.data} user_progresses={props.user_progresses} player={props.session_user} levelsCount={props.levelsCount}
                    setLevelData={setLevelData} setLevelProgressRecord={setLevelProgressRecord} setGameCounters={setGameCounters}
                />
            )}
            {(props.noSession !== true && component === 'game') && (
                <Game level={levelData} playerId={props.session_user.id} playerExp={props.session_user.exp} progress={levelProgressRecord} gameCounters={gameCounters} changeComponent={setComponent} />
            )}
            {(props.noSession !== true && component === 'banned') && (
                <UserBanned userName={props.session_user.name} />
            )}
        </div>
    );
}

export default Play;