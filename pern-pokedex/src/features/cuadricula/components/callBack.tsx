import { useCallback, useState, memo } from "react";
import type { PokemonSimple } from "./pokemon.dummy";

// Interfaz para el estado de la batalla
interface EstadoBatalla {
  pokemon1: PokemonSimple;
  pokemon2: PokemonSimple;
  turno: number;
  ganador: string | null;
}

/**
 * EJEMPLO DE useCallback
 *
 * useCallback es un hook de React que memoriza una función para evitar que se cree
 * una nueva instancia en cada render. Esto es útil cuando:
 *
 * 1. Pasamos funciones como props a componentes hijos memorizados (con memo())
 * 2. Queremos evitar re-renders innecesarios
 * 3. La función se usa como dependencia en otros hooks (useEffect, useMemo, etc.)
 *
 * Sintaxis: useCallback(función, [dependencias])
 * - La función se memorizará y solo se recreará si alguna dependencia cambia
 */

// Componente hijo memorizado con React.memo
// Solo se re-renderiza si sus props cambian
const ComponenteBatalla = memo(
  ({
    batalla,
    onAtacar,
    onReiniciar,
  }: {
    batalla: EstadoBatalla;
    onAtacar: () => void;
    onReiniciar: () => void;
  }) => {
    console.log("🔄 ComponenteBatalla renderizado"); // Para ver cuándo se re-renderiza

    const { pokemon1, pokemon2, turno, ganador } = batalla;

    return (
      <div
        style={{
          border: "2px solid #333",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#e74c3c" }}>
          ⚔️ Batalla Pokémon ⚔️
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          {/* Pokemon 1 */}
          <div style={{ textAlign: "center" }}>
            <img
              src={pokemon1.artwork_url}
              alt={pokemon1.name}
              style={{ width: "150px", height: "150px" }}
            />
            <h3 style={{ textTransform: "capitalize" }}>{pokemon1.name}</h3>
            <div
              style={{
                width: "200px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${
                    ((pokemon1.vidaActual || 0) / (pokemon1.vida || 100)) * 100
                  }%`,
                  height: "20px",
                  backgroundColor:
                    pokemon1.vidaActual! > 30 ? "#2ecc71" : "#e74c3c",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p>
              HP: {pokemon1.vidaActual || 0}/{pokemon1.vida || 100}
            </p>
          </div>

          {/* VS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "3em",
              fontWeight: "bold",
            }}
          >
            VS
          </div>

          {/* Pokemon 2 */}
          <div style={{ textAlign: "center" }}>
            <img
              src={pokemon2.artwork_url}
              alt={pokemon2.name}
              style={{ width: "150px", height: "150px" }}
            />
            <h3 style={{ textTransform: "capitalize" }}>{pokemon2.name}</h3>
            <div
              style={{
                width: "200px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${
                    ((pokemon2.vidaActual || 0) / (pokemon2.vida || 100)) * 100
                  }%`,
                  height: "20px",
                  backgroundColor:
                    pokemon2.vidaActual! > 30 ? "#2ecc71" : "#e74c3c",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p>
              HP: {pokemon2.vidaActual || 0}/{pokemon2.vida || 100}
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            Turno: {turno}
          </p>

          {ganador ? (
            <div>
              <h2 style={{ color: "#27ae60" }}>
                🏆 ¡{ganador} ha ganado la batalla! 🏆
              </h2>
              <button
                onClick={onReiniciar}
                style={{
                  padding: "10px 20px",
                  fontSize: "1em",
                  cursor: "pointer",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                🔄 Reiniciar Batalla
              </button>
            </div>
          ) : (
            <button
              onClick={onAtacar}
              style={{
                padding: "15px 30px",
                fontSize: "1.2em",
                cursor: "pointer",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              ⚡ Atacar
            </button>
          )}
        </div>
      </div>
    );
  }
);

ComponenteBatalla.displayName = "ComponenteBatalla";

// Componente principal
export function BatallaPokemon({
  pokemon1,
  pokemon2,
}: {
  pokemon1: PokemonSimple;
  pokemon2: PokemonSimple;
}) {
  const [batalla, setBatalla] = useState<EstadoBatalla | null>(null);
  const [contadorRenders, setContadorRenders] = useState(0);

  console.log("🔄 BatallaPokemon renderizado", contadorRenders);

  /**
   * ✅ USO CORRECTO de useCallback
   *
   * Esta función se memoriza y solo se recrea si pokemon1 o pokemon2 cambian.
   * Como ComponenteBatalla está envuelto en memo(), no se re-renderizará
   * innecesariamente cuando el componente padre se re-renderice por otras razones.
   */
  const iniciarBatalla = useCallback(() => {
    console.log("🎮 Iniciando batalla...");
    setBatalla({
      pokemon1: {
        ...pokemon1,
        vidaActual: pokemon1.vida || 100,
        vida: pokemon1.vida || 100,
      },
      pokemon2: {
        ...pokemon2,
        vidaActual: pokemon2.vida || 100,
        vida: pokemon2.vida || 100,
      },
      turno: 1,
      ganador: null,
    });
  }, [pokemon1, pokemon2]); // Solo se recrea si estos cambian

  /**
   * ✅ Otro ejemplo de useCallback
   *
   * Esta función maneja la lógica de ataque. Se memoriza para evitar re-renders
   * innecesarios del ComponenteBatalla.
   */
  const manejarAtaque = useCallback(() => {
    if (!batalla || batalla.ganador) return;

    console.log("⚔️ Atacando en turno", batalla.turno);

    setBatalla((prevBatalla) => {
      if (!prevBatalla) return null;

      // Determinar quién ataca (turnos alternados)
      const esturnoP1 = prevBatalla.turno % 2 !== 0;
      const danio = Math.floor(Math.random() * 30) + 10; // Daño aleatorio entre 10-40

      let nuevaVidaP1 = prevBatalla.pokemon1.vidaActual || 0;
      let nuevaVidaP2 = prevBatalla.pokemon2.vidaActual || 0;

      if (esturnoP1) {
        nuevaVidaP2 = Math.max(0, nuevaVidaP2 - danio);
        console.log(
          `${prevBatalla.pokemon1.name} ataca a ${prevBatalla.pokemon2.name} causando ${danio} de daño`
        );
      } else {
        nuevaVidaP1 = Math.max(0, nuevaVidaP1 - danio);
        console.log(
          `${prevBatalla.pokemon2.name} ataca a ${prevBatalla.pokemon1.name} causando ${danio} de daño`
        );
      }

      // Verificar ganador
      let ganador = null;
      if (nuevaVidaP1 <= 0) ganador = prevBatalla.pokemon2.name;
      if (nuevaVidaP2 <= 0) ganador = prevBatalla.pokemon1.name;

      return {
        ...prevBatalla,
        pokemon1: { ...prevBatalla.pokemon1, vidaActual: nuevaVidaP1 },
        pokemon2: { ...prevBatalla.pokemon2, vidaActual: nuevaVidaP2 },
        turno: prevBatalla.turno + 1,
        ganador,
      };
    });
  }, [batalla]); // Depende del estado actual de la batalla

  /**
   * ✅ useCallback para reiniciar la batalla
   */
  const reiniciarBatalla = useCallback(() => {
    console.log("🔄 Reiniciando batalla...");
    setBatalla(null);
  }, []); // No tiene dependencias, nunca cambia

  // Función para forzar un re-render (ejemplo didáctico)
  const forzarRender = () => {
    setContadorRenders((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>📚 Explicación de useCallback</h3>
        <p>
          <strong>useCallback</strong> memoriza funciones para evitar que se
          creen nuevas instancias en cada render. Esto es especialmente útil
          cuando pasamos funciones como props a componentes memorizados con{" "}
          <code>React.memo()</code>.
        </p>
        <p>
          <strong>Beneficios:</strong>
        </p>
        <ul>
          <li>✅ Evita re-renders innecesarios de componentes hijos</li>
          <li>✅ Mejora el rendimiento en listas grandes</li>
          <li>✅ Previene recreación de funciones costosas</li>
        </ul>
        <p>
          <strong>Abre la consola</strong> para ver los logs de renderizado y
          entender cómo useCallback previene re-renders innecesarios del
          ComponenteBatalla.
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Pokémon seleccionados para la batalla:</h3>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={pokemon1.artwork_url}
              alt={pokemon1.name}
              style={{ width: "100px" }}
            />
            <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {pokemon1.name}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <img
              src={pokemon2.artwork_url}
              alt={pokemon2.name}
              style={{ width: "100px" }}
            />
            <p style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              {pokemon2.name}
            </p>
          </div>
        </div>
      </div>

      {!batalla ? (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={iniciarBatalla}
            style={{
              padding: "15px 30px",
              fontSize: "1.2em",
              cursor: "pointer",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            🎮 Iniciar Batalla
          </button>

          <button
            onClick={forzarRender}
            style={{
              padding: "15px 30px",
              fontSize: "1em",
              cursor: "pointer",
              backgroundColor: "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            🔄 Forzar Re-render ({contadorRenders})
          </button>
          <p style={{ fontSize: "0.9em", color: "#7f8c8d", marginTop: "10px" }}>
            Haz clic en "Forzar Re-render" y observa la consola. Verás que el
            componente padre se re-renderiza, pero ComponenteBatalla NO, gracias
            a useCallback y memo().
          </p>
        </div>
      ) : (
        <ComponenteBatalla
          batalla={batalla}
          onAtacar={manejarAtaque}
          onReiniciar={reiniciarBatalla}
        />
      )}

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          borderLeft: "4px solid #ffc107",
        }}
      >
        <h4>💡 Nota importante sobre useCallback:</h4>
        <p>
          Sin <code>useCallback</code>, cada vez que BatallaPokemon se
          re-renderiza (por ejemplo, al hacer clic en "Forzar Re-render"), se
          crearían nuevas instancias de las funciones{" "}
          <code>iniciarBatalla</code>, <code>manejarAtaque</code> y
          <code>reiniciarBatalla</code>. Esto causaría que ComponenteBatalla se
          re-renderice innecesariamente, incluso estando envuelto en{" "}
          <code>memo()</code>.
        </p>
        <p>
          Con <code>useCallback</code>, las funciones mantienen la misma
          referencia en memoria mientras sus dependencias no cambien, evitando
          re-renders innecesarios.
        </p>
      </div>
    </div>
  );
}
