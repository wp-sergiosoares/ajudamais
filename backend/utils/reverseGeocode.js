async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar endereço");
  const data = await res.json();

  return {
    enderecoCompleto: data.display_name,
    cidade:
      data.address.city || data.address.town || data.address.village || "",
    pais: data.address.country || "",
  };
}

module.exports = reverseGeocode;
