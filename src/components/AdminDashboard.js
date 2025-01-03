// components/AdminDashboard.js
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import AdminModal from "./AdminModal";

export default function AdminDashboard() {
  const { companies, communicationMethods } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [dataVisible, setDataVisible] = useState(false); // Control visibility of created data

  const handleCreateComplete = () => {
    setShowModal(false);
    setDataVisible(true); // Show the created data
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Button to Trigger Modal */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Create New Company & Manage Methods
      </button>

      {/* Admin Modal */}
      {showModal && <AdminModal onComplete={handleCreateComplete} />}

      {/* Display Data After Creation */}
      {dataVisible && (
        <div className="mt-6">
          {/* Companies */}
          <h2 className="text-2xl font-semibold">Companies</h2>
          <ul className="list-disc ml-6">
            {companies.map((company) => (
              <li key={company.id}>
                {company.name} ({company.location}) - {company.linkedInProfile}
              </li>
            ))}
          </ul>

          {/* Communication Methods */}
          <h2 className="text-2xl font-semibold mt-4">Communication Methods</h2>
          <ul className="list-disc ml-6">
            {communicationMethods.map((method, index) => (
              <li key={index}>
                {method.sequence}. {method.name} - {method.description}{" "}
                {method.mandatory ? "(Mandatory)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
