const PlayerCard = (props) => (
  <div className="bg-slate-100 rounded-xl max-w-3xl min-w-md m-6 font-roboto">
    <div className="flex text-left">
      <div className="p-6 pb-0 w-1/2">
        <img className="h-auto rounded-none mx-auto inline-block" src={props.data.headshot} alt="" />
      </div>
      <div className="p-6 w-1/4 flex justify-left items-center">
        <div className="md:text-2xl font-bold text-md">
          <p className="md:text-xl text-lg text-slate-400 font-medium">#{props.data.num} | {props.data.pos}</p>
          <p>{props.data.fn}</p>
          <p>{props.data.ln}&nbsp;<span className="text-xs" style={{color: props.team.color}}><sup>&#9733;</sup></span></p>
        </div>
      </div>
      <div className="p-6 w-1/4 text-right">
        <img className="w-14 h-auto rounded-none mx-auto inline-block" src={props.team.logo} alt="" />
      </div>
    </div>
    <div className="h-2" style={{backgroundColor: props.team.color}}>&nbsp;</div>
    <div className="flex text-center bg-white divide-x-2 text-xl">
      <div className="p-6 w-1/3">
        <p className="text-slate-500">PPG</p>
        <p className="font-bold">{props.data.pts}</p>
      </div>
      <div className="p-6 w-1/3">
        <p className="text-slate-500">RPG</p>
        <p className="font-bold">{props.data.reb}</p>
      </div>
      <div className="p-6 w-1/3">
        <p className="text-slate-500">APG</p>
        <p className="font-bold">{props.data.ast}</p>
      </div>
    </div>
  </div>
)
export default PlayerCard
