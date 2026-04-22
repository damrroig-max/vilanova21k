import { useState, useEffect } from "react";
import './index.css';

const RACE_DATE = new Date("2026-12-15");
const START_DATE = new Date("2026-05-01");
const USERS = ["David", "Marta"];

function generatePlan() {
  const plan = {};
  const phases = [
    {
      name: "Base",
      months: [4, 5],
      daysPerWeek: [1, 3, 5],
      workouts: [
        { type: "Rodaje suave", desc: "Alterna 2 min corriendo / 1 min caminando. Mantén un ritmo cómodo donde puedas hablar.", durationMin: 25, km: 3, tip: "¡El primer paso es el más difícil! Felicidades por empezar." },
        { type: "Series cortas", desc: "Calienta 5 min caminando. Haz 6 x 2 min corriendo suave con 1 min de pausa caminando. Enfría 5 min.", durationMin: 30, km: 3.5, tip: "No te preocupes por el ritmo, solo por completar las series." },
        { type: "Tirada larga", desc: "Alterna 3 min corriendo / 1 min caminando durante toda la sesión. Ritmo muy cómodo.", durationMin: 35, km: 4, tip: "La tirada larga es el corazón del plan. ¡A por ella!" },
      ],
    },
    {
      name: "Construcción",
      months: [6, 7],
      daysPerWeek: [1, 3, 5, 6],
      workouts: [
        { type: "Rodaje continuo", desc: "Corre sin parar a ritmo conversacional. Si necesitas caminar, hazlo 30 seg y retoma.", durationMin: 35, km: 5, tip: "Ya corres sin parar. Eso es enorme, ¡felicidades!" },
        { type: "Fartlek", desc: "Calienta 5 min. Alterna 1 min rápido / 2 min suave durante 20 min. Enfría 5 min.", durationMin: 30, km: 5, tip: "El fartlek mejora tu capacidad aeróbica rápidamente." },
        { type: "Rodaje medio", desc: "Corre continuo a ritmo suave-moderado. Mantén la respiración controlada.", durationMin: 40, km: 6, tip: "En verano sal muy temprano o al atardecer. ¡Hidrátate bien!" },
        { type: "Tirada larga", desc: "Corre continuo a ritmo suave. Si necesitas pausas de 30 seg, úsalas sin culpa.", durationMin: 55, km: 8, tip: "Comer algo ligero 1h antes y llevar agua si hace calor." },
      ],
    },
    {
      name: "Desarrollo",
      months: [8, 9],
      daysPerWeek: [1, 3, 5, 6],
      workouts: [
        { type: "Rodaje suave", desc: "Ritmo cómodo, sin prisas. Este es el entreno de recuperación activa.", durationMin: 40, km: 6, tip: "Los días suaves son tan importantes como los intensos." },
        { type: "Series 1km", desc: "Calienta 10 min. Haz 4 x 1km a ritmo esfuerzo moderado-alto con 2 min pausa. Enfría 10 min.", durationMin: 45, km: 7, tip: "Las series te enseñarán tu ritmo objetivo de carrera." },
        { type: "Rodaje medio", desc: "40-45 min continuos a ritmo cómodo-moderado. Mantén regularidad.", durationMin: 45, km: 7.5, tip: "Septiembre trae mejores temperaturas. ¡A disfrutarlo!" },
        { type: "Tirada larga", desc: "El día grande de la semana. Ritmo muy suave, no importa el tiempo. Lleva agua e hidratación.", durationMin: 75, km: 12, tip: "¡12km! Ya ves la media maratón mucho más cerca." },
      ],
    },
    {
      name: "Específica",
      months: [10, 11],
      daysPerWeek: [1, 3, 5, 6],
      workouts: [
        { type: "Rodaje suave", desc: "Ritmo muy cómodo, conversacional. Mantén el cuerpo activo sin fatigarlo.", durationMin: 40, km: 6, tip: "El descanso activo es parte del entrenamiento." },
        { type: "Tempo 20 min", desc: "Calienta 10 min suave. Corre 20 min a ritmo 'duro pero sostenible'. Enfría 10 min.", durationMin: 40, km: 8, tip: "El ritmo tempo es el que llevarás en carrera. ¡Practica!" },
        { type: "Rodaje medio", desc: "50 min continuos a ritmo moderado. Fuerza y resistencia.", durationMin: 50, km: 8.5, tip: "Ya tienes una base sólida. Confía en el trabajo hecho." },
        { type: "Tirada larga", desc: "La tirada más larga del plan. Ritmo suave, disfruta el paisaje. Gel o dátiles en el bolsillo.", durationMin: 110, km: 17, tip: "¡17km! La media ya no da miedo. Eres corredores." },
      ],
    },
    {
      name: "Tapering",
      months: [11],
      daysPerWeek: [1, 4],
      workouts: [
        { type: "Rodaje suave", desc: "Muy suave, muy corto. El cuerpo se carga de energía esta semana.", durationMin: 25, km: 4, tip: "Descansa, come bien, duerme mucho. La carrera ya está ganada." },
        { type: "Activación", desc: "20 min suaves con 4-5 aceleraciones de 20 seg. Solo para mantener las piernas activas.", durationMin: 20, km: 3, tip: "¡El domingo 15 de diciembre es vuestro día!" },
      ],
    },
  ];

  let workoutRotation = 0;
  const current = new Date(START_DATE);

  while (current <= RACE_DATE) {
    const month = current.getMonth();
    const dayOfWeek = current.getDay();

    let phase = phases[0];
    if (month >= 10) phase = phases[4];
    else if (month >= 8) phase = phases[3];
    else if (month >= 6) phase = phases[2];
    else if (month >= 4) phase = phases[1];

    const dateKey = current.toISOString().split("T")[0];

    if (phase.daysPerWeek.includes(dayOfWeek)) {
      const workout = phase.workouts[workoutRotation % phase.workouts.length];
      workoutRotation++;
      plan[dateKey] = { phase: phase.name, ...workout, rest: false };
    } else if (dayOfWeek === 0) {
      plan[dateKey] = { rest: true, type: "Descanso", desc: "Recuperación total. Estiramientos suaves si quieres.", durationMin: 0, km: 0, tip: "El descanso es donde el cuerpo mejora de verdad.", phase: phase.name };
    }

    current.setDate(current.getDate() + 1);
  }

  return plan;
}

