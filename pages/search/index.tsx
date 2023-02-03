import { useState, useEffect } from "react";
import Loading from '/components/loading.tsx';
import PlayerCard from '/components/player_card.tsx';

export default function Search() {
  const [players, setPlayers] = useState([])
  const [teams, setTeams] = useState([])
  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

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

  const searchPlayers = (term) => {
    setLoading(false)
    // set results to empty array if search input box is empty and return false.
    if (term.trim() === "") {
      setResults([]);
      return false;
    }

    // split search terms into an array
    let terms = term.trim().split(" ");
    // properties to search in for players object
    let filterProperty = ["fn","ln"];
    // make all terms lowercase
    terms = terms.map(t => t.toLowerCase());

    // filter players with matching search terms
    let matchingPlayers = players.filter((p) => {
      // .every checks if true for all elements
      return terms.every((t) => {
        // .some method checks to see if the return statement below will return true (for at least one element) or false (all elements).
        return filterProperty.some((f) => {
          // in this case we use indexOf to see if there is a match in either "fn" or "ln"
          return p[f].toString().toLowerCase().indexOf(t) !== -1;
        });
      });
    });

    setResults(matchingPlayers);
  }

  useEffect(() => {
    callApi();
  }, []);

  // a debouncer is set here so that it doesn't slow down fast typing search
  useEffect(() => {
    setLoading(true);

    let debouncer = setTimeout(() => {
      searchPlayers(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(debouncer);
    }
  }, [searchTerm]);

  return (
    <>
      {!players.length && !teams.length ? (
        <Loading />
      ) : (
        <>
          <div className="max-w-3xl p-12">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
              </span>
              <input onKeyUp={(e) => setSearchTerm(e.target.value)} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for NBA players" type="text" name="search" />
            </label>
          </div>

          {results.length && !loading ? (
            <div className="md:grid md:grid-cols-2 md:gap-2 s960:grid-cols-3">
              {results.map(player => <div key={player.pid}><PlayerCard data={player} team={teams.find(team => team.ta === player.ta)} /></div>)}
            </div>
          ) : (
            <>
              {searchTerm !== "" && loading ? (
                <Loading />
              ) : (
                <div>
                  No Results
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
