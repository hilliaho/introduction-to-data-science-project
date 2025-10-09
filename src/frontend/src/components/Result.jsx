const Result = ({item}) => {
  return(
    <div className="result">
      <h3>{item["hakukohde"]}</h3>
      <p>hakutapa: {item["hakutapa"]}</p>
      <p>hakijoita: {item["kaikkiHakijatLkm"]}</p>
      <p>korkeakoulu: {item["korkeakoulu"]}</p>
      <p>kunta: {item["kuntaHakukohde"]}</p>
      <p>prosentti: {item["prosentti"]*100}%</p>
      <p>hakutapa: {item["hakutapa"]}</p>

    </div>
  )
}

export default Result