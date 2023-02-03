import { useState, useEffect } from "react";
import Loading from '/components/loading.tsx';
import PlayerCard from '/components/player_card.tsx';
import Link from 'next/link';

export default function Home() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])

  const callApi = async() => {
    const urls = [
      'http://localhost:3000/api/players',
      'http://localhost:3000/api/teams'
    ];

    try {
      let res = await Promise.all(urls.map(e => fetch(e)))
      let resJson = await Promise.all(res.map(e => e.json()))

      setPlayers(resJson[0]);
      setTeams(resJson[1]);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // timer is set to 3 seconds to demonstrate Loader component
    setTimeout(() => {
      callApi();
    }, 1000 * 3)
  }, [])

  return (
    <>
      {!players.length && !teams.length ? (
        <Loading />
      ) : (
        <>
          <Link href={{pathname: '/search'}} className="m-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Search Players
          </Link>
          <Link href={{pathname: '/teams'}} className="m-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Display Teams
          </Link>
          <div className="md:grid md:grid-cols-2 md:gap-2 s960:grid-cols-3">
            {players.map(player => <p key={player.pid}><PlayerCard data={player} team={teams.find(team => team.ta === player.ta)} /></p>)}
          </div>
        </>
      )}
    </>
  )
}
