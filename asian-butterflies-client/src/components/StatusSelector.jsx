// function StatusSelector({ value, onChange }) {

//   const statusData = {
//     "status": [
//       { value: "0", label: "Estable" },     // value: lo que se guarda, label: lo que ve el usuario
//       { value: "1", label: "Vulnerable" },
//       { value: "2", label: "Crítico" }
//     ]
//   };

//   return (
//     <select
//       id="butterfly-status"
//       name="status" // tiene que coincidir con el nombre que esta en el json
//       value={value}
//       onChange={onChange}
//       className="rounded-md border border-mint-green-200 h-10 w-60 mt-2 font-segoe font-normal text-mint-green-700 text-base focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 px-3 py-2 mb-3"
//     >
//       <option value="">-- Selecciona una opción --</option>
//       {statusData.status.map((status) => (
//         <option key={status.value} value={status.value}>
//           {status.label}
//         </option>
//       ))}
//     </select>
//   );
// }
// export default StatusSelector

function StatusSelector({ value, onChange, disabled }) {
  const options = [
    { value: "0", label: "Estable" },
    { value: "1", label: "Vulnerable" },
    { value: "2", label: "Crítico" }
  ];

  const handleChange = (e) => {
    onChange({ target: { name: "status", value: e.target.value } });
  };

  return (
    <select
      id="butterfly-status"
      name="status"
      value={String(value ?? "")}   // 👈 siempre string
      onChange={handleChange}
      disabled={disabled}
      className="rounded-md border border-mint-green-200 h-10 w-60 mt-2 font-segoe font-normal text-mint-green-700 text-base focus:border-mint-green-600 focus:outline-2vw outline-mint-green-200 px-3 py-2 mb-3"
    >
      <option value="">-- Selecciona una opción --</option>
      {options.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
export default StatusSelector;
