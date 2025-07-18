import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTenant = () => {
  const [tenantURL, setTenantURL] = useState("");
  const [loading, setLoading] = useState(false);

  const createTenant = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/sites/create-tenant"
      );
      setTenantURL(res.data.tenantURL);
      toast.success("Tenant created successfully!");
    } catch (err) {
      toast.error("Failed to create tenant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Tenant</h2>
      <button
        onClick={createTenant}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Create Tenant
      </button>
      {loading && <p>Creating tenant...</p>}
      {tenantURL && (
        <div className="mt-4">
          <p>
            New tenant URL:{" "}
            <a href={tenantURL} className="text-blue-500">
              {tenantURL}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateTenant;
