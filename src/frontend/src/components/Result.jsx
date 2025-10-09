const Result = ({item}) => {
  return(
    <div className="result">
      <h3>{item["hakukohde"]}</h3>
      <p>Region - Maakunta: {item["maakuntaHakukohde"]}</p>
      <p>City - Kaupunki: {item["kuntaHakukohde"]}</p>
      <p>University - Korkeakoulu: {item["korkeakoulu"]}</p>
      <p>Intake percentage - Sisäänottoprosentti: {item["prosentti"]*100}%</p>

    </div>
  )
}

export default Result