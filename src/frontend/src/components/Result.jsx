const Result = ({item}) => {
  let percent = item["prosentti"]*100
  percent = percent - percent%1

  return(
    <div className="result">
      <h3>{item["hakukohde"]}</h3>
      <p>Region - Maakunta: {item["maakuntaHakukohde"]}</p>
      <p>City - Kaupunki: {item["kuntaHakukohde"]}</p>
      <p>University - Korkeakoulu: {item["korkeakoulu"]}</p>
      <p>Intake percentage - Sisäänottoprosentti: {percent}%</p>

    </div>
  )
}

export default Result