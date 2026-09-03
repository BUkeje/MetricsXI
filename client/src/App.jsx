import { useState } from "react";
import "./App.css";

const players = [
  {
    id: 1,
    name: "Erling Haaland",
    positions: ["ST"],
    team: "Manchester City",
    stats: {
      appearances: 31,
      goals: 0.89,
      assists: 0.14,
      xG: 0.84,
      xA: 0.11,
      progressivePasses: 1.72,
      tackles: 0.31,
    },
  },
  {
    id: 2,
    name: "Harry Kane",
    positions: ["ST"],
    team: "Bayern Munich",
    stats: {
      appearances: 32,
      goals: 0.91,
      assists: 0.28,
      xG: 0.79,
      xA: 0.24,
      progressivePasses: 3.45,
      tackles: 0.39,
    },
  },
  {
    id: 3,
    name: "Vinícius Júnior",
    positions: ["LW"],
    team: "Real Madrid",
    stats: {
      appearances: 28,
      goals: 0.68,
      assists: 0.41,
      xG: 0.61,
      xA: 0.36,
      progressivePasses: 4.82,
      tackles: 0.54,
    },
  },
  {
    id: 4,
    name: "Mohamed Salah",
    positions: ["RW"],
    team: "Liverpool",
    stats: {
      appearances: 30,
      goals: 0.74,
      assists: 0.48,
      xG: 0.69,
      xA: 0.43,
      progressivePasses: 5.13,
      tackles: 0.46,
    },
  },
  {
    id: 5,
    name: "Jude Bellingham",
    positions: ["CM", "CAM"],
    team: "Real Madrid",
    stats: {
      appearances: 29,
      goals: 0.43,
      assists: 0.35,
      xG: 0.38,
      xA: 0.31,
      progressivePasses: 6.91,
      tackles: 1.72,
    },
  },
  {
    id: 6,
    name: "Kevin De Bruyne",
    positions: ["CM", "CAM"],
    team: "Manchester City",
    stats: {
      appearances: 24,
      goals: 0.31,
      assists: 0.73,
      xG: 0.28,
      xA: 0.61,
      progressivePasses: 8.42,
      tackles: 1.08,
    },
  },
  {
    id: 7,
    name: "Rodri",
    positions: ["CDM", "CM"],
    team: "Manchester City",
    stats: {
      appearances: 30,
      goals: 0.24,
      assists: 0.29,
      xG: 0.17,
      xA: 0.25,
      progressivePasses: 10.41,
      tackles: 2.14,
    },
  },
  {
    id: 8,
    name: "Declan Rice",
    positions: ["CDM", "CM"],
    team: "Arsenal",
    stats: {
      appearances: 34,
      goals: 0.18,
      assists: 0.24,
      xG: 0.13,
      xA: 0.19,
      progressivePasses: 7.62,
      tackles: 2.28,
    },
  },
  {
    id: 9,
    name: "Alphonso Davies",
    positions: ["LB", "LM"],
    team: "Bayern Munich",
    stats: {
      appearances: 27,
      goals: 0.08,
      assists: 0.22,
      xG: 0.06,
      xA: 0.19,
      progressivePasses: 6.84,
      tackles: 1.91,
    },
  },
  {
    id: 10,
    name: "William Saliba",
    positions: ["CB"],
    team: "Arsenal",
    stats: {
      appearances: 35,
      goals: 0.06,
      assists: 0.03,
      xG: 0.05,
      xA: 0.02,
      progressivePasses: 4.93,
      tackles: 1.42,
    },
  },
  {
    id: 11,
    name: "Virgil van Dijk",
    positions: ["CB"],
    team: "Liverpool",
    stats: {
      appearances: 33,
      goals: 0.09,
      assists: 0.04,
      xG: 0.11,
      xA: 0.03,
      progressivePasses: 5.74,
      tackles: 1.21,
    },
  },
  {
    id: 12,
    name: "Achraf Hakimi",
    positions: ["RB", "RM"],
    team: "PSG",
    stats: {
      appearances: 29,
      goals: 0.17,
      assists: 0.34,
      xG: 0.14,
      xA: 0.29,
      progressivePasses: 7.18,
      tackles: 1.67,
    },
  },
  {
    id: 13,
    name: "Alisson",
    positions: ["GK"],
    team: "Liverpool",
    stats: {
      appearances: 28,
      goalsAgainst: 0.82,
      savePercentage: 76.4,
      cleanSheets: 0.41,
      passesCompleted: 31.8,
      progressivePasses: 2.71,
      tackles: 0.02,
    },
  },
];

