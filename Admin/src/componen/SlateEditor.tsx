import React, { useState } from 'react';

const CollapsibleTable: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleTable = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded"
        onClick={toggleTable}
      >
        {collapsed ? 'Expand Table' : 'Collapse Table'}
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          collapsed ? 'max-h-0' : 'max-h-full'
        }`}
      >
        <table className="w-full border-collapse border">
          {/* Isi tabel Anda di sini */}
          <tr>
            <th className="border">Header 1</th>
            <th className="border">Header 2</th>
            <th className="border">Header 3</th>
          </tr>
          <tr>
            <td className="border">Data 1</td>
            <td className="border">Data 2</td>
            <td className="border">Data 3</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CollapsibleTable;
