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
        Valitsemillasi ehdoilla ei löytynyt tuloksia
      </div>
    )
  }

}

export default ResultView