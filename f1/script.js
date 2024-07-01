const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZmNqbXR6bXF6cnFza3VpYm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyNjI3MTksImV4cCI6MjAzNDgzODcxOX0.e2SuaeIgHhUWKbWGAZeea2I5e5Ne7mLPlp2a5VSNBMY";
const DATA_URL = "https://gmfcjmtzmqzrqskuibmk.supabase.co/rest/v1/2024";

async function getData() {
  try {
    const response = await fetch(DATA_URL, { headers: { apikey: API_KEY } });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    json.sort(function (a, b) {
      if (a["2024_points"] === b["2024_points"]) {
        return a["highest_2024_finish"] - b["highest_2024_finish"];
      }
      return b["2024_points"] - a["2024_points"];
    });

    buildDriversTable(json);
    buildConstructorsTable(json);
  } catch (error) {
    console.log(error.message);
  }
}

function buildDriversTable(driverArray) {
  const tableBody = document.getElementById("drivers-table").firstElementChild;

  const htmlArray = driverArray.map(
    (driver) => `
      <tr>
        <td>${driver.driver}</td>
        <td>${driver["2024_points"]}</td>
        <td>${driver["2024_team"] ?? "-"}</td>
        <td>${driver["2025_team"] ?? "-"}</td>
      </tr>
    `
  );
  const html = htmlArray.join("");
  tableBody.insertAdjacentHTML("beforeEnd", html);
}

function buildConstructorsTable(driverArray) {
  const tableBody =
    document.getElementById("constructors-table").firstElementChild;

  var pointsArray = [];

  const teams = [
    ...new Set(driverArray.map((driver) => driver["2024_points_team"])),
  ];

  teams.forEach((team) =>
    pointsArray.push({
      name: team,
      points: driverArray
        .filter((driver) => driver["2024_points_team"] === team)
        .reduce(function (a, b) {
          return a + b["2024_points"];
        }, 0),
    })
  );

  pointsArray.sort((a, b) => b["points"] - a["points"]);

  pointsArray.forEach((team) =>
    tableBody.insertAdjacentHTML(
      "beforeEnd",
      `
      <tr>
        <td>${team.name}</td>
        <td>${team.points}</td>
      </tr>
    `
    )
  );
}

getData();
