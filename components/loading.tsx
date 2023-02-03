import Image from 'next/image'
import loading from '/images/loading.gif'

const Loading = () => (
    <div className="p-8">

      <Image
        src={loading}
        alt="Loading Data"
        width="498px"
        height="498px"
        className="w-24 h-24 rounded-full"
      />

      <p className="text-lg font-medium">
        Loading...
      </p>
    </div>
)
export default Loading
