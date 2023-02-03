import Link from "next/link";
import { useRouter } from 'next/router';

export default function Teams({ teams }) {
  const router = useRouter();

  const showTeamPlayers = (e, ta) => {
    e.preventDefault();

    console.log(ta);
    router.push({
      pathname: '/teams/[id]',
      query: { id: ta },
    });
  }

  return (
    <div className="m-6">
      <dl className="max-w-md text-gray-900 divide-y divide-gray-200">
        {teams.map(team =>
          <div key={team.tid} className={`flex flex-row pb-3 text-lg justify-left items-center hover:underline hover:cursor-pointer`} onClick={(e) => showTeamPlayers(e, team.ta)}>
              <dt className="w-1/4">
                <img src={team.logo} className="w-14 h-auto" />
              </dt>
              <dd className="text-gray-500 w-3/4">{team.city} {team.name}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/teams')
    const data = await res.json()

    if (!data) {
      return {
        notFound: true,
      }
    }

    return {
        props: { teams: data },
    };
}
