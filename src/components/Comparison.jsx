import { siteContent } from '../data/siteContent'

export default function Comparison() {
  return (
    <section id="comparison" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // HONEST COMPARISON</span>
          <span className="mono-label">NO TRASH-TALKING</span>
        </div>
        <h2>Different tools, different jobs.</h2>

        <div className="desktop-table-wrap table-scroll" style={{ marginTop: 20 }}>
          <table className="mono-table">
            <thead>
              <tr>
                <th>Dimension</th>
                <th>Atomic Words</th>
                <th>Anki</th>
                <th>Quizlet</th>
                <th>Word Lists / Spreadsheets</th>
              </tr>
            </thead>
            <tbody>
              {siteContent.comparisonRows.map((row) => (
                <tr key={row.dimension}>
                  <td>
                    <strong>{row.dimension}</strong>
                  </td>
                  <td>{row.atomic}</td>
                  <td>{row.anki}</td>
                  <td>{row.quizlet}</td>
                  <td>{row.lists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-stack-cards" style={{ marginTop: 18 }}>
          {siteContent.comparisonRows.map((row) => (
            <div key={row.dimension} className="card-flat">
              <strong>{row.dimension}</strong>
              <ul
                style={{
                  margin: '8px 0 0',
                  paddingLeft: 18,
                  display: 'grid',
                  gap: 4,
                  fontSize: '0.9rem',
                }}
              >
                <li>
                  <strong>Atomic Words:</strong> {row.atomic}
                </li>
                <li>
                  <strong>Anki:</strong> {row.anki}
                </li>
                <li>
                  <strong>Quizlet:</strong> {row.quizlet}
                </li>
                <li>
                  <strong>Word Lists:</strong> {row.lists}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