const formations = {
  "4-3-3": [
    ["LW", "ST", "RW"],
    ["CM", "CDM", "CM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "4-2-3-1": [
    ["ST"],
    ["LW", "CAM", "RW"],
    ["CDM", "CDM"],
    ["LB", "CB", "CB", "RB"],
    ["GK"],
  ],
  "3-4-3": [
    ["LW", "ST", "RW"],
    ["LM", "CM", "CM", "RM"],
    ["CB", "CB", "CB"],
    ["GK"],
  ],
};

function App() {
  const [formation, setFormation] = useState("4-3-3");
  const [lineup, setLineup] = useState({});
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  function changeFormation(event) {
    setFormation(event.target.value);
    setLineup({});
    setSelectedPlayer(null);
  }

  function selectPlayer(slotId, playerId) {
    const updatedLineup = {
      ...lineup,
      [slotId]: playerId,
    };

    setLineup(updatedLineup);

    const player = players.find(
      (currentPlayer) => currentPlayer.id === Number(playerId)
    );

    setSelectedPlayer(player || null);
  }

  function getPlayersForPosition(position) {
    return players.filter((player) =>
      player.positions.includes(position)
    );
  }

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">BUILD YOUR XI</p>
          <h1>MetricsXI</h1>
          <p className="subtitle">
            Select a formation, build your lineup, and compare player output.
          </p>
        </div>

        <label className="formation-control">
          Formation
          <select value={formation} onChange={changeFormation}>
            {Object.keys(formations).map((formationName) => (
              <option key={formationName} value={formationName}>
                {formationName}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="dashboard">
        <div className="pitch">
          <div className="halfway-line" />
          <div className="center-circle" />
          <div className="top-box" />
          <div className="bottom-box" />

          <div className="formation">
            {formations[formation].map((row, rowIndex) => (
              <div className="formation-row" key={`${formation}-${rowIndex}`}>
                {row.map((position, positionIndex) => {
                  const slotId = `${rowIndex}-${positionIndex}`;

                  return (
                    <div className="player-slot" key={slotId}>
                      <span className="position-label">{position}</span>

                      <select
                        value={lineup[slotId] || ""}
                        onChange={(event) =>
                          selectPlayer(slotId, event.target.value)
                        }
                      >
                        <option value="">Select player</option>

                        {getPlayersForPosition(position).map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <aside className="stats-panel">
          {selectedPlayer ? (
            <>
              <div className="player-heading">
                <span className="player-avatar">
                  {selectedPlayer.name.charAt(0)}
                </span>

                <div>
                  <p className="position-text">
                    {selectedPlayer.positions.join(" / ")}
                  </p>
                  <h2>{selectedPlayer.name}</h2>
                  <p>{selectedPlayer.team}</p>
                </div>
              </div>

              <h3>Per 90 statistics</h3>

              <div className="stats-grid">
                <StatCard
                  label="Goals"
                  value={selectedPlayer.stats.goals ?? "—"}
                />
                <StatCard
                  label="Assists"
                  value={selectedPlayer.stats.assists ?? "—"}
                />
                <StatCard
                  label="Expected Goals"
                  value={selectedPlayer.stats.xG ?? "—"}
                />
                <StatCard
                  label="Expected Assists"
                  value={selectedPlayer.stats.xA ?? "—"}
                />
                <StatCard
                  label="Progressive Passes"
                  value={selectedPlayer.stats.progressivePasses ?? "—"}
                />
                <StatCard
                  label="Tackles"
                  value={selectedPlayer.stats.tackles ?? "—"}
                />
              </div>

              <p className="appearances">
                Based on {selectedPlayer.stats.appearances} appearances
              </p>
            </>
          ) : (
            <div className="empty-stats">
              <span>XI</span>
              <h2>Select a player</h2>
              <p>
                Choose a player from the formation to see their per-90
                statistics.
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>per 90</small>
    </div>
  );
}

export default App;