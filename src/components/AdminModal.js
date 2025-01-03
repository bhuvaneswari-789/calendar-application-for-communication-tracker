// components/AdminModal.js
import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function AdminModal({ onComplete }) {
  const { communicationMethods, dispatch } = useContext(GlobalContext);

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    location: "",
    linkedInProfile: "",
    emails: "",
    phoneNumbers: "",
    comments: "",
    communicationPeriodicity: "",
  });

  const [methods, setMethods] = useState([...communicationMethods]);

  const handleCompanySubmit = () => {
    dispatch({
      type: "addCompany",
      payload: { ...companyDetails, id: Date.now() },
    });

    dispatch({ type: "updateCommunicationMethods", payload: methods });

    onComplete(); // Notify parent to show data
  };

  const handleMethodChange = (index, key, value) => {
    const updatedMethods = [...methods];
    updatedMethods[index][key] = value;
    setMethods(updatedMethods);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-opacity-50 bg-gray-700">
      <div className="bg-white rounded-lg shadow-2xl w-3/4 p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Company</h2>
          <button onClick={onComplete} className="text-gray-500">
            Close
          </button>
        </header>

        {/* Company Management Form */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Company Details</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCompanySubmit();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Company Name"
              value={companyDetails.name}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, name: e.target.value })
              }
              className="w-full p-2 border"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={companyDetails.location}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, location: e.target.value })
              }
              className="w-full p-2 border"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile"
              value={companyDetails.linkedInProfile}
              onChange={(e) =>
                setCompanyDetails({
                  ...companyDetails,
                  linkedInProfile: e.target.value,
                })
              }
              className="w-full p-2 border"
            />
            <textarea
              placeholder="Comments"
              value={companyDetails.comments}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, comments: e.target.value })
              }
              className="w-full p-2 border"
            />
            <button
              type="button"
              onClick={handleCompanySubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Company
            </button>
          </form>
        </div>

        {/* Communication Method Form */}
        <div>
          <h3 className="text-xl font-semibold">Communication Methods</h3>
          {methods.map((method, index) => (
            <div key={index} className="flex space-x-4 items-center mb-2">
              <input
                type="text"
                placeholder="Method Name"
                value={method.name}
                onChange={(e) =>
                  handleMethodChange(index, "name", e.target.value)
                }
                className="p-2 border flex-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={method.description}
                onChange={(e) =>
                  handleMethodChange(index, "description", e.target.value)
                }
                className="p-2 border flex-1"
              />
              <input
                type="number"
                placeholder="Sequence"
                value={method.sequence}
                onChange={(e) =>
                  handleMethodChange(index, "sequence", parseInt(e.target.value))
                }
                className="p-2 border w-20"
              />
              <input
                type="checkbox"
                checked={method.mandatory}
                onChange={(e) =>
                  handleMethodChange(index, "mandatory", e.target.checked)
                }
                className="h-5 w-5"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
