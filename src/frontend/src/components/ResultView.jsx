import Result from "./Result"

const ResultView = ({ backendData, selectedRegions, selectedFields }) => {
  return (
    <div>
      {backendData.filter(data => selectedRegions.includes(data["maakuntaHakukohde"]) && selectedFields.includes(data["koulutusalaTaso3"]))
      }
      {backendData.map(result => <Result result={result}/>)}
    </div>
  )
}

export default ResultView