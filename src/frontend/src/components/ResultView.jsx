import Result from "./Result"

const ResultView = ({ backendData, selectedRegions, selectedFields }) => {
  if (backendData && backendData.length > 0) {
    console.log("backend-data:", backendData)
    console.log("selected fields:", selectedFields)
    console.log("selected regions:", selectedRegions)
    return (
      <div className="result-view">
        {backendData.map(item => <Result item={item} />)}
      </div>
    )
  } else {
    return (
      <div>
      <p> Oopsie! We could not find any results with these conditions. Please try again! </p>
      <p> Hupsis! Emme löytäneet hakukohteita näillä ehdoilla. Kokeile uudestaan! </p>
      </div>
    )
  }

}

export default ResultView