import PlayerCard from '/components/player_card.tsx';

export default function TeamPlayers(props) {
  const players = props.players;

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-2 s960:grid-cols-3">
        {players.map(player => <div key={player.pid}><PlayerCard data={player} team={props.team[0]} /></div>)}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/teams')
  const teams = await res.json()

  const paths = teams.map((team) => ({
    params: { id: team.ta },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const urls = [
    'http://localhost:3000/api/players/' + params.id,
    'http://localhost:3000/api/teams/' + params.id
  ];

  let res = await Promise.all(urls.map(e => fetch(e)))
  let resJson = await Promise.all(res.map(e => e.json()))

  return {
    props: {
      players: resJson[0],
      team: resJson[1]
    },
  };
}
