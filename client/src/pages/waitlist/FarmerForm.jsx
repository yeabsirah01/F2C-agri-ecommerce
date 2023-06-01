import { useState } from "react";
import { Button, TextInput, Textarea, FileInput, Loader } from "@mantine/core";
import axiosConfig from "../../axiosConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "./styles.css";

const FarmerApplicationForm = () => {
  const [nationalIdNumber, setNationalIdNumber] = useState("");
  const [farmingLicenseNumber, setFarmingLicenseNumber] = useState("");
  const [letter, setLetter] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [farmingLicense, setFarmingLicense] = useState("");
  const [nationalIDPhoto, setNationalIDPhoto] = useState("");
  const [farmSamplePhoto, setFarmSamplePhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { token } = useSelector((state) => state.user);
  const handleSubmit = async (event) => {
    console.log(farmingLicense);
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("nationalIdNumber", nationalIdNumber);
    formData.append("farmingLicenseNumber", farmingLicenseNumber);
    formData.append("letter", letter);
    formData.append("profilePicture", profilePicture);
    formData.append("farmSamplePhoto", farmSamplePhoto);
    formData.append("nationalIDPhoto", nationalIDPhoto);
    formData.append("farmingLicense", farmingLicense);

    // console.log(token);
    const token = `Bearer ${localStorage.getItem("cookie")}`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: token,
      },
    };
    try {
      await axiosConfig.post("/waitlist", formData, config);
      toast.success(
        "Application Submitted successfully, we'll send you email soon"
      );
      // navigate("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg || "Something went wrong",
        "login-error"
      );
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: 50 }}>
      <h1 style={{ textAlign: "center" }}>Apply to be Farmer</h1>

      <form
        className="formContainer"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label className="label">National ID Number</label>
        <input
          className="inputField"
          type="text"
          value={nationalIdNumber}
          onChange={(event) => setNationalIdNumber(event.target.value)}
          required
        />

        <label className="label">Farming License Number</label>
        <input
          className="inputField"
          type="text"
          value={farmingLicenseNumber}
          onChange={(event) => setFarmingLicenseNumber(event.target.value)}
          required
        />

        <label className="label">Letter</label>
        <textarea
          className="inputField"
          value={letter}
          onChange={(event) => setLetter(event.target.value)}
          required
        ></textarea>

        <label className="label">Profile Picture</label>
        <input
          className="fileInput"
          type="file"
          onChange={(event) => setProfilePicture(event.target.files[0])}
          required
        />

        <label className="label">Farming License</label>
        <input
          className="fileInput"
          type="file"
          onChange={(event) => setFarmingLicense(event.target.files[0])}
          required
        />

        <label className="label">National ID Photo</label>
        <input
          className="fileInput"
          type="file"
          accept="image/*"
          onChange={(event) => setNationalIDPhoto(event.target.files[0])}
          required
        />

        <label className="label">Farm Sample Photo</label>
        <input
          className="fileInput"
          type="file"
          accept="image/*"
          onChange={(event) => setFarmSamplePhoto(event.target.files[0])}
          required
        />

        <button className="button" type="submit" disabled={loading}>
          {loading ? <Loader size="xs" /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FarmerApplicationForm;