const PLAN = generatePlan();

function getDaysUntilRace() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = RACE_DATE - today;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const MONTHS = ["Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const MONTH_INDICES = [4, 5, 6, 7, 8, 9, 10, 11];
const DAY_NAMES = ["L", "M", "X", "J", "V", "S", "D"];
const DAY_NAMES_FULL = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const PHASE_COLORS = {
  Base: "#4ade80",
  Construcción: "#60a5fa",
  Desarrollo: "#f59e0b",
  Específica: "#f97316",
  Tapering: "#c084fc",
};

const TYPE_ICONS = {
  "Rodaje suave": "🏃",
  "Series cortas": "⚡",
  "Tirada larga": "🌟",
  "Rodaje continuo": "🏃",
  Fartlek: "⚡",
  "Rodaje medio": "🏃",
  "Series 1km": "⚡",
  "Tempo 20 min": "🔥",
  Activación: "✨",
  Descanso: "💤",
};

export default function App() {
  const [activeUser, setActiveUser] = useState("David");
  const [activeMonth, setActiveMonth] = useState(4);
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem("vilanova_data");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const init = {};
    USERS.forEach((u) => { init[u] = {}; });
    return init;
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [view, setView] = useState("calendar");
  const daysLeft = getDaysUntilRace();

  useEffect(() => {
    try {
      localStorage.setItem("vilanova_data", JSON.stringify(userData));
    } catch (e) {}
  }, [userData]);

  const toggleComplete = (dateKey) => {
    setUserData((prev) => {
      const u = { ...prev[activeUser] };
      u[dateKey] = { ...u[dateKey], completed: !u[dateKey]?.completed };
      return { ...prev, [activeUser]: u };
    });
  };

  const saveNote = (dateKey) => {
    setUserData((prev) => {
      const u = { ...prev[activeUser] };
      u[dateKey] = { ...u[dateKey], note: noteInput };
      return { ...prev, [activeUser]: u };
    });
    setSelectedDay(null);
    setNoteInput("");
  };

  const getMonthDays = (monthIdx) => {
    const year = 2026;
    const days = [];
    const firstDay = new Date(year, monthIdx, 1);
    const lastDay = new Date(year, monthIdx + 1, 0);
    let startPad = firstDay.getDay() - 1;
    if (startPad < 0) startPad = 6;
    for (let i = 0; i < startPad; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, monthIdx, d));
    }
    return days;
  };

  const getStats = () => {
    const ud = userData[activeUser] || {};
    let totalKm = 0, completedCount = 0, plannedCount = 0;
    Object.entries(PLAN).forEach(([key, workout]) => {
      if (!workout.rest) {
        plannedCount++;
        if (ud[key]?.completed) { completedCount++; totalKm += workout.km; }
      }
    });
    const monthDays = getMonthDays(activeMonth);
    let monthKm = 0, monthCompleted = 0, monthPlanned = 0;
    monthDays.forEach((d) => {
      if (!d) return;
      const key = d.toISOString().split("T")[0];
      const w = PLAN[key];
      if (w && !w.rest) {
        monthPlanned++;
        if (ud[key]?.completed) { monthCompleted++; monthKm += w.km; }
      }
    });
    return { totalKm, completedCount, plannedCount, monthKm, monthCompleted, monthPlanned };
  };

  const stats = getStats();
  const days = getMonthDays(activeMonth);

  const openDay = (dateKey) => {
    setSelectedDay(dateKey);
    setNoteInput(userData[activeUser]?.[dateKey]?.note || "");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#f0ece4", fontFamily: "'DM Mono', 'Courier New', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:wght@700;900&display=swap');
        .day-cell { transition: transform 0.15s ease; cursor: pointer; }
        .day-cell:active { transform: scale(0.96); }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .pulse { animation: pulse 2s infinite; }
        textarea:focus { outline: 1px solid #f97316 !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: "#0f0f1a", borderBottom: "1px solid #1e1e3a", padding: "16px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: "#f0ece4" }}>🏃 Vilanova 21K</div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em" }}>MEDIA MARATÓN · 15 DIC 2026</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div className="pulse" style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "#f97316", lineHeight: 1 }}>{daysLeft}</div>
            <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.1em" }}>DÍAS</div>
          </div>
        </div>

        {/* User tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {USERS.map((u) => (
            <button key={u} onClick={() => setActiveUser(u)} style={{
              flex: 1, padding: "8px", borderRadius: 6,
              border: activeUser === u ? "1.5px solid #f97316" : "1.5px solid #2a2a3a",
              background: activeUser === u ? "#f9731615" : "transparent",
              color: activeUser === u ? "#f97316" : "#555",
              cursor: "pointer", fontSize: 13, fontFamily: "inherit",
              fontWeight: activeUser === u ? 500 : 300,
            }}>
              {u}
            </button>
          ))}
        </div>

        {/* Nav */}
        <div style={{ display: "flex", gap: 16 }}>
          {[["calendar", "📅 Calendario"], ["stats", "📊 Progreso"]].map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: view === v ? "#f97316" : "#555",
              fontFamily: "inherit", fontSize: 12, letterSpacing: "0.06em",
              fontWeight: view === v ? 500 : 300,
              borderBottom: view === v ? "2px solid #f97316" : "2px solid transparent",
              paddingBottom: 4,
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        {view === "calendar" && (
          <div className="fade-in">
            {/* Month selector - horizontal scroll */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 16, scrollbarWidth: "none" }}>
              {MONTHS.map((m, i) => {
                const mi = MONTH_INDICES[i];
                return (
                  <button key={m} onClick={() => setActiveMonth(mi)} style={{
                    padding: "6px 12px", borderRadius: 4, flexShrink: 0,
                    border: activeMonth === mi ? "1.5px solid #f97316" : "1.5px solid #2a2a3a",
                    background: activeMonth === mi ? "#f9731615" : "#111118",
                    color: activeMonth === mi ? "#f97316" : "#555",
                    cursor: "pointer", fontSize: 11, fontFamily: "inherit",
                    letterSpacing: "0.06em",
                  }}>
                    {m.slice(0, 3).toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* Phase legend */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              {Object.entries(PHASE_COLORS).map(([phase, color]) => (
                <div key={phase} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, color: "#666" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                  {phase.toUpperCase()}
                </div>
              ))}
            </div>

            {/* Calendar */}
            <div style={{ background: "#0f0f1a", borderRadius: 8, border: "1px solid #1e1e3a", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid #1e1e3a" }}>
                {DAY_NAMES.map((d) => (
                  <div key={d} style={{ padding: "8px 2px", textAlign: "center", fontSize: 10, color: "#444" }}>{d}</div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
                {days.map((date, idx) => {
                  if (!date) return <div key={`pad-${idx}`} style={{ minHeight: 72, borderRight: "1px solid #1a1a2a", borderBottom: "1px solid #1a1a2a" }} />;
                  const key = date.toISOString().split("T")[0];
                  const workout = PLAN[key];
                  const ud = userData[activeUser]?.[key] || {};
                  const isRace = key === "2026-12-15";
                  const isToday = key === new Date().toISOString().split("T")[0];
                  const phaseColor = workout ? PHASE_COLORS[workout.phase] : "#333";

                  return (
                    <div key={key} className={workout && !workout.rest ? "day-cell" : ""}
                      onClick={() => workout && !workout.rest && openDay(key)}
                      style={{
                        padding: "6px 4px", minHeight: 72,
                        borderRight: "1px solid #1a1a2a", borderBottom: "1px solid #1a1a2a",
                        background: isRace ? "#f9731610" : isToday ? "#ffffff05" : "transparent",
                        position: "relative",
                      }}>
                      <div style={{ fontSize: 10, color: isToday ? "#f97316" : isRace ? "#f59e0b" : "#555", marginBottom: 3, fontWeight: isToday ? 500 : 300 }}>
                        {date.getDate()}{isRace && "🏅"}
                      </div>
                      {workout && !workout.rest && (
                        <>
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: phaseColor, marginBottom: 3, opacity: ud.completed ? 1 : 0.4 }} />
                          <div style={{ fontSize: 13 }}>{TYPE_ICONS[workout.type]}</div>
                          <div style={{ fontSize: 8, color: ud.completed ? phaseColor : "#3a3a4a", marginTop: 2 }}>{workout.km}k</div>
                          {ud.completed && <div style={{ position: "absolute", top: 4, right: 3, fontSize: 9 }}>✅</div>}
                          {ud.note && <div style={{ position: "absolute", bottom: 3, right: 3, fontSize: 8 }}>💬</div>}
                        </>
                      )}
                      {workout?.rest && <div style={{ fontSize: 12, marginTop: 4 }}>💤</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Month stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 14 }}>
              {[
                { label: "KM MES", value: `${stats.monthKm}`, unit: "km", color: "#4ade80" },
                { label: "ENTRENOS", value: `${stats.monthCompleted}/${stats.monthPlanned}`, color: "#60a5fa" },
                { label: "TOTAL", value: `${stats.totalKm}`, unit: "km", color: "#f97316" },
              ].map(({ label, value, unit, color }) => (
                <div key={label} style={{ background: "#0f0f1a", border: "1px solid #1e1e3a", borderRadius: 6, padding: "12px 10px" }}>
                  <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color }}>{value}<span style={{ fontSize: 10, color: "#666" }}>{unit}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === "stats" && (
          <div className="fade-in">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Progreso de {activeUser}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "KM CORRIDOS", value: stats.totalKm, unit: "km", color: "#4ade80" },
                { label: "COMPLETADOS", value: stats.completedCount, unit: `de ${stats.plannedCount}`, color: "#60a5fa" },
                { label: "DÍAS RESTANTES", value: daysLeft, unit: "días", color: "#f97316" },
                { label: "PROGRESO", value: stats.plannedCount > 0 ? Math.round((stats.completedCount / stats.plannedCount) * 100) : 0, unit: "%", color: "#c084fc" },
              ].map(({ label, value, unit, color }) => (
                <div key={label} style={{ background: "#0f0f1a", border: "1px solid #1e1e3a", borderRadius: 8, padding: "16px" }}>
                  <div style={{ fontSize: 9, color: "#555", letterSpacing: "0.1em", marginBottom: 6 }}>{label}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color }}>{value}</span>
                    <span style={{ fontSize: 11, color: "#666" }}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar to 21km */}
            <div style={{ background: "#0f0f1a", border: "1px solid #1e1e3a", borderRadius: 8, padding: "16px", marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 10 }}>CAMINO A VILANOVA 🏅</div>
              <div style={{ background: "#1a1a2a", borderRadius: 4, height: 10, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #4ade80, #f97316)",
                  borderRadius: 4,
                  width: `${Math.min(100, (stats.totalKm / 21) * 100)}%`,
                  transition: "width 0.5s ease",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "#555" }}>
                <span>0km</span>
                <span style={{ color: "#f97316" }}>{stats.totalKm}km</span>
                <span>21km 🏅</span>
              </div>
            </div>

            {/* Phase breakdown */}
            <div style={{ background: "#0f0f1a", border: "1px solid #1e1e3a", borderRadius: 8, padding: "16px" }}>
              <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 14 }}>POR FASES</div>
              {Object.entries(PHASE_COLORS).map(([phase, color]) => {
                const phaseWorkouts = Object.entries(PLAN).filter(([, w]) => w.phase === phase && !w.rest);
                const pCompleted = phaseWorkouts.filter(([key]) => userData[activeUser]?.[key]?.completed).length;
                const pTotal = phaseWorkouts.length;
                return (
                  <div key={phase} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
                      <span style={{ color }}>{phase}</span>
                      <span style={{ color: "#555" }}>{pCompleted}/{pTotal}</span>
                    </div>
                    <div style={{ background: "#1a1a2a", borderRadius: 2, height: 5 }}>
                      <div style={{ height: "100%", background: color, borderRadius: 2, width: `${pTotal > 0 ? (pCompleted / pTotal) * 100 : 0}%`, transition: "width 0.4s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Day detail modal */}
      {selectedDay && PLAN[selectedDay] && (
        <div onClick={(e) => e.target === e.currentTarget && setSelectedDay(null)}
          style={{ position: "fixed", inset: 0, background: "#000000dd", display: "flex", alignItems: "flex-end", zIndex: 100 }}>
          <div className="fade-in" style={{
            background: "#0f0f1a", border: "1px solid #2a2a3a",
            borderRadius: "16px 16px 0 0", padding: "24px 20px",
            width: "100%", maxHeight: "85vh", overflowY: "auto",
          }}>
            {(() => {
              const w = PLAN[selectedDay];
              const ud = userData[activeUser]?.[selectedDay] || {};
              const date = new Date(selectedDay + "T12:00:00");
              const phaseColor = PHASE_COLORS[w.phase] || "#666";
              const dayIdx = (date.getDay() + 6) % 7;

              return (
                <>
                  {/* Handle bar */}
                  <div style={{ width: 36, height: 4, background: "#2a2a3a", borderRadius: 2, margin: "0 auto 20px" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 4 }}>
                        {DAY_NAMES_FULL[dayIdx].toUpperCase()} · {date.getDate()} {MONTHS[MONTH_INDICES.indexOf(date.getMonth())].toUpperCase()}
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700 }}>
                        {TYPE_ICONS[w.type]} {w.type}
                      </div>
                      <div style={{ fontSize: 10, color: phaseColor, marginTop: 3, letterSpacing: "0.06em" }}>FASE {w.phase.toUpperCase()}</div>
                    </div>
                    <button onClick={() => setSelectedDay(null)} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 24, padding: "0 4px" }}>×</button>
                  </div>

                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                    {[{ label: "DURACIÓN", value: `${w.durationMin}`, unit: "min" }, { label: "DISTANCIA", value: `${w.km}`, unit: "km" }].map(({ label, value, unit }) => (
                      <div key={label} style={{ flex: 1, background: "#1a1a2a", borderRadius: 8, padding: "12px" }}>
                        <div style={{ fontSize: 9, color: "#555", marginBottom: 4 }}>{label}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: phaseColor }}>
                          {value}<span style={{ fontSize: 11, color: "#666" }}>{unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#1a1a2a", borderRadius: 8, padding: "14px", marginBottom: 14 }}>
                    <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.7 }}>{w.desc}</div>
                  </div>

                  <div style={{ borderLeft: `3px solid ${phaseColor}`, paddingLeft: 12, marginBottom: 18, fontSize: 12, color: "#888", fontStyle: "italic", lineHeight: 1.5 }}>
                    {w.tip}
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", marginBottom: 8 }}>NOTAS / SENSACIONES</div>
                    <textarea
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="¿Cómo te sentiste? ¿Algún dolor? ¿El clima?"
                      rows={3}
                      style={{
                        width: "100%", background: "#1a1a2a", border: "1px solid #2a2a3a",
                        borderRadius: 8, padding: "12px", color: "#f0ece4",
                        fontFamily: "inherit", fontSize: 12, resize: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => toggleComplete(selectedDay)} style={{
                      flex: 1, padding: "14px",
                      background: ud.completed ? "#4ade8020" : "#f9731620",
                      border: `1.5px solid ${ud.completed ? "#4ade80" : "#f97316"}`,
                      borderRadius: 8, color: ud.completed ? "#4ade80" : "#f97316",
                      cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
                    }}>
                      {ud.completed ? "✅ Completado" : "Marcar completado"}
                    </button>
                    <button onClick={() => saveNote(selectedDay)} style={{
                      padding: "14px 18px", background: "#1a1a2a",
                      border: "1.5px solid #2a2a3a", borderRadius: 8, color: "#888",
                      cursor: "pointer", fontFamily: "inherit", fontSize: 13,
                    }}>
                      Guardar
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
