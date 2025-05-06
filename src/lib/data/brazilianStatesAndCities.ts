// Brazilian states data
export const brazilianStates = [
  { code: "AC", name: "Acre" },
  { code: "AL", name: "Alagoas" },
  { code: "AP", name: "Amapá" },
  { code: "AM", name: "Amazonas" },
  { code: "BA", name: "Bahia" },
  { code: "CE", name: "Ceará" },
  { code: "DF", name: "Distrito Federal" },
  { code: "ES", name: "Espírito Santo" },
  { code: "GO", name: "Goiás" },
  { code: "MA", name: "Maranhão" },
  { code: "MT", name: "Mato Grosso" },
  { code: "MS", name: "Mato Grosso do Sul" },
  { code: "MG", name: "Minas Gerais" },
  { code: "PA", name: "Pará" },
  { code: "PB", name: "Paraíba" },
  { code: "PR", name: "Paraná" },
  { code: "PE", name: "Pernambuco" },
  { code: "PI", name: "Piauí" },
  { code: "RJ", name: "Rio de Janeiro" },
  { code: "RN", name: "Rio Grande do Norte" },
  { code: "RS", name: "Rio Grande do Sul" },
  { code: "RO", name: "Rondônia" },
  { code: "RR", name: "Roraima" },
  { code: "SC", name: "Santa Catarina" },
  { code: "SP", name: "São Paulo" },
  { code: "SE", name: "Sergipe" },
  { code: "TO", name: "Tocantins" },
];

// Cities by state
type CityData = {
  name: string;
  state: string;
};

// Map of cities by state
const citiesByState: Record<string, string[]> = {
  AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
  AL: ["Maceió", "Arapiraca", "Rio Largo", "Palmeira dos Índios", "Penedo"],
  AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
  AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
  BA: [
    "Salvador",
    "Feira de Santana",
    "Vitória da Conquista",
    "Camaçari",
    "Juazeiro",
  ],
  CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
  DF: ["Brasília", "Ceilândia", "Taguatinga", "Samambaia", "Plano Piloto"],
  ES: ["Vitória", "Vila Velha", "Cariacica", "Serra", "Linhares"],
  GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia"],
  MA: ["São Luís", "Imperatriz", "Timon", "Caxias", "Codó"],
  MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
  MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
  MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim"],
  PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal"],
  PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
  PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
  PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
  PI: ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano"],
  RJ: [
    "Rio de Janeiro",
    "São Gonçalo",
    "Duque de Caxias",
    "Nova Iguaçu",
    "Niterói",
  ],
  RN: [
    "Natal",
    "Mossoró",
    "Parnamirim",
    "São Gonçalo do Amarante",
    "Ceará-Mirim",
  ],
  RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
  RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"],
  RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Pacaraima", "Cantá"],
  SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó"],
  SP: [
    "São Paulo",
    "Guarulhos",
    "Campinas",
    "São Bernardo do Campo",
    "Santo André",
  ],
  SE: [
    "Aracaju",
    "Nossa Senhora do Socorro",
    "Lagarto",
    "Itabaiana",
    "São Cristóvão",
  ],
  TO: [
    "Palmas",
    "Araguaína",
    "Gurupi",
    "Porto Nacional",
    "Paraíso do Tocantins",
  ],
};

// Function to get all cities with their respective states
export const brazilianCities: CityData[] = Object.entries(
  citiesByState,
).flatMap(([state, cities]) => cities.map((city) => ({ name: city, state })));

// Function to get cities by state code
export const getCitiesByState = (stateCode: string): string[] => {
  return citiesByState[stateCode] || [];
};
