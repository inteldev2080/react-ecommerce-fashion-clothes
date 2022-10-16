const Table = ({ columns }: { columns: string[][] }): JSX.Element => {
  const [header, ...rows] = columns

  return (
    <table>
      <thead>
        <tr>
          {header.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
